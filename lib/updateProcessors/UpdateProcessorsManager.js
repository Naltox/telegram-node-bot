'use strict'

const BaseUpdateProcessor = require('./BaseUpdateProcessor')
const MessageUpdateProcessor = require('./MessageUpdateProcessor')
const InlineQueryUpdateProcessor = require('./InlineQueryUpdateProcessor')

class UpdateProcessorsManager extends BaseUpdateProcessor {
    /**
     *
     * @param {BaseTelegramDataSource} delegate
     */
    constructor(delegate) {
        super(delegate)

        /**
         *
         * @type {BaseUpdateProcessor[]}
         * @private
         */
        this._processors = [
            new MessageUpdateProcessor(this._dataSource),
            new InlineQueryUpdateProcessor(this._dataSource)
        ]
    }

    /**
     *
     * @param {Update} update
     */
    process(update) {
        const processor = this._processorForUpdate(update)

        if (processor) {
            processor.process(update)
        }
    }

    /**
     * 
     * @param update
     * @returns {boolean}
     */
    supports(update) {
        return true
    }

    /**
     *
     * @param {Update} update
     * @returns {BaseUpdateProcessor}
     * @private
     */
    _processorForUpdate(update) {
        for (const processor of this._processors) {
            if (processor.supports(update)) {
                return processor
            }
        }

        this._dataSource.logger.error({ 'No processor found for update:': update })
    }
}

module.exports = UpdateProcessorsManager