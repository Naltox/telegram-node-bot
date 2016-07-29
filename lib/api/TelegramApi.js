'use strict'

const req = require('tiny_request')
const CallbackQueue = require('../utils/CallbackQueue')
const TelegramApiRequest = require('./TelegramApiRequest')
const Models = require('../models/Models')
const Message = require('../models/Message')
const File = require('../models/File')
const UserProfilePhotos = require('../models/UserProfilePhotos')
const User = require('../models/User')
const Update = require('../models/Update')
const Chat = require('../models/Chat')
const ChatMember = require('../models/ChatMember')
const InputFile = require('./InputFile')
const TelegramApiError = require('./TelegramApiError')

const REQUESTS_PER_SECOND = 30
const REQUEST_RETRY_TIMEOUT = 1000 //ms

/**
 * Telegram API class
 */
class TelegramApi {
    /**
     *
     * @param {string} token
     * @param {BaseLogger} logger
     */
    constructor(token, logger) {
        this._token = token
        this._url = `https://api.telegram.org/bot${this._token}/`
        this._queue = new CallbackQueue(REQUESTS_PER_SECOND)
        this._logger = logger
    }

    /**
     *
     * @param {string} method
     * @returns {string}
     * @private
     */
    _urlForMethod(method) {
        return this._url + method
    }

    /**
     * 
     * @param {string} method
     * @param {object} params
     * @param {object} [multipart]
     * @returns {Promise<Object>}
     */
    call(method, params, multipart) {
        return new Promise((resolve, reject) => {
            const request = new TelegramApiRequest(method, params, multipart)

            this._queue.push(() => {
                this._handleRequest(request, resolve, reject)
            })
        })
    }

    /**
     *
     * @param {string} method
     * @param {Object} params
     * @param {function} type
     * @param {object} [multipart]
     * @returns {Promise}
     * @private
     */
    _callWithReturnType(method, params, type, multipart) {
        return this.call(method, params, multipart)
            .then(response => {
                return type.deserialize(response.result)
            })
    }

    /**
     *
     * @param {TelegramApiRequest }request
     * @param {function} resolve
     * @param {function} reject
     * @private
     */
    _handleRequest(request, resolve, reject) {
        req.post({
            url: this._urlForMethod(request.method),
            form: request.multipart ? null : request.params,
            query: request.multipart ? request.params : null,
            multipart: request.multipart,
            json: true
        }, (body, response, err) => {
            if (!err && response.statusCode == 200 && body) {
                resolve(body)
                return
            }

            if (err && err.code) {
                this._logger.error({'Network error:': err, 'request': request })
                this._retryRequest(request, resolve, reject)

                return
            }

            if (body && body.error_code) {
                const error = TelegramApiError.fromResponse(body)

                if (error.code == 500) {
                    this._logger.warn({ 'Got Internal server error from Telegram. Body:': body })
                    this._retryRequest(request, resolve, reject)

                    return
                }

                reject(error)
                this._logger.warn({ 'Api error: Body:': body })

                return
            }

            if (err.message === 'Unexpected token < in JSON at position 0') {
                this._logger.error({
                    'api request error: Telegram returned some html instead of json. Body:': body,
                    'Error:': err
                })
                this._retryRequest(request, resolve, reject)

                return
            }

            this._logger.error({'api request error: Body:': body, 'Error:': err })
            reject(err)
        })
    }

    /**
     *
     * @param {TelegramApiRequest }request
     * @param {function} resolve
     * @param {function} reject
     * @private
     */
    _retryRequest(request, resolve, reject) {
        setTimeout(() => {
            this._queue.push(() => {
                this._logger.log({ 'Retry request': request })
                this._handleRequest(request, resolve, reject)
            })
        }, REQUEST_RETRY_TIMEOUT)
    }

    /**
     *
     * @param {string} method
     * @param {InputFile|Object} inputFile
     * @param {string} type
     * @param {Object} params
     * @returns {Promise}
     * @private
     */
    _callWithInputFile(method, inputFile, type, params) {
        const file = inputFile instanceof InputFile ? inputFile : InputFile.deserialize(inputFile)
        let sentCallback = Function()

        return file.prepareRequest(type, params)
            .then(prepared =>  {
                sentCallback = prepared.callback || Function()
                
                return this._callWithReturnType(
                    method,
                    prepared.params,
                    Message,
                    prepared.multipart
                )
            })
            .then(r => {
                sentCallback()
                
                return r
            })
    }

    /**
     *
     * @param {Object} [options]
     * @returns {Promise<Update[]>}
     */
    getUpdates(options) {
        return this.call('getUpdates', options)
            .then(r => r.result.map(u => Update.deserialize(u)))
    }

    /**
     *
     * @param options
     * @returns {Promise<Object>}
     */
    setWebhook(options) {
        return this.call('setWebhook', options, Models.Update)
    }

    /**
     *
     * @returns {Promise<User>}
     */
    getMe() {
        return this._callWithReturnType('getMe', {}, User)
    }

    /**
     *
     * @param {number|string} chatId
     * @param {string} text
     * @param {Object} [options]
     * @returns {Promise<Message>}
     */
    sendMessage(chatId, text, options) {
        const params = {
            chat_id: chatId,
            text: text
        }

        if (text.length > 4096) {
            this.sendMessage(chatId, text.slice(0, 4096), options)
                .then(() => {
                    this.sendMessage(chatId, text.slice(4096, text.length), options)
                })
        } else {
            return this._callWithReturnType('sendMessage', Object.assign(params, options), Message)
        }
    }

    /**
     *
     * @param {number|string} chatId
     * @param {number} fromChatId
     * @param {number} messageId
     * @param {Object} [options]
     * @returns {Promise<Message>}
     */
    forwardMessage(chatId, fromChatId, messageId, options) {
        const params = {
            chat_id: chatId,
            from_chat_id: fromChatId,
            message_id: messageId
        }

        return this._callWithReturnType('forwardMessage', Object.assign(params, options), Message)
    }

    /**
     * 
     * @param {number|string} chatId
     * @param {InputFile|Object} photo
     * @param {Object} [options]
     * @returns {Promise<Message>}
     */
    sendPhoto(chatId, photo, options) {
        return this._callWithInputFile(
            'sendPhoto',
            photo,
            'photo',
            Object.assign(
                { chat_id: chatId },
                options
            )
        )
    }

    /**
     *
     * @param {number|string} chatId
     * @param {InputFile|Object} audio
     * @param {Object} [options]
     * @returns {Promise<Message>}
     */
    sendAudio(chatId, audio, options) {
        return this._callWithInputFile(
            'sendAudio',
            audio,
            'audio',
            Object.assign(
                { chat_id: chatId },
                options
            )
        )
    }

    /**
     *
     * @param {number|string} chatId
     * @param {InputFile|Object} document
     * @param {Object} [options]
     * @returns {Promise<Message>}
     */
    sendDocument(chatId, document, options) {
        return this._callWithInputFile(
            'sendDocument',
            document,
            'document',
            Object.assign(
                { chat_id: chatId },
                options
            )
        )
    }

    /**
     * 
     * @param {number|string} chatId
     * @param {InputFile|Object} sticker
     * @param {Object} [options]
     * @returns {Promise<Message>}
     */
    sendSticker(chatId, sticker, options) {
        return this._callWithInputFile(
            'sendSticker',
            sticker,
            'sticker',
            Object.assign(
                { chat_id: chatId },
                options
            )
        )
    }

    /**
     *
     * @param {number|string} chatId
     * @param {InputFile|Object} video
     * @param {Object} [options]
     * @returns {Promise<Message>}
     */
    sendVideo(chatId, video, options) {
        return this._callWithInputFile(
            'sendVideo',
            video,
            'video',
            Object.assign(
                { chat_id: chatId },
                options
            )
        )
    }

    /**
     *
     * @param {number|string} chatId
     * @param {InputFile|Object} voice
     * @param {Object} [options]
     * @returns {Promise<Message>}
     */
    sendVoice(chatId, voice, options) {
        return this._callWithInputFile(
            'sendVoice',
            voice,
            'voice',
            Object.assign(
                { chat_id: chatId },
                options
            )
        )
    }

    /**
     *
     * @param {number|string} chatId
     * @param {number} latitude
     * @param {number} longitude
     * @param {Object} [options]
     * @returns {Promise<Message>}
     */
    sendLocation(chatId, latitude, longitude, options) {
        const params = {
            chat_id: chatId,
            latitude: latitude,
            longitude: longitude
        }
        
        return this._callWithReturnType('sendLocation', Object.assign(params, options), Message)
    }

    /**
     *
     * @param {number|string} chatId
     * @param {number} latitude
     * @param {number} longitude
     * @param {string} title
     * @param {string}address
     * @param {Object} [options]
     * @returns {Promise<Message>}
     */
    sendVenue(chatId, latitude, longitude, title, address, options) {
        const params = {
            chat_id: chatId,
            latitude: latitude,
            longitude: longitude,
            title: title,
            address: address
        }

        return this._callWithReturnType('sendVenue', Object.assign(params, options), Message)
    }

    /**
     *
     * @param {number|string} chatId
     * @param {string} phoneNumber
     * @param {string} firstName
     * @param {Object} [options]
     * @returns {Promise<Message>}
     */
    sendContact(chatId, phoneNumber, firstName, options) {
        const params = {
            chat_id: chatId,
            phone_number: phoneNumber,
            first_name: firstName
        }

        return this._callWithReturnType('sendContact', Object.assign(params, options), Message)
    }

    /**
     *
     * @param {number|string} chatId
     * @param {string} action
     * @returns {Promise<Object>}
     */
    sendChatAction(chatId, action) {
        return this.call('sendChatAction', {
            chat_id: chatId,
            action: action
        })
    }

    /**
     *
     * @param {number} userId
     * @param {number} offset
     * @param {number} limit
     * @returns {Promise<UserProfilePhotos>}
     */
    getUserProfilePhotos(userId, offset, limit) {
        return this._callWithReturnType('getUserProfilePhotos', {
            user_id: userId,
            ofsset: offset,
            limit: limit
        }, UserProfilePhotos)
    }

    /**
     *
     * @param {number} fileId
     * @returns {Promise<File>}
     */
    getFile(fileId) {
        return this._callWithReturnType('getFile', { file_id: fileId }, File)
    }

    /**
     *
     * @param {number|string} chatId
     * @param {number} userId
     * @returns {Promise<boolean>}
     */
    kickChatMember(chatId, userId) {
        const params = {
            chat_id: chatId,
            user_id: userId
        }

        return this.call('kickChatMember', params)
            .then(r => r.result)
    }

    /**
     *
     * @param {number|string} chatId
     * @returns {Promise<boolean>}
     */
    leaveChat(chatId) {
        return this.call('leaveChat', { chat_id: chatId })
            .then(r => r.result)
    }

    /**
     *
     * @param {number|string} chatId
     * @param {number} userId
     * @returns {Promise<boolean>}
     */
    unbanChatMember(chatId, userId) {
        const params = {
            chat_id: chatId,
            user_id: userId
        }

        return this.call('unbanChatMember', params)
            .then(r => r.result)
    }

    /**
     *
     * @param {number|string} chatId
     * @returns {Promise<Chat>}
     */
    getChat(chatId) {
        return this._callWithReturnType('getChat', { chat_id: chatId }, Chat)
    }

    /**
     *
     * @param {number|string} chatId
     * @returns {Promise<ChatMember[]>}
     */
    getChatAdministrators(chatId) {
        return this.call('getChatAdministrators', { chat_id: chatId })
            .then(r => r.result.map(m => ChatMember.deserialize(m)))
    }

    /**
     *
     * @param {number|string} chatId
     * @returns {Promise<number>}
     */
    getChatMembersCount(chatId) {
        return this.call('getChatMembersCount', { chat_id: chatId })
            .then(r => r.result)
    }

    /**
     *
     * @param {number|string} chatId
     * @param {number} userId
     * @returns {Promise<ChatMember>}
     */
    getChatMember(chatId, userId) {
        const params = {
            chat_id: chatId,
            user_id: userId
        }

        return this._callWithReturnType('getChatMember', params, ChatMember)
    }

    /**
     *
     * @param {string} callbackQueryId
     * @param {Object} [options]
     * @returns {Promise<boolean>}
     */
    answerCallbackQuery(callbackQueryId, options) {
        const params = {
            callback_query_id: callbackQueryId
        }

        return this.call('answerCallbackQuery', Object.assign(params, options))
            .then(r => r.result)
    }

    /**
     *
     * @param {string} text
     * @param {Object} options
     * @returns {Promise<boolean|Message>}
     */
    editMessageText(text, options) {
        const params = {
            text: text
        }

        return this.call('editMessageText', Object.assign(params, options))
            .then(r => typeof r.result == 'boolean' ? r.require : Message.deserialize(r.result) )
    }

    /**
     *
     * @param {Object} options
     * @returns {Promise<boolean|Message>}
     */
    editMessageCaption(options) {
        return this.call('editMessageCaption', options)
            .then(r => typeof r.result == 'boolean' ? r.require : Message.deserialize(r.result))
    }

    /**
     *
     * @param {Object} options
     * @returns {Promise<boolean|Message>}
     */
    editMessageReplyMarkup(options) {
        return this.call('editMessageReplyMarkup', options)
            .then(r => typeof r.result == 'boolean' ? r.require : Message.deserialize(r.result))
    }

    /**
     *
     * @param {string} inlineQueryId
     * @param {InlineQueryResult[]} results
     * @param {Object} [options]
     * @returns {Promise<boolean>}
     */
    answerInlineQuery(inlineQueryId, results, options) {
        const params = {
            inline_query_id: inlineQueryId,
            results: JSON.stringify(results)
        }

        return this.call('answerInlineQuery', Object.assign(params, options))
            .then(r => r.result)
    }
}

module.exports = TelegramApi