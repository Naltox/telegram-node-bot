'use strict'

const User = require('./User')
const Chat = require('./Chat')
const MessageEntity = require('./MessageEntity')
const Audio = require('./Audio')
const Document = require('./Document')
const Animation = require('./Animation')
const Game = require('./Game')
const PhotoSize = require('./PhotoSize')
const Sticker = require('./Sticker')
const Video = require('./Video')
const Voice = require('./Voice')
const VideoNote = require('./VideoNote')
const Contact = require('./Contact')
const Location = require('./Location')
const Venue = require('./Venue')
const Invoice = require('./Invoice')
const SuccessfulPayment = require('./SuccessfulPayment')
const PassportData = require('./PassportData')

/**
 * This object represents a message.
 */

class Message {
   /**
    *
    * @param {number} messageId
    * @param {User|null} [from]
    * @param {number} date
    * @param {Chat} chat
    * @param {User|null} [forwardFrom]
    * @param {Chat|null} [forwardFromChat]
    * @param {number|null} [forwardFromMessageId]
    * @param {string|null} [forwardSignature]
    * @param {number|null} [forwardDate]
    * @param {Message|null} [replyToMessage]
    * @param {number|null} [editDate]
    * @param {string|null} [mediaGroupId]
    * @param {string|null} [authorSignature]
    * @param {string|null} [text]
    * @param {MessageEntity[]|null} [entities]
    * @param {MessageEntity[]|null} [captionEntities]
    * @param {Audio|null} [audio]
    * @param {Document|null} [document]
    * @param {Animation|null} [animation]
    * @param {Game|null} [game]
    * @param {PhotoSize[]|null} [photo]
    * @param {Sticker|null} [sticker]
    * @param {Video|null} [video]
    * @param {Voice|null} [voice]
    * @param {VideoNote|null} [videoNote]
    * @param {string|null} [caption]
    * @param {Contact|null} [contact]
    * @param {Location|null} [location]
    * @param {Venue|null} [venue]
    * @param {User[]|null} [newChatMembers]
    * @param {User|null} [leftChatMember]
    * @param {string|null} [newChatTitle]
    * @param {PhotoSize[]|null} [newChatPhoto]
    * @param {boolean|null} [deleteChatPhoto]
    * @param {boolean|null} [groupChatCreated]
    * @param {boolean|null} [supergroupChatCreated]
    * @param {boolean|null} [channelChatCreated]
    * @param {number|null} [migrateToChatId]
    * @param {number|null} [migrateFromChatId]
    * @param {Message|null} [pinnedMessage]
    * @param {Invoice|null} [invoice]
    * @param {SuccessfulPayment|null} [successfulPayment]
    * @param {string|null} [connectedWebsite]
    * @param {PassportData|null} [passportData]
   */
   constructor(
     messageId, 
     from, 
     date, 
     chat, 
     forwardFrom, 
     forwardFromChat, 
     forwardFromMessageId, 
     forwardSignature, 
     forwardDate, 
     replyToMessage, 
     editDate, 
     mediaGroupId, 
     authorSignature, 
     text, 
     entities, 
     captionEntities, 
     audio, 
     document, 
     animation, 
     game, 
     photo, 
     sticker, 
     video, 
     voice, 
     videoNote, 
     caption, 
     contact, 
     location, 
     venue, 
     newChatMembers, 
     leftChatMember, 
     newChatTitle, 
     newChatPhoto, 
     deleteChatPhoto, 
     groupChatCreated, 
     supergroupChatCreated, 
     channelChatCreated, 
     migrateToChatId, 
     migrateFromChatId, 
     pinnedMessage, 
     invoice, 
     successfulPayment, 
     connectedWebsite, 
     passportData
   ) {
       this._messageId = messageId
       this._from = from
       this._date = date
       this._chat = chat
       this._forwardFrom = forwardFrom
       this._forwardFromChat = forwardFromChat
       this._forwardFromMessageId = forwardFromMessageId
       this._forwardSignature = forwardSignature
       this._forwardDate = forwardDate
       this._replyToMessage = replyToMessage
       this._editDate = editDate
       this._mediaGroupId = mediaGroupId
       this._authorSignature = authorSignature
       this._text = text
       this._entities = entities
       this._captionEntities = captionEntities
       this._audio = audio
       this._document = document
       this._animation = animation
       this._game = game
       this._photo = photo
       this._sticker = sticker
       this._video = video
       this._voice = voice
       this._videoNote = videoNote
       this._caption = caption
       this._contact = contact
       this._location = location
       this._venue = venue
       this._newChatMembers = newChatMembers
       this._leftChatMember = leftChatMember
       this._newChatTitle = newChatTitle
       this._newChatPhoto = newChatPhoto
       this._deleteChatPhoto = deleteChatPhoto
       this._groupChatCreated = groupChatCreated
       this._supergroupChatCreated = supergroupChatCreated
       this._channelChatCreated = channelChatCreated
       this._migrateToChatId = migrateToChatId
       this._migrateFromChatId = migrateFromChatId
       this._pinnedMessage = pinnedMessage
       this._invoice = invoice
       this._successfulPayment = successfulPayment
       this._connectedWebsite = connectedWebsite
       this._passportData = passportData
   }

   /**
    * Unique message identifier inside this chat
    * @returns {number}
   */
   get messageId() {
       return this._messageId
   }

   /**
    * Sender, empty for messages sent to channels
    * @returns {User|null}
   */
   get from() {
       return this._from
   }

   /**
    * Date the message was sent in Unix time
    * @returns {number}
   */
   get date() {
       return this._date
   }

   /**
    * Conversation the message belongs to
    * @returns {Chat}
   */
   get chat() {
       return this._chat
   }

   /**
    * For forwarded messages, sender of the original message
    * @returns {User|null}
   */
   get forwardFrom() {
       return this._forwardFrom
   }

   /**
    * For messages forwarded from channels, information about the original channel
    * @returns {Chat|null}
   */
   get forwardFromChat() {
       return this._forwardFromChat
   }

   /**
    * For messages forwarded from channels, identifier of the original message in the channel
    * @returns {number|null}
   */
   get forwardFromMessageId() {
       return this._forwardFromMessageId
   }

   /**
    * For messages forwarded from channels, signature of the post author if present
    * @returns {string|null}
   */
   get forwardSignature() {
       return this._forwardSignature
   }

   /**
    * For forwarded messages, date the original message was sent in Unix time
    * @returns {number|null}
   */
   get forwardDate() {
       return this._forwardDate
   }

   /**
    * For replies, the original message. Note that the Message object in this field will not contain further reply_to_message fields even if it itself is a reply.
    * @returns {Message|null}
   */
   get replyToMessage() {
       return this._replyToMessage
   }

   /**
    * Date the message was last edited in Unix time
    * @returns {number|null}
   */
   get editDate() {
       return this._editDate
   }

   /**
    * The unique identifier of a media message group this message belongs to
    * @returns {string|null}
   */
   get mediaGroupId() {
       return this._mediaGroupId
   }

   /**
    * Signature of the post author for messages in channels
    * @returns {string|null}
   */
   get authorSignature() {
       return this._authorSignature
   }

   /**
    * For text messages, the actual UTF-8 text of the message, 0-4096 characters.
    * @returns {string|null}
   */
   get text() {
       return this._text
   }

   /**
    * For text messages, special entities like usernames, URLs, bot commands, etc. that appear in the text
    * @returns {MessageEntity[]|null}
   */
   get entities() {
       return this._entities
   }

   /**
    * For messages with a caption, special entities like usernames, URLs, bot commands, etc. that appear in the caption
    * @returns {MessageEntity[]|null}
   */
   get captionEntities() {
       return this._captionEntities
   }

   /**
    * Message is an audio file, information about the file
    * @returns {Audio|null}
   */
   get audio() {
       return this._audio
   }

   /**
    * Message is a general file, information about the file
    * @returns {Document|null}
   */
   get document() {
       return this._document
   }

   /**
    * Message is an animation, information about the animation. For backward compatibility, when this field is set, the document field will also be set
    * @returns {Animation|null}
   */
   get animation() {
       return this._animation
   }

   /**
    * Message is a game, information about the game. More about games »
    * @returns {Game|null}
   */
   get game() {
       return this._game
   }

   /**
    * Message is a photo, available sizes of the photo
    * @returns {PhotoSize[]|null}
   */
   get photo() {
       return this._photo
   }

   /**
    * Message is a sticker, information about the sticker
    * @returns {Sticker|null}
   */
   get sticker() {
       return this._sticker
   }

   /**
    * Message is a video, information about the video
    * @returns {Video|null}
   */
   get video() {
       return this._video
   }

   /**
    * Message is a voice message, information about the file
    * @returns {Voice|null}
   */
   get voice() {
       return this._voice
   }

   /**
    * Message is a video note, information about the video message
    * @returns {VideoNote|null}
   */
   get videoNote() {
       return this._videoNote
   }

   /**
    * Caption for the audio, document, photo, video or voice, 0-1024 characters
    * @returns {string|null}
   */
   get caption() {
       return this._caption
   }

   /**
    * Message is a shared contact, information about the contact
    * @returns {Contact|null}
   */
   get contact() {
       return this._contact
   }

   /**
    * Message is a shared location, information about the location
    * @returns {Location|null}
   */
   get location() {
       return this._location
   }

   /**
    * Message is a venue, information about the venue
    * @returns {Venue|null}
   */
   get venue() {
       return this._venue
   }

   /**
    * New members that were added to the group or supergroup and information about them (the bot itself may be one of these members)
    * @returns {User[]|null}
   */
   get newChatMembers() {
       return this._newChatMembers
   }

   /**
    * A member was removed from the group, information about them (this member may be the bot itself)
    * @returns {User|null}
   */
   get leftChatMember() {
       return this._leftChatMember
   }

   /**
    * A chat title was changed to this value
    * @returns {string|null}
   */
   get newChatTitle() {
       return this._newChatTitle
   }

   /**
    * A chat photo was change to this value
    * @returns {PhotoSize[]|null}
   */
   get newChatPhoto() {
       return this._newChatPhoto
   }

   /**
    * Service message: the chat photo was deleted
    * @returns {boolean|null}
   */
   get deleteChatPhoto() {
       return this._deleteChatPhoto
   }

   /**
    * Service message: the group has been created
    * @returns {boolean|null}
   */
   get groupChatCreated() {
       return this._groupChatCreated
   }

   /**
    * Service message: the supergroup has been created. This field can‘t be received in a message coming through updates, because bot can’t be a member of a supergroup when it is created. It can only be found in reply_to_message if someone replies to a very first message in a directly created supergroup.
    * @returns {boolean|null}
   */
   get supergroupChatCreated() {
       return this._supergroupChatCreated
   }

   /**
    * Service message: the channel has been created. This field can‘t be received in a message coming through updates, because bot can’t be a member of a channel when it is created. It can only be found in reply_to_message if someone replies to a very first message in a channel.
    * @returns {boolean|null}
   */
   get channelChatCreated() {
       return this._channelChatCreated
   }

   /**
    * The group has been migrated to a supergroup with the specified identifier. This number may be greater than 32 bits and some programming languages may have difficulty/silent defects in interpreting it. But it is smaller than 52 bits, so a signed 64 bit integer or double-precision float type are safe for storing this identifier.
    * @returns {number|null}
   */
   get migrateToChatId() {
       return this._migrateToChatId
   }

   /**
    * The supergroup has been migrated from a group with the specified identifier. This number may be greater than 32 bits and some programming languages may have difficulty/silent defects in interpreting it. But it is smaller than 52 bits, so a signed 64 bit integer or double-precision float type are safe for storing this identifier.
    * @returns {number|null}
   */
   get migrateFromChatId() {
       return this._migrateFromChatId
   }

   /**
    * Specified message was pinned. Note that the Message object in this field will not contain further reply_to_message fields even if it is itself a reply.
    * @returns {Message|null}
   */
   get pinnedMessage() {
       return this._pinnedMessage
   }

   /**
    * Message is an invoice for a payment, information about the invoice. More about payments »
    * @returns {Invoice|null}
   */
   get invoice() {
       return this._invoice
   }

   /**
    * Message is a service message about a successful payment, information about the payment. More about payments »
    * @returns {SuccessfulPayment|null}
   */
   get successfulPayment() {
       return this._successfulPayment
   }

   /**
    * The domain name of the website on which the user has logged in. More about Telegram Login »
    * @returns {string|null}
   */
   get connectedWebsite() {
       return this._connectedWebsite
   }

   /**
    * Telegram Passport data
    * @returns {PassportData|null}
   */
   get passportData() {
       return this._passportData
   }

   /**
    *
    * @param {Object} raw
    * @returns {Message}
    */
   static deserialize(raw) {
      return new Message(
          raw['message_id'], 
          raw['from'] ? User.deserialize(raw['from']) : null, 
          raw['date'], 
          raw['chat'] ? Chat.deserialize(raw['chat']) : null, 
          raw['forward_from'] ? User.deserialize(raw['forward_from']) : null, 
          raw['forward_from_chat'] ? Chat.deserialize(raw['forward_from_chat']) : null, 
          raw['forward_from_message_id'] ? raw['forward_from_message_id'] : null, 
          raw['forward_signature'] ? raw['forward_signature'] : null, 
          raw['forward_date'] ? raw['forward_date'] : null, 
          raw['reply_to_message'] ? Message.deserialize(raw['reply_to_message']) : null, 
          raw['edit_date'] ? raw['edit_date'] : null, 
          raw['media_group_id'] ? raw['media_group_id'] : null, 
          raw['author_signature'] ? raw['author_signature'] : null, 
          raw['text'] ? raw['text'] : null, 
          raw['entities'] ? raw['entities'].map(item => MessageEntity.deserialize(item)) : null, 
          raw['caption_entities'] ? raw['caption_entities'].map(item => MessageEntity.deserialize(item)) : null, 
          raw['audio'] ? Audio.deserialize(raw['audio']) : null, 
          raw['document'] ? Document.deserialize(raw['document']) : null, 
          raw['animation'] ? Animation.deserialize(raw['animation']) : null, 
          raw['game'] ? Game.deserialize(raw['game']) : null, 
          raw['photo'] ? raw['photo'].map(item => PhotoSize.deserialize(item)) : null, 
          raw['sticker'] ? Sticker.deserialize(raw['sticker']) : null, 
          raw['video'] ? Video.deserialize(raw['video']) : null, 
          raw['voice'] ? Voice.deserialize(raw['voice']) : null, 
          raw['video_note'] ? VideoNote.deserialize(raw['video_note']) : null, 
          raw['caption'] ? raw['caption'] : null, 
          raw['contact'] ? Contact.deserialize(raw['contact']) : null, 
          raw['location'] ? Location.deserialize(raw['location']) : null, 
          raw['venue'] ? Venue.deserialize(raw['venue']) : null, 
          raw['new_chat_members'] ? raw['new_chat_members'].map(item => User.deserialize(item)) : null, 
          raw['left_chat_member'] ? User.deserialize(raw['left_chat_member']) : null, 
          raw['new_chat_title'] ? raw['new_chat_title'] : null, 
          raw['new_chat_photo'] ? raw['new_chat_photo'].map(item => PhotoSize.deserialize(item)) : null, 
          raw['delete_chat_photo'] ? raw['delete_chat_photo'] : null, 
          raw['group_chat_created'] ? raw['group_chat_created'] : null, 
          raw['supergroup_chat_created'] ? raw['supergroup_chat_created'] : null, 
          raw['channel_chat_created'] ? raw['channel_chat_created'] : null, 
          raw['migrate_to_chat_id'] ? raw['migrate_to_chat_id'] : null, 
          raw['migrate_from_chat_id'] ? raw['migrate_from_chat_id'] : null, 
          raw['pinned_message'] ? Message.deserialize(raw['pinned_message']) : null, 
          raw['invoice'] ? Invoice.deserialize(raw['invoice']) : null, 
          raw['successful_payment'] ? SuccessfulPayment.deserialize(raw['successful_payment']) : null, 
          raw['connected_website'] ? raw['connected_website'] : null, 
          raw['passport_data'] ? PassportData.deserialize(raw['passport_data']) : null
      )
   }

   /**
    *
    * @returns {Object}
    */
   serialize() {
      return { 
          message_id: this.messageId ? this.messageId : undefined, 
          from: this.from ? this.from.serialize() : undefined, 
          date: this.date ? this.date : undefined, 
          chat: this.chat ? this.chat.serialize() : undefined, 
          forward_from: this.forwardFrom ? this.forwardFrom.serialize() : undefined, 
          forward_from_chat: this.forwardFromChat ? this.forwardFromChat.serialize() : undefined, 
          forward_from_message_id: this.forwardFromMessageId ? this.forwardFromMessageId : undefined, 
          forward_signature: this.forwardSignature ? this.forwardSignature : undefined, 
          forward_date: this.forwardDate ? this.forwardDate : undefined, 
          reply_to_message: this.replyToMessage ? this.replyToMessage.serialize() : undefined, 
          edit_date: this.editDate ? this.editDate : undefined, 
          media_group_id: this.mediaGroupId ? this.mediaGroupId : undefined, 
          author_signature: this.authorSignature ? this.authorSignature : undefined, 
          text: this.text ? this.text : undefined, 
          entities: this.entities ? this.entities.map(item => item.serialize()) : undefined, 
          caption_entities: this.captionEntities ? this.captionEntities.map(item => item.serialize()) : undefined, 
          audio: this.audio ? this.audio.serialize() : undefined, 
          document: this.document ? this.document.serialize() : undefined, 
          animation: this.animation ? this.animation.serialize() : undefined, 
          game: this.game ? this.game.serialize() : undefined, 
          photo: this.photo ? this.photo.map(item => item.serialize()) : undefined, 
          sticker: this.sticker ? this.sticker.serialize() : undefined, 
          video: this.video ? this.video.serialize() : undefined, 
          voice: this.voice ? this.voice.serialize() : undefined, 
          video_note: this.videoNote ? this.videoNote.serialize() : undefined, 
          caption: this.caption ? this.caption : undefined, 
          contact: this.contact ? this.contact.serialize() : undefined, 
          location: this.location ? this.location.serialize() : undefined, 
          venue: this.venue ? this.venue.serialize() : undefined, 
          new_chat_members: this.newChatMembers ? this.newChatMembers.map(item => item.serialize()) : undefined, 
          left_chat_member: this.leftChatMember ? this.leftChatMember.serialize() : undefined, 
          new_chat_title: this.newChatTitle ? this.newChatTitle : undefined, 
          new_chat_photo: this.newChatPhoto ? this.newChatPhoto.map(item => item.serialize()) : undefined, 
          delete_chat_photo: this.deleteChatPhoto ? this.deleteChatPhoto : undefined, 
          group_chat_created: this.groupChatCreated ? this.groupChatCreated : undefined, 
          supergroup_chat_created: this.supergroupChatCreated ? this.supergroupChatCreated : undefined, 
          channel_chat_created: this.channelChatCreated ? this.channelChatCreated : undefined, 
          migrate_to_chat_id: this.migrateToChatId ? this.migrateToChatId : undefined, 
          migrate_from_chat_id: this.migrateFromChatId ? this.migrateFromChatId : undefined, 
          pinned_message: this.pinnedMessage ? this.pinnedMessage.serialize() : undefined, 
          invoice: this.invoice ? this.invoice.serialize() : undefined, 
          successful_payment: this.successfulPayment ? this.successfulPayment.serialize() : undefined, 
          connected_website: this.connectedWebsite ? this.connectedWebsite : undefined, 
          passport_data: this.passportData ? this.passportData.serialize() : undefined
      }
   }

   /**
    *
    * @returns {string}
    */
   toJSON() {
      return this.serialize()
   }
}

module.exports = Message