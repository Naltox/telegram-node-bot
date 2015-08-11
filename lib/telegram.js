var req = require('tiny_request')
var fs = require('fs')

var Telegram = function(token) {
    this._token = token
    this._url = 'https://api.telegram.org/bot' + this._token + '/'

    return this
}

Telegram.prototype.call = function(method, params, callback) {
    var callback = callback ? callback : function() {}

    req.post({
        url: this._url + method,
        form: params,
        json: true
    }, function(body, response, err) {
        if (!err && response.statusCode == 200) {
            callback(body)
        } else {
            callback(undefined, err)
        }
    })
}
Telegram.prototype.sendPhoto = function(chatId, photo, caption, callback) {
    var callback = callback ? callback : function() {}

    var data = {
        photo: {
            value: photo,
            filename: 'photo.png',
            contentType: 'image/png'
        }
    }
    var self = this

    req.post({
        url: this._url + 'sendPhoto',
        query: {
            chat_id: chatId,
            caption: caption
        },
        multipart: data,
        json: true
    }, function(body, response, err) {
        if (!err) {
            callback(body)
        } else {
            callback(undefined, err)
        }
    })
}
Telegram.prototype.sendPhotoFromUrl = function(chatId, url, caption, callback) {
    var callback = callback ? callback : function() {}

    var fileName = Math.random().toString(16) + ".jpg"
    var wstream = fs.createWriteStream('temp/' + fileName)
    var self = this

    wstream.on('finish', function() {
        self.sendPhoto(chatId, fs.createReadStream('temp/' + fileName), caption, function(body, err) {
            fs.unlink('temp/' + fileName)
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
Telegram.prototype.sendDocument = function(chatId, document, caption, callback) {
    var callback = callback ? callback : function() {}

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
    }, function(body, response, err) {
        if (!err) {
            callback(body)
        } else {
            callback(undefined, err)
        }
    })
}
Telegram.prototype.sendDocumentFromUrl = function(chatId, url, document, caption, callback) {
    var callback = callback ? callback : function() {}

    var fileName = Math.random().toString(16) + ".dat"
    var wstream = fs.createWriteStream('temp/' + fileName)
    var self = this

    wstream.on('finish', function() {
        document.value = fs.createReadStream('temp/' + fileName)

        self.sendDocument(chatId, document, caption, function(body, err) {
            fs.unlink('temp/' + fileName)
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
Telegram.prototype.sendMessage = function(chatId, text, keyboard, callback) {
    keyboard = keyboard ? keyboard : ''
    callback = callback ? callback : function() {}

    if (text.length > 4096) {
        var self = this
        this.sendMessage(chatId, text.slice(0, 4096), keyboard, function(r) {
            if (r) {
                self.sendMessage(chatId, text.slice(4096, text.length), keyboard, callback)
            }
        })
    } else {
        this.call('sendMessage', {
            chat_id: chatId,
            text: text,
            reply_markup: JSON.stringify(keyboard)
        }, callback)
    }
}
Telegram.prototype._getUpdates = function(callback, offset) {
    var offset = offset ? offset : 0
    var self = this

    self.call('getUpdates', {
        timeout: 50,
        offset: offset
    }, function(updates, err) {
        if (!err && updates !== undefined) {
            if (updates["result"] != undefined) {
                if (updates["result"].length !== 0) {
                    self._getUpdates(callback, updates["result"][updates["result"].length - 1]["update_id"] + 1)
                    callback(updates)
                } else {
                    self._getUpdates(callback, offset)
                }
            }
        }
    })
}
Telegram.prototype._processCommand = function(commandsList, update) {
    if (update.message["chat"] != undefined) {
        var chatId = update.message["chat"]["id"]
    } else {
        var chatId = update.message.from.id
    }
    var userId = update.message.from
    var message = update.message["text"]

    for (var command in commandsList) {
        if (message !== undefined && message.indexOf(command) > -1) {
            commandsList[command](chatId, userId, message.replace(command, '').trim(), update.message)
            return
        }
    }
}
Telegram.prototype.start = function(commandsList) {
    var self = this

    self._getUpdates(function(updates) {
        self._asyncEach(updates.result, function(update) {
            self._processCommand(commandsList, update)
        })
    })
}
Telegram.prototype._asyncEach = function(array, callback) {
    var i = 0
    setTimeout(function iter() {
        if (i === array.length) {
            return
        }
        callback.call(array, array[i], i++)
        setTimeout(iter, 0);
    }, 0)
}

module.exports = function(token) {
    return new Telegram(token)
}