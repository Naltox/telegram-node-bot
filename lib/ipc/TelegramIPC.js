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
}

module.exports = TelegramIPC