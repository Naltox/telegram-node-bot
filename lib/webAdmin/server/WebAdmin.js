'use strict'

const http = require('http')
const path = require('path')
const fs = require('fs')

class WebAdmin {
    /**
     * @param {string} host
     * @param {number} port
     * @param {string} path
     * @param {WebAdminLogger} logger
     * @param {Telegram} telegram
     */
    constructor(host, port, path, logger, telegram) {
        this._host = host
        this._port = port
        this._path = path
        this._logger = logger
        this._telegram = telegram

        this._server = http.createServer((request, response) => {
            this._handleRequest(request, response)
        }).listen(this._port, this._host)

        this._logger.log({ 'WebAdmin ': `started at ${host}:${port}`})
    }

    /**
     * @param request
     * @param response
     * @private
     */
    _handleRequest(request, response) {
        let reqPath =  path.join(this._path, request.url == '/' ? '/index.html' : request.url)

        switch (request.url) {
            case '/logs':
                response.end(this._logger.getAllLogs())
                break
            case '/restartWorkers':
                this._telegram.restartWorkers()
                response.end('ok')
                break
            case '/downloadLogs':
                response.writeHead(200, {
                    'Content-Type': 'text/plain',
                    'Content-Disposition': 'attachment; filename=logs.txt'
                })
                response.end(this._logger.getAllLogs())
                break
            case '/statistics':
                response.end(JSON.stringify({
                    totalRequests: this._telegram.statistics.getTotalRequestsCount(),
                    requestsForWorkers: this._telegram.statistics.getWorkersRequests(),
                    uptime: this._telegram.statistics.getUptime(),
                    workersStatus: this._telegram.statistics.getWorkersStatus()
                }))

        }
        
        fs.lstat(reqPath, (err, stats) => {
            if (stats && stats.isFile()) {
                this._sendFile(response, reqPath, stats.size)
            }
            else {
                this._sendNotFound(response)
            }
        })
    }

    /**
     * @param response
     * @param {string} filePath
     * @param {number} size
     * @private
     */
    _sendFile(response, filePath, size) {
        const fileStream = fs.createReadStream(filePath)
        const ext = path.parse(filePath).ext

        response.writeHead(200, {
            'Content-Type': this._getMimeType(ext),
            'Content-Length': size
        })

        fileStream.pipe(response)
    }

    /**
     * @param extension
     * @returns {*}
     * @private
     */
    _getMimeType(extension) {
        switch (extension) {
            case '.html':
                return 'text/html'
            case '.js':
                return 'application/javascript'
            case '.css':
                return 'text/css'
            case '.svg':
                return 'image/svg+xml'
            default:
                return 'text/plain'
        }
    }

    /**
     * @param response
     * @private
     */
    _sendNotFound(response) {
        response.writeHead(404)
        response.end('404 Not found')
    }
}

module.exports = WebAdmin