'use strict'

const BaseUpdateFetcher = require('./BaseUpdateFetcher')
const http = require('http')
const Update = require('../models/Update')

class WebhookUpdateFetcher extends BaseUpdateFetcher {
    /**
     * @param {TelegramApi} api
     * @param {BaseLogger} logger
     * @param {string} url
     * @param {string} host
     * @param {number} port
     * @param {string} apiToken
     */
    constructor(api, logger, url, host, port, apiToken) {
        super(api, logger)

        this._url = url
        this._host = host
        this._port = port
        this._apiToken = apiToken

        this._server = http.createServer((req, res) => this._handleRequest(req, res))
    }

    /**
     * @param {fetchUpdatesCallback} callback
     */
    fetch(callback) {
        this._callback = callback
        this._getUpdates()
    }

    /**
     * @private
     */
    _getUpdates() {
        this._api.setWebhook({ url: this._url })
            .then(() => {
                this._server.listen(this._port, this._host, () => {
                    this._logger.log({ WebhookUpdateFetcher: `Server started at ${this._host}:${this._port}` })
                })
            })
    }

    /**
     * @param req
     * @param res
     * @private
     */
    _handleRequest(req, res) {
        const validateRegExp = new RegExp(this._apiToken)

        if (!validateRegExp.test(req.url)) {
            this._logger.error({ webhook: 'Not authorized request from Telegram' })
            res.statusCode = 401
            res.end()
        } else if (req.method === 'POST') {
            let chunks = []

            req.on('data', chunk => {
                chunks.push(chunk)
            })

            req.on('end', () => {
                res.end('OK')

                const data = Buffer.concat(chunks).toString('utf-8')
                let parsedUpdate

                try {
                    parsedUpdate = JSON.parse(data)
                }
                catch (e) {
                    this._logger.error({ 'Error parsing webhook update from json': e })
                }

                if(!parsedUpdate)
                    return

                this._logger.log({ webhook: 'Got ', update: parsedUpdate })

                const update = Update.deserialize(parsedUpdate)

                this._callback([update])
            })
        } else {
            this._logger.error({ webhook: 'Authorized request from Telegram but not a POST' })

            res.statusCode = 400
            res.end()
        }
    }
}

module.exports = WebhookUpdateFetcher