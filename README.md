# telegram-bot
Simple node module for creating Telegram bots.

## Get started

First of all you need to create your bot and get Token, you can do it right in telegram, just white to @BotFather.

Now lets write simplr bot!

```js 
var bot = require('telegram-bot')('YOUR_TOKEN')

bot.start({
	'ping': function(chatId, user, args){
		bot.sendMessage(chatId, 'pong')
	}
})

```
Thats it!

![Bot](ScreenShot.png)