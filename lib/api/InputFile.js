'use strict'

const fs = require("fs")
const req = require('tiny_request')
const path = require('path')

const STANDARD_TYPES = {
    photo: {
        filename: 'photo.png',
        type: 'image/png'
    },
    audio: {
        filename: 'audio.mp3',
        type: 'audio/mpeg'
    },
    document: {
        filename: 'data.dat',
        type: ''
    },
    sticker: {
        filename: 'sticker.webp',
        type: ''
    },
    video: {
        filename: 'video.mp4',
        type: 'audio/mp4'
    }
}

/**
 * This class represents any file that's going be send to Telegram
 */
class InputFile {
    /**
     * @param {string|null} fileId
     * @param {string|null} filePath
     * @param {string|null} fileUrl
     * @param {string|null} fileName
     * @private
     */
    constructor(fileId, filePath, fileUrl, fileName) {
        this._fileId = fileId
        this._filePath = filePath
        this._fileUrl = fileUrl
        this._fileName = fileName
    }

    /**
     *
     * @param {string} type
     * @param {Object} params
     * @returns {Promise<Object>}
     */
    prepareRequest(type, params) {
        return new Promise((resolve) => {
            if (this._fileId) {
                params[type] = this._fileId

                resolve({ params: params, multipart: null })
            }

            if (this._fileUrl) {
                const filePath = __dirname + '/temp/' + Math.random().toString(36).substring(7) + '.dat'
                const wstream = fs.createWriteStream(filePath)

                const sendedCallback = () => {
                    fs.unlink(filePath)
                }

                wstream.on('finish', () => {
                    const multipart = { }

                    multipart[type] = {
                        value: fs.createReadStream(filePath),
                        filename: this._fileName || STANDARD_TYPES[type].filename,
                        contentType: STANDARD_TYPES[type].type
                    }

                    resolve({ params: params, multipart: multipart, callback: sendedCallback})
                })

                req.get({
                    url: this._fileUrl,
                    pipe: wstream
                })
            }

            if (this._filePath) {
                const multipart = { }

                multipart[type] = {
                    value: fs.createReadStream(this._filePath),
                    filename: path.basename(this._filePath) || STANDARD_TYPES[type].filename,
                    contentType: STANDARD_TYPES[type].type
                }

                resolve({ params: params, multipart: multipart })
            }
        })
    }

    /**
     * Creates InputFile from plain Object
     *
     * @param {Object|string} raw
     * @returns {InputFile}
     */
    static deserialize(raw) {
        if (typeof raw == 'string') {
            return InputFile.byId(raw)
        }

        if (raw.url) {
            return InputFile.byUrl(raw.url, raw.filename)
        }

        if (raw.path) {
            return InputFile.byFilePath(raw.path)
        }
    }

    /**
     * Creates InputFile by file id
     *
     * @param {string} id
     * @returns {InputFile}
     */
    static byId(id) {
        return new InputFile(id, null, null, null)
    }

    /**
     * Creates InputFile by file path
     *
     * @param {string} path
     * @returns {InputFile}
     */
    static byFilePath(path) {
        return new InputFile(null, path, null, null)
    }

    /**
     * Creates InputFile by url
     *
     * @param {string} url
     * @param {string} [fileName]
     * @returns {InputFile}
     */
    static byUrl(url, fileName) {
        return new InputFile(null, null, url, fileName)
    }
}

module.exports = InputFile