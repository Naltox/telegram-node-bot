'use strict' 

class InlineScope {
    /**
     * 
     * @param {Update} update
     * @param {TelegramApi} api
     */
    constructor(update, api, waitingChosenResults, waitingQueries) {
        this._update = update
        this._api = api
        this._waitingChosenResults = waitingChosenResults
        this._waitingQueries = waitingQueries
        this._inlineQuery = update.inlineQuery
        this._userId = update.inlineQuery.from.id
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
     * @returns {TelegramApi}
     */
    get api() {
        return this._api
    }

    /**
     * 
     * @returns {InlineQuery}
     */
    get inlineQuery() {
        return this._inlineQuery
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
     * @callback answerCallback
     * @param {InlineQueryResult} chosenResult
     */

    /**
     *
     * @param {InlineQueryResult[]} results
     * @param {Object} [options]
     * @param {answerCallback} [callback]
     * @returns Promise<boolean>
     */
    answer(results, options, callback) {
        results = results.map(result => {
            if (!result.id)
                result._id = Math.random().toString(36).substring(7)

            return result
        })

        this._api.answerInlineQuery(this._inlineQuery.id, results, options)
            .then(() => {
                results.forEach(result => {
                    this._waitingChosenResults[result.id] = () => {
                        callback(result)
                    }
                })
            })
    }

    /**
     *
     * @param {InlineQueryResult[]} results
     * @param {number} answersPerPage
     * @param {answerCallback} callback
     */
    answerPaginated(results, answersPerPage, callback) {
        let slicedData = results.slice(0, answersPerPage)

        this.answer(slicedData, { next_offset: results.length.toString() }, callback)

        this._waitingQueries[this._inlineQuery.query + ':' + this._inlineQuery.from.id] = ($) => {
            $.answerPaginated(results.slice(answersPerPage), answersPerPage, callback)
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
        return this._api.sendMessage(this.userId, text, options)
    }

    /**
     *
     * @param {number} fromChatId
     * @param {number} messageId
     * @param {Object} [options]
     * @returns {Promise<Message>}
     */
    forwardMessage(fromChatId, messageId, options) {
        return this._api.forwardMessage(this.userId, fromChatId, messageId, options)
    }

    /**
     *
     * @param {InputFile|Object} photo
     * @param {Object} [options]
     * @returns {Promise<Message>}
     */
    sendPhoto(photo, options) {
        return this._api.sendPhoto(this.userId, photo, options)
    }

    /**
     *
     * @param {InputFile|Object} audio
     * @param {Object} [options]
     * @returns {Promise<Message>}
     */
    sendAudio(audio, options) {
        return this._api.sendAudio(this.userId, audio, options)
    }

    /**
     *
     * @param {InputFile|Object} document
     * @param {Object} [options]
     * @returns {Promise<Message>}
     */
    sendDocument(document, options) {
        return this._api.sendDocument(this.userId, document, options)
    }

    /**
     *
     * @param {InputFile|Object} sticker
     * @param {Object} [options]
     * @returns {Promise<Message>}
     */
    sendSticker(sticker, options) {
        return this._api.sendSticker(this.userId, sticker, options)
    }

    /**
     *
     * @param {InputFile|Object} video
     * @param {Object} [options]
     * @returns {Promise<Message>}
     */
    sendVideo(video, options) {
        return this._api.sendVideo(this.userId, video, options)
    }

    /**
     *
     * @param {InputFile|Object} voice
     * @param {Object} [options]
     * @returns {Promise<Message>}
     */
    sendVoice(voice, options) {
        return this._api.sendVoice(this.userId, voice, options)
    }

    /**
     *
     * @param {number} latitude
     * @param {number} longitude
     * @param {Object} [options]
     * @returns {Promise<Message>}
     */
    sendLocation(latitude, longitude, options) {
        return this._api.sendLocation(this.userId, latitude, longitude, options)
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
        return this._api.sendVenue(this.userId, latitude, longitude, title, address, options)
    }

    /**
     *
     * @param {string} phoneNumber
     * @param {string} firstName
     * @param {Object} [options]
     * @returns {Promise<Message>}
     */
    sendContact(phoneNumber, firstName, options) {
        return this._api.sendContact(this.userId, phoneNumber, firstName, options)
    }

    /**
     *
     * @param {string} action
     * @returns {Promise<Object>}
     */
    sendChatAction(action) {
        return this._api.sendChatAction(this.userId, action)
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
        return this._api.kickChatMember(this.userId, userId)
    }

    /**
     *
     * @returns {Promise.<boolean>}
     */
    leaveChat() {
        return this._api.leaveChat(this.userId)
    }

    /**
     *
     * @param {number} userId
     * @returns {Promise.<boolean>}
     */
    unbanChatMember(userId) {
        return this._api.unbanChatMember(this.userId, userId)
    }

    /**
     *
     * @returns {Promise<Chat>}
     */
    getChat() {
        return this._api.getChat(this.userId)
    }

    /**
     *
     * @returns {Promise<ChatMember[]>}
     */
    getChatAdministrators() {
        return this._api.getChatAdministrators(this.userId)
    }

    /**
     *
     * @returns {Promise<number>}
     */
    getChatMembersCount() {
        return this._api.getChatMembersCount(this.userId)
    }

    /**
     *
     * @param {number} userId
     * @returns {Promise.<ChatMember>}
     */
    getChatMember(userId) {
        return this._api.getChatMember(this.userId, userId)
    }
}

module.exports = InlineScope