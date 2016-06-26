'use strict'

/**
 * Base Callback Query Controller
 * you must extend TelegramBaseCallbackQueryController 
 * to create callback query controller.
 */
class TelegramBaseCallbackQueryController {
    /**
     * This method of your controller will be called to handle callbackQuery.
     *
     * @param {CallbackQuery} query
     */
    handle(query) { throw 'Not implemented' }
}

module.exports = TelegramBaseCallbackQueryController