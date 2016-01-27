# telegram-bot
Very powerful module for creating Telegram bots. 

## Get started

First of all you need to create your bot and get Token, you can do it right in telegram, just write to @BotFather.

Now lets write simple bot!

```js 
'use strict'

var tg = require('telegram-node-bot')('YOUR_TOKEN')

tg.router.
    when(['ping'], 'PingController')
     
tg.controller('PingController', ($) => {
	tg.for('ping', () => {
		$.sendMessage('pong')
	})
}) 
```
Thats it!

![Bot](ScreenShot.png)
  
## Introduction

I'm using something like MVC, so we have router and controllers.
First you need to declare your commands and which controller will handle it.
Then you need to write controllers and handle specific commands in it.

## Router
For example if we want three command: /start, /stop and /restart 
And we want that commands to be handled by different controllers.

Router declaration code will be like this: 

```js 
tg.router.
    when(['/start'], 'StartController').
    when(['/stop'], 'StopController').
    when(['/restart'], 'RestartController')
```
	
Probably we will have a case when user send us command we didn't know, for that case router have otherwise function: 

```js 
tg.router.
    when(['/start'], 'StartController').
    when(['/stop'], 'StopController').
    when(['/restart'], 'RestartController').
    otherwise('OtherwiseController')
``` 
Now all unknown commands will be handled by OtherwiseController.


Let's say you have some login logic in controller probably you need to route user to login 'page'.
For that case you have routeTo function:


```js 
tg.controller('StartController', ($) => {
	tg.for('/profile', ($) => {
		if(!logined){
			$.routeTo("/login")
		}		
	}) 
})
``` 

## Controllers

Controllers are very simple: 

```js 
tg.controller('ExampleController', ($) => {
	//you can create any functions, variables, etc. here
	
	tg.for('/test', ($) => {
		 //will handle /test command		
	}) 	
	tg.for('/example', ($) => {
		 //will handle /exaple command		
	})
})
``` 

Remember: if you want to handle command in controller you need to declare it in router.

## Сhain

Let's say you asked user for something, now you need to wait his next message and make some logic, right? 

waitForRequest function well help you: 

```js 
tg.controller('ExampleController', ($) => { 
	tg.for('/reg', ($) => {
		 $.sendMessage('Send me your name!')
		 $.waitForRequest(($) => {
			 $.sendMessage('Hi ' + $.message.text + '!')
		 })	
	}) 	 
})
``` 

waitForRequest will call callback and pass new context.


## Methods
You can call methods two ways: 

Directly from tg: 

```js  
tg.sendMessage(chatId, 'Hi')
```

Or if you using controllers controller will pass you context '$' than already knows user id, so it's more easy to use:

```js  
$.sendMessage('Hi')
```

All methods have required parameters and optional parameters, you can find them in  [api documentation](https://core.telegram.org/bots/api#available-methods) 
Also all methods have callback parameter, callback returns request result, callback parameter always the last one.


## Forms

With $.runForm function you can create forms: 

```js  
var form = {
    name: {
	    q: 'Send me your name',
	    error: 'sorry, wrong input',
	    validator: (input, callback) => {
		    if(input['text']) {
			    callback(true)
			    return
		    }
			     
		    callback(false)
	    }
    },
    age: {
	    q: 'Send me your age',
	    error: 'sorry, wrong input',
	    validator: (input, callback) => {
		    if(input['text'] && IsNumeric(input['text'])) {
			    callback(true)
			    return
		    }
			     
		    callback(false)
	    }
    }		    
}

$.runForm(form, (result) => {
	console.log(result)
})	
```

Bot will ask send the 'q' message to user, wait for message, validate it with your validator function and save the answer, if validation fails bot will ask again that question.

## Menu

You can create menu with $.runMenu function: 


```js  
$.runMenu({
    message: 'Select:',
    'Exit': {
	    message: 'Do you realy want to exit?',
	    'yes': () => {
		    
	    },
	    'no': () => {
		    
	    }
    } 
})	
```

Layouting menu: 

You can pass the maximum number of buttons in line like this: 

```js  
$.runMenu({
    message: 'Select:',
    layout: 2,
    'test1': () => {}, //will be on first line
    'test2': () => {}, //will be on first line
    'test3': () => {}, //will be on second line
    'test4': () => {}, //will be on second line
    'test5': () => {}, //will be on third line
})	
```
Or you can pass an array of number of buttons for each line: 

```js  
$.runMenu({
    message: 'Select:',
    layout: [1, 2, 1, 1],
    'test1': () => {}, //will be on first line
    'test2': () => {}, //will be on second line
    'test3': () => {}, //will be on second line
    'test4': () => {}, //will be on third line
    'test5': () => {}, //will be on fourth line
})	
```

If you pass layout

Bot will create keyboard and send it with your message, when user select if item is callback bot will call it, if it's submenu bot will send submenu.


## Scope

As you can see controller methods always give you scope ( $ ).

Scope have:

- all methods with already set chatId
- chatId (current chat id)
- message

## Methods List
List of supported methods with required parameters:


```js  
sendPhoto(chatId, photo)
sendDocument(chatId, document)
sendMessage(chatId, text)
sendLocation(chatId, latitude, longitude)
sendAudio(chatId, audio)
forwardMessage(chatId, fromChatId, messageId)
getFile(fileId)
sendChatAction(chatId, action)
getUserProfilePhotos(userId)
sendSticker(chatId, sticker)
sendVoice(chatId, voice)
sendVideo(chatId, video)
```
## Additional methods

```js
sendPhotoFromUrl(chatId, url)
sendDocumentFromUrl(chatId, url)
call(method, params)
```

## Additional info

For sendDocument method document parameter need to be like this: 

```js  
var doc =  {
    value: fs.createReadStream('file.png'), //stream
    filename: 'photo.png',
    contentType: 'image/png'
}

$.sendDocument(doc)
```

For sendPhoto method photo parameter is ReadStream object, example:

```js  
$.sendPhoto(fs.createReadStream('photo.jpeg'))
```

For sendAudio method audio parameter is ReadStream object, example:

```js 
$.sendAudio(fs.createReadStream('audio.mp3'))
``` 

For sendVoice method voice parameter is ReadStream object, example:

```js 
$.sendAudio(fs.createReadStream('voice.ogg'))
``` 
 
For sendVideo method video parameter is ReadStream object, example:

```js 
$.sendVideo(fs.createReadStream('video.mp4'))
``` 

For sendSticker method sticker parameter is ReadStream object, example:

```js 
$.sendSticker(fs.createReadStream('sticker.webp'))
```  

## License

Copyright (c) 2016 Narek Abovyan

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.