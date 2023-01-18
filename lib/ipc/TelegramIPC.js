'use strict'

class TelegramIPC {
    /**
     * Worker can ask master to send him next update from specific chat
     *
     * @param {number} chatId
     */
    askForNextUpdate(chatId) {
        process.send({ type: 'waitForUpdate', chatId: chatId })
    }

    /**
     * Worker can ask master to send him next callback query for specific callback data
     *
     * @param {string} chatId
     */
    askForNextCallbackQuery(data) {
        process.send({ type: 'waitForCallbackQuery', data: data })
    }
}

module.exports = TelegramIPC