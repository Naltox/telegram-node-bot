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
        this.inlineRequestsHandler = Function()
        this.inlineCallbacks = {}
        this.callbackQueriesHandler = Function()
        this.callbackQueriesCallbacks = {}

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

        this.routes = this.routes.sort((a, b) => {
            var aMaxCommandLength = a.commands.reduce((a, b) => a.length > b.length ? a : b).length
            var bMaxCommandLength = b.commands.reduce((a, b) => a.length > b.length ? a : b).length

            return bMaxCommandLength > aMaxCommandLength
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
                callback(body, err)
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

        if (typeof photo == 'string') {
            preparedOptions.params.photo = photo
            data = undefined
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

    sendDocument(chatId, document, options, callback) {
        var preparedOptions = this._prepareOptions(options, callback, {
            chat_id: chatId
        })

        var data = {
            document: document
        }

        if (typeof document == 'string') {
            preparedOptions.params.document = document
            data = undefined
        }

        req.post({
            url: this._url + 'sendDocument',
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
                audio: {
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

    sendAudioFromUrl(chatId, url, options, callback) {
        callback = callback || Function()
        var fileName = Math.random().toString(16) + ".mp3"
        var wstream = fs.createWriteStream(__dirname + '/temp/' + fileName)
        var self = this



        wstream.on('finish', () => {
            self.sendAudio(chatId, fs.createReadStream(__dirname + '/temp/' + fileName), options, (body, err) => {
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

    kickChatMember(chatId, userId, callback) {
        var preparedOptions = this._prepareOptions({}, callback, {
            chat_id: chatId,
            user_id: userId
        })

        this.call('kickChatMember', preparedOptions.params, preparedOptions.callback)
    }

    unbanChatMember(chatId, userId, callback) {
        var preparedOptions = this._prepareOptions({}, callback, {
            chat_id: chatId,
            user_id: userId
        })

        this.call('unbanChatMember', preparedOptions.params, preparedOptions.callback)
    }

    sendVenue(chatId, latitude, longitude, title, address, options, callback) {
        var preparedOptions = this._prepareOptions(options, callback, {
            chat_id: chatId,
            latitude: latitude,
            longitude: longitude,
            title: title,
            address: address
        })

        this.call('sendVenue', preparedOptions.params, preparedOptions.callback)
    }

    sendContact(chatId, phoneNumber, firstName, options, callback) {
        var preparedOptions = this._prepareOptions(options, callback, {
            chat_id: chatId,
            phone_number: phoneNumber,
            first_name: firstName
        })

        this.call('sendContact', preparedOptions.params, preparedOptions.callback)
    }

    editMessageText(text, options, callback) {
        var preparedOptions = this._prepareOptions(options, callback, {
            text: text
        })

        this.call('editMessageText', preparedOptions.params, preparedOptions.callback)
    }

    editMessageCaption(options, callback) {
        var preparedOptions = this._prepareOptions(options, callback, {})

        this.call('editMessageText', preparedOptions.params, preparedOptions.callback)
    }

    editMessageReplyMarkup(options, callback) {
        var preparedOptions = this._prepareOptions(options, callback, {})

        this.call('editMessageReplyMarkup', preparedOptions.params, preparedOptions.callback)
    }

    answerCallbackQuery(callbackQueryId, options, callback) {
        var preparedOptions = this._prepareOptions(options, callback, {
            callback_query_id: callbackQueryId
        })

        this.call('answerCallbackQuery', preparedOptions.params, preparedOptions.callback)
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
        if (update.chosen_inline_result) {
            return
        }

        if (update.callback_query) {
            var callbackQuery = update.callback_query


            if (this.callbackQueriesCallbacks[callbackQuery.message.chat.id + ':' + callbackQuery.data]) {
                this.callbackQueriesCallbacks[callbackQuery.message.chat.id + ':' + callbackQuery.data](callbackQuery)
                return
            }

            var callbackScope = this._createCallbackScope(callbackQuery)
            this.callbackQueriesHandler(callbackScope)

            return
        }

        if (update.inline_query) {
            var inlineQuery = update.inline_query

            if (this.inlineCallbacks[inlineQuery.from.id + ':' + inlineQuery.query]) {
                this.inlineCallbacks[inlineQuery.from.id + ':' + inlineQuery.query](inlineQuery)
                return
            }

            var inlineScope = this._createInlineScope(inlineQuery)
            this.inlineRequestsHandler(inlineScope)

            return
        }

        if (update.edited_message) {
            // no support for edited messages
            return;
        }

        if (!update.message) {
            // further code will break if there is no 'message' in 'update'
            return;
        }

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

            if (!route.commands) {
                continue
            }
            for (var commandIndex in route.commands.sort((a, b) => b.length - a.length)) {
                var command = route.commands[commandIndex]

                scope.args = message ? message.replace(command, '').trim() : null
                scope.query = message ? this._prepareBotQuery(command, message) : null

                if (( message && message.indexOf(command) > -1 ) || scope.query) {
                    this.controllers[route.controller](scope)

                    if (this.controllersCommands[route.controller] && this.controllersCommands[route.controller][command]) {
                        this.controllersCommands[route.controller][command](scope)
                    }

                    return
                } else {
                    if (this.router.routes['otherwise'] &&
                        commandIndex == route.commands.length - 1 &&
                        routeIndex == this.router.routes.length - 1) {

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

    _prepareBotQuery(mask, query) {
        var mask = mask.split(' ')
        var query = query.split(' ')

        var result = {}

        if (mask.length == query.length) {
            for (var i = 0; i < query.length; i++) {
                switch (mask[i][0]) {
                    case '/':
                        if (mask[i] !== query[i]) {
                            return undefined
                        }

                        result.command = query[i]

                        break
                    case ':':
                        result[mask[i].replace(':', '')] = query[i]
                        break
                }
            }
        }

        if (!result.command)
            return undefined

        return result
    }

    _createScope(chatId, user, update) {
        var self = this

        var scope = {
            chatId: chatId,
            user: user,
            message: update.message,
            runForm: self._runForm,
            runMenu: self._runMenu,
            routeTo: function (command) {
                self.waitingCallbacks[this.chatId] = null
                update['message']['text'] = command
                self._processCommand(update)
            }
        }

        var funcs = [
            'sendPhoto', 'sendPhotoFromUrl', 'sendDocument', 'sendDocumentFromUrl',
            'sendMessage', 'sendLocation', 'sendAudio', 'sendAudioFromUrl', 'forwardMessage',
            'sendChatAction', 'sendSticker', 'sendSticker', 'sendVoice', 'sendVideo', 'waitForRequest',
            'sendContact', 'sendVenue', 'unbanChatMember', 'kickChatMember', 'runInlineMenu'
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
                    resize_keyboard: formData[key].resize_keyboard || false,
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

        var ignoredKeys = ['message', 'layout', 'options', 'resize_keyboard', 'anyMatch']

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
                resize_keyboard: ( menuData.resize_keyboard && menuData.resize_keyboard == true ),
                one_time_keyboard: true,
                keyboard: keyboard
            })
        }

        if (menuData.options) {
            var sub_keys = Object.keys(menuData.options)

            sub_keys.forEach(key => options[key] = menuData.options[key])
        }

        this.sendMessage(startMessage, options)

        this.waitForRequest(($) => {
            if (keys.indexOf($.message['text']) > -1 && ignoredKeys.indexOf($.message['text']) == -1) {
                if (typeof menuData[$.message['text']] == 'object') {
                    $.runMenu(menuData[$.message['text']])
                } else {
                    menuData[$.message['text']]($)
                }
            } else if (menuData.anyMatch) {
                menuData.anyMatch($);
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
                        this.controllersCommands[route.controller] = {}
                    }

                    this.controllersCommands[route.controller][command] = callback
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

    inlineMode(handler) {
        this.inlineRequestsHandler = handler
    }

    callbackQueries(handler) {
        this.callbackQueriesHandler = handler
    }

    runInlineMenu() {
        var args = Array.prototype.slice.call(arguments)
        var chatId = args[0]
        var method = args[1]
        var methodArgs = args.slice(2, args.length - 2)
        var menuData = args[args.length - 2]
        var layout = args[args.length - 1]

        var keyboard = []

        var callbacks = []

        var getBtn = (InlineKeyboardButton) => {
            var rnd = Math.random().toString()

            this.callbackQueriesCallbacks[chatId + ':' + rnd] = InlineKeyboardButton.callback

            var btn = JSON.parse(JSON.stringify(InlineKeyboardButton))
            delete btn.callback

            callbacks.push(rnd)

            btn.callback_data = rnd

            return(btn)
        }

        if (layout) {
            var lineIndex = 0

            menuData.forEach((InlineKeyboardButton) => {
                if (!keyboard[lineIndex])
                    keyboard[lineIndex] = []

                keyboard[lineIndex].push(getBtn(InlineKeyboardButton))

                if (typeof layout == 'number') {
                    if (keyboard[lineIndex].length == layout) {
                        lineIndex++
                    }
                } else {
                    if (keyboard[lineIndex].length == layout[lineIndex]) {
                        lineIndex++
                    }
                }
            })
        } else {
            menuData.forEach((InlineKeyboardButton) => {
                keyboard.push(getBtn(InlineKeyboardButton))
            })
        }

        methodArgs[methodArgs.length - 1].reply_markup = JSON.stringify({
            inline_keyboard: keyboard
        })

        methodArgs.unshift(chatId)

        this[method].apply(this, methodArgs)
    }

    answerInlineQuery(inlineQueryId, results, options, callback) {
        if (!results[0].id) {
            results.forEach(answer => answer.id = Math.random().toString(36).substring(2))
        }
        var preparedOptions = this._prepareOptions(options, callback, {
            inline_query_id: inlineQueryId,
            results: JSON.stringify(results)
        })

        this.call('answerInlineQuery', preparedOptions.params, preparedOptions.callback)
    }

    paginatedAnswer(inlineQuery, data, answersPerPage, options) {
        var slicedData = data
        var nextOffset = answersPerPage

        if (!data[0].id) {
            data.forEach(answer => answer.id = Math.random().toString(36).substring(2))
        }
        if (inlineQuery.offset) {
            slicedData = data.slice(inlineQuery.offset)
            nextOffset = parseInt(inlineQuery.offset) + parseInt(answersPerPage)
        }
        if (nextOffset > data.length) {
            nextOffset = ''
        }
        if (slicedData.length <= answersPerPage) {
            this.answerInlineQuery(inlineQuery.id, slicedData.slice(0, answersPerPage), options)
            return
        }


        this.answerInlineQuery(inlineQuery.id, slicedData.slice(0, answersPerPage), options, {
            next_offset: nextOffset
        })

        if (!(nextOffset > data.length)) {
            this.inlineCallbacks[inlineQuery.from.id + ':' + inlineQuery.query] = (query) => {
                this.paginatedAnswer(query, data, answersPerPage, options)
            }
        }

    }

    _createInlineScope(inlineQuery) {
        inlineQuery.answer = this.answerInlineQuery.bind(this, inlineQuery.id)
        inlineQuery.paginatedAnswer = this.paginatedAnswer.bind(this, inlineQuery)

        return inlineQuery
    }

    _createCallbackScope(callbackQuery) {
        callbackQuery.answer = this.answerCallbackQuery.bind(this, callbackQuery.id)

        return callbackQuery
    }
}

module.exports = function (token) {
    return new Telegram(token)
}
