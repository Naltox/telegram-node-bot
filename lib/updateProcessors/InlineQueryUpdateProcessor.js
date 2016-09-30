'use strict'

const BaseUpdateProcessor = require('./BaseUpdateProcessor')
const InlineScope = require('../mvc/InlineScope')

class InlineQueryUpdateProcessor extends BaseUpdateProcessor {
    /**
     *
     * @param {BaseTelegramDataSource} dataSource
     */
    constructor(dataSource) {
        super(dataSource)

        this._waitingQueries = {}
        this._waitingChosenResults = {}
    }

    /**
     *
     * @param {Update} update
     */
    process(update) {
        if (!this._dataSource.router.inlineQueryController) return

        if (update.inlineQuery) {
            let scope = new InlineScope(
                update,
                this._dataSource.api,
                this._waitingChosenResults,
                this._waitingQueries
            )

            let queryText = update.inlineQuery.query
            let userId = update.inlineQuery.from.id

            if (this._waitingQueries[queryText + ':' + userId] &&
                this._waitingQueries[queryText + ':' + userId] !== null) {
                const callback = this._waitingQueries[queryText + ':' + userId]
                callback(scope)

                if (this._waitingQueries[queryText + ':' + userId] == callback)
                    this._waitingQueries[queryText + ':' + userId] = null

                return
            }

            try {
                this._dataSource.router.inlineQueryController.handle(scope)
            }
            catch (e) {
                this._dataSource.logger.error({
                    'error': e,
                    'in controller': this._dataSource.router.inlineQueryController,
                    'for update': update
                })
            }
        }

        if (update.chosenInlineResult) {
            let resultId = update.chosenInlineResult.resultId
            
            if (this._waitingChosenResults[resultId] && this._waitingChosenResults[resultId] !== null) {
                const callback = this._waitingChosenResults[resultId]

                callback(update.chosenInlineResult)

                if (this._waitingChosenResults[resultId] == callback) 
                    this._waitingChosenResults[resultId] = null

                return
            }

            try {
                this._dataSource.router.inlineQueryController.chosenResult(update.chosenInlineResult)
            }
            catch (e) {
                this._dataSource.logger.error({
                    'error': e,
                    'in controller': this._dataSource.router.inlineQueryController,
                    'for update': update
                })
            } 
        }
    }

    /**
     *
     * @param {Update} update
     * @returns {boolean}
     */
    supports(update) {
        return !!(update.inlineQuery || update.chosenInlineResult)
    }
}

module.exports = InlineQueryUpdateProcessor