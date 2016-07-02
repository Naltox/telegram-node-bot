'use strict'

const InlineKeyboardButton = require('../models/InlineKeyboardButton')
const InlineKeyboardMarkup = require('../models/InlineKeyboardMarkup')
const ReplyKeyboardMarkup = require('../models/ReplyKeyboardMarkup')
const KeyboardButton = require('../models/KeyboardButton')

class Scope {
    /**
     *
     * @param {Update} update
     * @param {Object} query
     * @param {TelegramApi} api
     * @param {BaseScopeExtension[]} extensions
     * @param {Function[]} waitingRequests
     * @param {Object} waitingCallbackQueries
     * @param {Object} chatSession
     * @param {Object|null} userSession
     */
    constructor(
        update,
        query,
        api,
        extensions,
        waitingRequests,
        waitingCallbackQueries,
        chatSession,
        userSession
    ) {
        this._api = api
        this._update = update
        this._query = query
        /**
         * 
         * @type {BaseScopeExtension[]}
         * @private
         */
        this._extensions = extensions
        this._waitingRequests = waitingRequests
        this._waitingCallbackQueries = waitingCallbackQueries

        this._isEditedMessage = update.editedMessage ? true : false

        this._message = update.message || update.editedMessage
        this._chatId = this._message.chat.id
        this._userId = this._message.from.id
        this._fromGroupChat = !(this._userId === this._chatId)

        this._chatSession = chatSession
        this._userSession = userSession

        this._extensions.forEach(extension => {
            const extensionInstance = new extension(this)
            this[extensionInstance.name] = extensionInstance.process
        })
    }

    /**
     *
     * @returns {Update}
     */
    get update() {
        return this._update
    }

    /**
     * 
     * @returns {string[]}
     */
    get query() {
        return this._query
    }

    /**
     *
     * @returns {Message}
     */
    get message() {
        return this._message
    }

    /**
     *
     * @returns {number}
     */
    get chatId() {
        return this._chatId
    }

    /**
     *
     * @returns {number}
     */
    get userId() {
        return this._userId
    }

    /**
     *
     * @returns {boolean}
     */
    get idFromGroupChat() {
        return this._fromGroupChat
    }

    /**
     *
     * @returns {TelegramApi}
     */
    get api() {
        return this._api
    }

    /**
     *
     * @returns {Object}
     */
    get chatSession() {
        return this._chatSession
    }

    /**
     *
     * @returns {Object|null}
     */
    get userSession() {
        return this._userSession
    }

    /**
     *
     * @returns {boolean}
     */
    get isEditedMessage() {
        return this._isEditedMessage
    }

    /**
     * After calling this the next update
     * from current user will be passed to promise
     *
     * @returns {Promise<Scope>}
     */
    get waitForRequest() {
        return new Promise(resolve => {
            this._waitingRequests[this.chatId] = resolve
        })
    }

    /**
     * @callback waitForCallbackQueryCallback
     * @param {CallbackQuery} query
     */

    /**
     * If you send some inline keyboard after that you can call this method,
     * pass to it string callback data or array of string or your InlineKeyboardMarkup
     * and then when user press button CallbackQuery will be passed to callback
     *
     * @param {string|string[]|InlineKeyboardMarkup} data
     * @param {waitForCallbackQueryCallback} callback
     */
    waitForCallbackQuery(data, callback) {
        if (typeof data === 'string') {
            this._waitingCallbackQueries[data] = callback
        }

        if (Array.isArray(data)) {
            data.forEach(item => this._waitingCallbackQueries[item] = callback)
        }

        if (data instanceof InlineKeyboardMarkup) {
            data.inlineKeyboard.forEach(line => {
                line.forEach(key => {
                    this._waitingCallbackQueries[key.callbackData] = callback
                })
            })
        }
    }

    /**
     *
     * @param {Object} menuData
     */
    runMenu(menuData) {
        const startMessage = menuData.message

        const ignoredKeys = [
            'message',
            'layout',
            'options',
            'resizeKeyboard',
            'oneTimeKeyboard',
            'anyMatch'
        ]

        const keys = Object.keys(menuData)
        let keyboard = []

        if (menuData.layout) {
            let lineIndex = 0

            keys.forEach(key => {
                if (ignoredKeys.indexOf(key) === -1) {
                    if (!keyboard[lineIndex])
                        keyboard[lineIndex] = []

                    keyboard[lineIndex].push(new KeyboardButton(key))

                    if (typeof menuData.layout === 'number') {
                        if (keyboard[lineIndex].length === menuData.layout) {
                            lineIndex++
                        }
                    } else {
                        if (keyboard[lineIndex].length === menuData.layout[lineIndex]) {
                            lineIndex++
                        }
                    }

                }
            })
        } else {
            keys.forEach(key => {
                if (ignoredKeys.indexOf(key) === -1) {
                    keyboard.push([new KeyboardButton(key)])
                }
            })
        }

        const resizeKeyboard = (menuData.resizeKeyboard && menuData.resizeKeyboard === true)
        const oneTimeKeyboard = (menuData.oneTimeKeyboard && menuData.oneTimeKeyboard === true)

        let replyMarkap = new ReplyKeyboardMarkup(keyboard, resizeKeyboard, oneTimeKeyboard)

        let options = {
            reply_markup: JSON.stringify(replyMarkap)
        }

        if (menuData.options) options = Object.assign(options, menuData.options)

        this.sendMessage(startMessage, options)

        this.waitForRequest
            .then($ => {
                if (keys.indexOf($.message.text) > -1 &&
                    ignoredKeys.indexOf($.message.text) === -1) {
                    if (typeof menuData[$.message.text] === 'object') {
                        $.runMenu(menuData[$.message.text])
                    } else {
                        menuData[$.message.text]($)
                    }
                } else if (menuData.anyMatch) {
                    menuData.anyMatch($)
                } else {
                    $.runMenu(menuData)
                }
            })
    }

    /**
     *
     * @callback runFormCallback
     * @param {Object} response
     */

    /**
     *
     * @param {Object} formData
     * @param {runFormCallback} callback
     */
    runForm(formData, callback) {
        let i = 0

        const run = () => {
            const key = keys[i]

            this.sendMessage(formData[key].q, {
                disable_web_page_preview: true,
                reply_markup: formData[key].keyboard ? JSON.stringify({
                    one_time_keyboard: true,
                    resize_keyboard: formData[key].resize_keyboard || false,
                    keyboard: formData[key].keyboard
                }) : ''
            })

            this.waitForRequest
                .then($ => {
                    formData[key].validator($.message, (valid, value) => {
                        if (valid === true) {
                            result[key] = value
                            i++

                            if (i === Object.keys(formData).length) {
                                callback(result)
                                return
                            }

                            run()
                        } else {
                            this.sendMessage(formData[key].error, {
                                disable_web_page_preview: true
                            })
                                .then(() => {
                                    run()
                                })
                        }
                    })
                })
        }

        let result = {}
        const keys = Object.keys(formData)

        run()
    }

    /**
     *
     * @param {Object} menuData
     */
    runInlineMenu(menuData, prevMessage) {
        const method = menuData.method
        const params = menuData.params || []
        const layout = menuData.layout
        const menu = menuData.menu

        let keyboard = []

        let callbackData = []

        if (!layout) {
            keyboard = menu.map(item => {
                callbackData.push(Math.random().toString(36).substring(7))

                return [new InlineKeyboardButton(item.text, item.url, callbackData[callbackData.length - 1])]
            })
        }
        else {
            let line = 0
            menu.forEach(item => {
                if (!keyboard[line]) keyboard[line] = []

                callbackData.push(Math.random().toString(36).substring(7))

                keyboard[line].push(new InlineKeyboardButton(item.text, item.url, callbackData[callbackData.length - 1]))

                let goToNextLine = Array.isArray(layout) ? keyboard[line].length ===
                layout[line] : keyboard[line].length === layout

                if (goToNextLine)
                    line++
            })
        }

        if (typeof params[params.length - 1] === 'object') {
            params[params.length - 1] = Object.assign(params[params.length - 1], {
                reply_markup: JSON.stringify(new InlineKeyboardMarkup(keyboard))
            })
        }
        else {
            params.push({
                reply_markup: JSON.stringify(new InlineKeyboardMarkup(keyboard))
            })
        }

        var prepareCallback = (response) => {
            callbackData.forEach((data, index) => {
                this.waitForCallbackQuery(data, (query) => {
                    if (menu[index].callback)
                        menu[index].callback(query, response)
                    else {
                        this.runInlineMenu(menu[index], response)
                    }
                })
            })
        }

        if (!prevMessage) {
            this[method].apply(this, params)
                .then(response => {
                    prepareCallback(response)
                })
        }
        else {
            params[0].chat_id = prevMessage.chat.id
            params[0].message_id = prevMessage.messageId

            this.api.editMessageText(menuData.message, params[0])
                .then(response => {
                    prepareCallback(response)
                })
        }
    }

    //api methods starts here

    /**
     *
     * @param {string} text
     * @param {Object} [options]
     * @returns {Promise<Message>}
     */
    sendMessage(text, options) {
        return this._api.sendMessage(this.chatId, text, options)
    }

    /**
     *
     * @param {number} fromChatId
     * @param {number} messageId
     * @param {Object} [options]
     * @returns {Promise<Message>}
     */
    forwardMessage(fromChatId, messageId, options) {
        return this._api.forwardMessage(this.chatId, fromthis.chatId, messageId, options)
    }

    /**
     *
     * @param {InputFile|Object} photo
     * @param {Object} [options]
     * @returns {Promise<Message>}
     */
    sendPhoto(photo, options) {
        return this._api.sendPhoto(this.chatId, photo, options)
    }

    /**
     *
     * @param {InputFile|Object} audio
     * @param {Object} [options]
     * @returns {Promise<Message>}
     */
    sendAudio(audio, options) {
        return this._api.sendAudio(this.chatId, audio, options)
    }

    /**
     *
     * @param {InputFile|Object} document
     * @param {Object} [options]
     * @returns {Promise<Message>}
     */
    sendDocument(document, options) {
        return this._api.sendDocument(this.chatId, document, options)
    }

    /**
     *
     * @param {InputFile|Object} sticker
     * @param {Object} [options]
     * @returns {Promise<Message>}
     */
    sendSticker(sticker, options) {
        return this._api.sendSticker(this.chatId, sticker, options)
    }

    /**
     *
     * @param {InputFile|Object} video
     * @param {Object} [options]
     * @returns {Promise<Message>}
     */
    sendVideo(video, options) {
        return this._api.sendVideo(this.chatId, video, options)
    }

    /**
     *
     * @param {InputFile|Object} voice
     * @param {Object} [options]
     * @returns {Promise<Message>}
     */
    sendVoice(voice, options) {
        return this._api.sendVoice(this.chatId, voice, options)
    }

    /**
     *
     * @param {number} latitude
     * @param {number} longitude
     * @param {Object} [options]
     * @returns {Promise<Message>}
     */
    sendLocation(latitude, longitude, options) {
        return this._api.sendLocation(this.chatId, latitude, longitude, options)
    }

    /**
     *
     * @param {number} latitude
     * @param {number} longitude
     * @param {string} title
     * @param {string}address
     * @param {Object} [options]
     * @returns {Promise<Message>}
     */
    sendVenue(latitude, longitude, title, address, options) {
        return this._api.sendVenue(this.chatId, latitude, longitude, title, address, options)
    }

    /**
     *
     * @param {string} phoneNumber
     * @param {string} firstName
     * @param {Object} [options]
     * @returns {Promise<Message>}
     */
    sendContact(phoneNumber, firstName, options) {
        return this._api.sendContact(this.chatId, phoneNumber, firstName, options)
    }

    /**
     *
     * @param {string} action
     * @returns {Promise<Object>}
     */
    sendChatAction(action) {
        return this._api.sendChatAction(this.chatId, action)
    }

    /**
     *
     * @param {number} offset
     * @param {number} limit
     * @returns {Promise<UserProfilePhotos>}
     */
    getUserProfilePhotos(offset, limit) {
        return this._api.getUserProfilePhotos(userId, offset, limit)
    }

    /**
     *
     * @param {number} userId
     * @returns {Promise.<boolean>}
     */
    kickChatMember(userId) {
        return this._api.kickChatMember(this.chatId, userId)
    }

    /**
     *
     * @returns {Promise.<boolean>}
     */
    leaveChat() {
        return this._api.leaveChat(this.chatId)
    }

    /**
     *
     * @param {number} userId
     * @returns {Promise.<boolean>}
     */
    unbanChatMember(userId) {
        return this._api.unbanChatMember(this.chatId, userId)
    }

    /**
     *
     * @returns {Promise<Chat>}
     */
    getChat() {
        return this._api.getChat(this.chatId)
    }

    /**
     *
     * @returns {Promise<ChatMember[]>}
     */
    getChatAdministrators() {
        return this._api.getChatAdministrators(this.chatId)
    }

    /**
     *
     * @returns {Promise<number>}
     */
    getChatMembersCount() {
        return this._api.getChatMembersCount(this.chatId)
    }

    /**
     *
     * @param {number} userId
     * @returns {Promise.<ChatMember>}
     */
    getChatMember(userId) {
        return this._api.getChatMember(this.chatId, userId)
    }
}

module.exports = Scope