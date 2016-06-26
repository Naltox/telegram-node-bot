'use strict'

class InputMessageContent {
    /**
     *
     * @param {Object} raw
     * @returns {InputTextMessageContent|InputVenueMessageContent|InputContactMessageContent|InputLocationMessageContent}
     */
    static deserialize(raw) {
        switch (raw) {
            case raw.message_text:
                return require('./InputTextMessageContent').deserialize(raw)
            case raw.latitude && raw.title:
                return require('./InputVenueMessageContent').deserialize(raw)
            case raw.phone_number:
                return require('./InputContactMessageContent').deserialize(raw)
            case raw.latitude:
                return require('./InputLocationMessageContent').deserialize(raw)
        }
    }
}

module.exports = InputMessageContent