'use strict'

var req = require('tiny_request')
var fs = require('fs')

class Telegram {
    constructor(token) {
        this._token = token
        this._url = 'https://api.telegram.org/bot' + this._token + '/'

        this.router = {
            when: this._when,
            otherwise: this._otherwise,
            routes: []
        }
        this.controllers = {}
        this.controllersCommands = {}
        this.waitingCallbacks = {}

        if (!fs.existsSync(__dirname + '/temp/')) {
            fs.mkdirSync(__dirname + '/temp/')
        }

        this.start()
    }
    _when(commands, controller) {
        if (typeof commands == 'string') {
            commands = [commands]
        }

        this.routes.push({
            commands: commands,
            controller: controller
        })

        return this
    }
    _otherwise(controller) {
        this.routes['otherwise'] = controller

        return this
    }
    routeTo(chatId, command) {
        this.waitingCallbacks[chatId] = null
        this._processCommand({
            message: {
                chat: {
                    id: chatId
                },
                text: command
            }
        })
    }
    controller(name, controller) {
        this.controllers[name] = controller
    }
    call(method, params, callback) {
        callback = callback || Function()

        req.post({
            url: this._url + method,
            form: params,
            json: true
        }, (body, response, err) => {
            if (!err && response.statusCode == 200) {
                callback(body)
            } else {
                callback(undefined, err)
            }
        })
    }
    sendPhoto(chatId, photo, options, callback) {
        var preparedOptions = this._prepareOptions(options, callback, {
            chat_id: chatId
        })

        var data = {
            photo: {
                value: photo,
                filename: 'photo.png',
                contentType: 'image/png'
            }
        }

        req.post({
            url: this._url + 'sendPhoto',
            query: preparedOptions.params,
            multipart: data,
            json: true
        }, (body, response, err) => {
            if (!err) {
                preparedOptions.callback(body)
            } else {
                preparedOptions.callback(undefined, err)
            }
        })
    }
    sendPhotoFromUrl(chatId, url, options, callback) {
        callback = callback || Function()
        var fileName = Math.random().toString(16) + ".jpg"
        var wstream = fs.createWriteStream(__dirname + '/temp/' + fileName)
        var self = this



        wstream.on('finish', () => {
            self.sendPhoto(chatId, fs.createReadStream(__dirname + '/temp/' + fileName), options, (body, err) => {
                fs.unlink(__dirname + '/temp/' + fileName)
                if (!err) {
                    callback(body)
                } else {
                    callback(undefined, err)
                }
            })
        })

        req.get({
            url: url,
            pipe: wstream
        })
    }
    sendDocument(chatId, document, caption, callback) {
        callback = callback || Function()
        caption = caption || ''

        var data = {
            document: document
        }

        req.post({
            url: this._url + 'sendDocument',
            query: {
                chat_id: chatId,
                caption: caption
            },
            multipart: data,
            json: true
        }, (body, response, err) => {
            if (!err) {
                callback(body)
            } else {
                callback(undefined, err)
            }
        })
    }
    sendDocumentFromUrl(chatId, url, document, caption, callback) {
        callback = callback || Function()
        var fileName = Math.random().toString(16) + ".dat"
        var wstream = fs.createWriteStream(__dirname + '/temp/' + fileName)
        var self = this

        wstream.on('finish', () => {
            document['value'] = fs.createReadStream(__dirname + '/temp/' + fileName)

            self.sendDocument(chatId, document, caption, (body, err) => {
                fs.unlink(__dirname + '/temp/' + fileName)
                if (!err) {
                    callback(body)
                } else {
                    callback(undefined, err)
                }
            })
        })
        req.get({
            url: url,
            pipe: wstream
        })
    }
    sendMessage(chatId, text, options, callback) {
        var preparedOptions = this._prepareOptions(options, callback, {
            chat_id: chatId,
            text: text
        })

        if (text.length > 4096) {
            var self = this
            this.sendMessage(chatId, text.slice(0, 4096), options, (r) => {
                if (r) {
                    self.sendMessage(chatId, text.slice(4096, text.length), options, callback)
                }
            })
        } else {
            this.call('sendMessage', preparedOptions.params, preparedOptions.callback)
        }
    }
    sendLocation(chatId, latitude, longitude, options, callback) {
        var preparedOptions = this._prepareOptions(options, callback, {
            chat_id: chatId,
            latitude: latitude,
            longitude: longitude
        })
        this.call('sendLocation', preparedOptions.params, preparedOptions.callback)
    }
    sendAudio(chatId, audio, options, callback) {
        var preparedOptions = this._prepareOptions(options, callback, {
            chat_id: chatId
        })
		
        if (typeof audio == 'string') {
            preparedOptions.params[audio] = audio
            this.call('sendAudio', preparedOptions.params, preparedOptions.callback)
        } else {
            var data = {
                voice: {
                    value: audio,
                    filename: 'audio.mp3',
                    contentType: 'audio/mpeg'
                }
            }

            req.post({
                url: this._url + 'sendAudio',
                query: preparedOptions.params,
                multipart: data,
                json: true
            }, (body, response, err) => {
                if (!err) {
                    preparedOptions.callback(body)
                } else {
                    preparedOptions.callback(undefined, err)
                }
            })
        }
    }
    forwardMessage(chatId, fromChatId, messageId, callback) {
        this.call('forwardMessage', {
            chat_id: chatId,
            from_chat_id: fromChatId,
            message_id: messageId
        }, callback)
    }
    getFile(fileId, callback) {
        this.call('getFile', {
            file_id: fileId
        }, callback)
    }
    sendChatAction(chatId, action, callback) {
        this.call('sendChatAction', {
            chat_id: chatId,
            action: action
        }, callback)
    }
    getUserProfilePhotos(userId, options, callback) {
        var preparedOptions = this._prepareOptions(options, callback, {
            user_id: userId
        })
        this.call('getUserProfilePhotos', preparedOptions.params, preparedOptions.callback)
    }
    sendSticker(chatId, sticker, options, callback) {
        var preparedOptions = this._prepareOptions(options, callback, {
            chat_id: chatId
        })

        if (typeof sticker == 'string') {
            preparedOptions.params['sticker'] = sticker
            this.call('sendSticker', preparedOptions.params, preparedOptions.callback)
        } else {
            var data = {
                sticker: {
                    value: sticker,
                    filename: 'sticker.webp',
                    contentType: ''
                }
            }

            req.post({
                url: this._url + 'sendSticker',
                query: preparedOptions.params,
                multipart: data,
                json: true
            }, (body, response, err) => {
                if (!err) {
                    preparedOptions.callback(body)
                } else {
                    preparedOptions.callback(undefined, err)
                }
            })
        }
    }
    sendVoice(chatId, voice, options, callback) {
        var preparedOptions = this._prepareOptions(options, callback, {
            chat_id: chatId
        })

        if (typeof voice == 'string') {
            preparedOptions.params['voice'] = voice
            this.call('sendVoice', preparedOptions.params, callback)
        } else {
            var data = {
                voice: {
                    value: voice,
                    filename: 'voice.ogg',
                    contentType: 'audio/ogg'
                }
            }

            req.post({
                url: this._url + 'sendVoice',
                query: preparedOptions.params,
                multipart: data,
                json: true
            }, (body, response, err) => {
                if (!err) {
                    preparedOptions.callback(body)
                } else {
                    preparedOptions.callback(undefined, err)
                }
            })
        }
    }
    sendVideo(chatId, video, options, callback) {
        var preparedOptions = this._prepareOptions(options, callback, {
            chat_id: chatId
        })

        if (typeof video == 'string') {
            preparedOptions.params['video'] = video
            this.call('sendVideo', preparedOptions.params, callback)
        } else {
            var data = {
                video: {
                    value: video,
                    filename: 'video.mp4',
                    contentType: 'video/mp4'
                }
            }

            req.post({
                url: this._url + 'sendVideo',
                query: preparedOptions.params,
                multipart: data,
                json: true
            }, (body, response, err) => {
                if (!err) {
                    preparedOptions.callback(body)
                } else {
                    preparedOptions.callback(undefined, err)
                }
            })
        }
    }
    _getUpdates(callback, offset) {
        var offset = offset ? offset : 0
        var self = this

        self.call('getUpdates', {
            timeout: 50,
            offset: offset
        }, (updates, err) => {
            if (!err && updates) {
                if (updates["result"]) {
                    if (updates["result"].length !== 0) {
                        self._getUpdates(callback, updates["result"][updates["result"].length - 1]["update_id"] + 1)
                        callback(updates)
                    } else {
                        self._getUpdates(callback, offset)
                    }
                } else {
                    self._getUpdates(callback, offset)
                }
            } else {
                self._getUpdates(callback, offset)
            }
        })
    }
    _processCommand(update) {
        if (update.message["chat"]) {
            var chatId = update.message["chat"]["id"]
        } else {
            var chatId = update.message.from.id
        }
        var user = update.message.from
        var message = update.message["text"]

        var scope = this._createScope(chatId, user, update)

        if (this.waitingCallbacks[chatId] !== null && this.waitingCallbacks[chatId]) {
            var waitingFunc = this.waitingCallbacks[chatId]
            waitingFunc(scope)
            if (this.waitingCallbacks[chatId] == waitingFunc) {
                this.waitingCallbacks[chatId] = null
            }

            return
        } 

        for (var routeIndex in this.router.routes) {
            var route = this.router.routes[routeIndex]

            for (var commandIndex in route.commands) {
                var command = route.commands[commandIndex]

                scope['args'] = message ? message.replace(command, '').trim() : null
				
                if (message && message.indexOf(command) > -1) {
                    this.controllers[route.controller](scope)
                    if (this.controllersCommands[route.controller]) {
                        for (var contextCommandIndex in this.controllersCommands[route.controller]) {
                            if (message && message.indexOf(this.controllersCommands[route.controller][contextCommandIndex].command) > -1) {
                                this.controllersCommands[route.controller][contextCommandIndex].callback(scope)
                            }
                        }
                    }

                    return
                } else {
                    if (this.router.routes['otherwise'] && commandIndex == route.commands.length - 1 && routeIndex == this.router.routes.length - 1) {
                        this.controllers[this.router.routes['otherwise']](scope)

                        return
                    }
                }
            }
        }
    }
    _prepareOptions(options, callback, params) {
        callback = callback || Function()
        options = options || {}

        if (typeof options == 'function') {
            callback = options
            options = {}
        }

        var paramsKeys = Object.keys(params)


        paramsKeys.forEach((key, i) => {
            options[key] = params[key]
        })
        return {
            callback: callback,
            params: options
        }
    }
    _createScope(chatId, user, update) {
        var self = this

        var scope = {
            chatId: chatId,
            user: user,
            message: update.message,
            runForm: self._runForm,
            runMenu: self._runMenu,
            routeTo: function(command) {
                self.waitingCallbacks[this.chatId] = null
                update['message']['text'] = command
                self._processCommand(update)
            }
        }

        var funcs = [
            'sendPhoto', 'sendPhotoFromUrl', 'sendDocument', 'sendDocumentFromUrl',
            'sendMessage', 'sendLocation', 'sendAudio', 'forwardMessage', 'sendChatAction',
            'sendSticker', 'sendSticker', 'sendVoice', 'sendVideo', 'waitForRequest'
        ]

        funcs.forEach((func) => {
            scope[func] = self[func].bind(self, scope.chatId)
        })

        return scope
    }
    _runForm(formData, callback) {
        var i = 0

        var run = () => {
            var key = Object.keys(formData)[i]

            this.sendMessage(formData[key].q, {
                disable_web_page_preview: true,
                reply_markup: formData[key].keyboard ? JSON.stringify({
                    one_time_keyboard: true,
                    keyboard: formData[key].keyboard
                }) : ''
            })

            this.waitForRequest(($) => {
                formData[key].validator($.message, (valid) => {
                    if (valid == true) {
                        result[key] = $.message.text
                        i++

                        if (i == Object.keys(formData).length) {
                            callback(result)
                            return
                        }

                        run()
                    } else {
                        this.sendMessage(formData[key].error, {
                            disable_web_page_preview: true
                        }, () => {
                            run()
                        })
                    }
                })
            })
        }

        var result = {}
        var keys = Object.keys(formData)

        run()
    }
    _runMenu(menuData) {
        var startMessage = menuData.message

        var ignoredKeys = ['message', 'layout']

        var keys = Object.keys(menuData)
        var keyboard = []

        if (menuData.layout) {
            var lineIndex = 0

            keys.forEach((key) => {
                if (ignoredKeys.indexOf(key) == -1) {
                    if (!keyboard[lineIndex])
                        keyboard[lineIndex] = []

                    keyboard[lineIndex].push(key)

                    if (typeof menuData.layout == 'number') {
                        if (keyboard[lineIndex].length == menuData.layout) {
                            lineIndex++
                        }
                    } else {
                        if (keyboard[lineIndex].length == menuData.layout[lineIndex]) {
                            lineIndex++
                        }
                    }

                }
            })
        } else {
            keys.forEach((key) => {
                if (ignoredKeys.indexOf(key) == -1) {
                    keyboard.push([key])
                }
            })
        }


        var options = {
            reply_markup: JSON.stringify({
	            hide_keyboard: true,
	            resize_keyboard: true,
                one_time_keyboard: true,
                keyboard: keyboard
            })
        }
        this.sendMessage(startMessage, options)

        this.waitForRequest(($) => {
            if (keys.indexOf($.message['text']) > -1 && ignoredKeys.indexOf($.message['text']) == -1) {
                if (typeof menuData[$.message['text']] == 'object') {
                    $.runMenu(menuData[$.message['text']])
                } else {
                    menuData[$.message['text']]($)
                }
            } else {
                $.runMenu(menuData)
            }
        })
    }
    for(_command, callback) {
        for (var routeIndex in this.router.routes) {
            var route = this.router.routes[routeIndex]

            for (var commandIndex in route.commands) {
                var command = route.commands[commandIndex]

                if (command == _command) {
                    if (!this.controllersCommands[route.controller]) {
                        this.controllersCommands[route.controller] = []
                    }

                    var empty = true
                    this.controllersCommands[route.controller].forEach((item) => {
                        if (item.command == _command) {
                            empty = false
                        }
                    })
                    if (empty == true) {
                        this.controllersCommands[route.controller].push({
                            command: command,
                            callback: callback
                        })
                    } else {
                        for (var commandIndex in this.controllersCommands[route.controller]) {
                            if (this.controllersCommands[route.controller][commandIndex].command == _command) {
                                this.controllersCommands[route.controller][commandIndex].callback = callback
                            }
                        }
                    }
                }
            }
        }
    }
    waitForRequest(chatId, callback) {
        this.waitingCallbacks[chatId] = callback
    }
    start() {
        this._getUpdates((updates) => {
            this._asyncEach(updates.result, (update) => {
                this._processCommand(update)
            })
        })
    }
    _asyncEach(array, callback) {
        var i = 0
        setImmediate(function iter() {
            if (i === array.length) {
                return
            }
            callback.call(array, array[i], i++)
            setImmediate(iter)
        })
    }
}

module.exports = function(token) {
    return new Telegram(token)
}