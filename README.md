# telegram-bot
Simple node module for creating Telegram bots.

## Get started

First of all you need to create your bot and get Token, you can do it right in telegram, just white to @BotFather.

Now lets write simplr bot!

```js 
var bot = require('telegram-node-bot')('YOUR_TOKEN')

bot.start({
	'ping': function(chatId, user, args){
		bot.sendMessage(chatId, 'pong')
	}
})

```
Thats it!

![Bot](ScreenShot.png)

## Documentation

- [Commands](#commands)
- [Methods](#methods)   

## Commands
To start your bot you need to pass bot.start function your command object:

```js  
bot.start({
	'ping': function(chatId, user, args){
		bot.sendMessage(chatId, 'pong')
	},
	'test': function(chatId, user, args){
		console.log('test!')
	},
	'': function(chatId, user, args, message){
		//will be called for any other command
	}
})

```
As you can see the key name is the command, so if bot get message that contains the key it will call your function and pass some data to it.

- [chatId] id of chat the message is from
- [user] user object of user that sendet the message
- [args] command agrumets, for example if you have command 'test' and someone will send you 'test 123' message you can find '123' in args variable
- [message] full message object if you need


## Methods

- [sendMessage](#sendmessage) 
- [sendPhoto](#sendphoto)
- [sendPhotoFromUrl](#sendphotofromurl) 
- [sendDocument](#senddocument)
- [sendDocumentFromUrl](#senddocumentfromurl)
- [Call](#call)

## sendMessage

Sends text message, splits it if it's very big

```js   
bot.sendMessage(chatId, 'test', function(response, err){
	
})  
```
## sendPhoto

Sends photo to chat

```js   
bot.sendPhoto(chatId, fs.createReadStream('photo.jpg'), 'caption', function(body, err){
	
})  
```
## sendPhotoFromUrl

Downloads photo from url to temp directory, sends it to chat and deletes it.

```js   
bot.sendPhotoFromUrl(chatId, 'http://example.com/test.jpg', 'caption', function(body, err){
	
})  
```

##sendDocument

Sends documet to chat

```js   
var document = {
	value: fs.createReadStream('photo.png'),
	filename: 'photo.png',
    contentType: 'image/png'
}
bot.sendDocument(chatId, document, 'caption', function(body, err){
	
})  
```

## sendDocumentFromUrl

Downloads documet from url to temp directory, sends it to chat and deletes it.

```js   
var documet_data = {
	filename: 'photo.png',
	contentType: 'image/png'
}
bot.sendDocumentFromUrl(chatId, 'http://example.com/test.png', document_data, 'caption', function(body, err){
	
})  
```
## Call

You can this function to call other methods: 

```js   
var params = {
	chat_id: 123,
	from_chat_id: 321,
	message_id: 777
}
bot.call('forwardMessage', params, function(body, err){
	
})  
```