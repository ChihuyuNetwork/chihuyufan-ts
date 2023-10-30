import {Events, TextChannel} from 'discord.js'
import {client} from '..'

client.on(Events.GuildEmojiCreate, async (emoji) => {
    if (emoji.guild.id !== '928978742825586708') return
    const notifyChannel = await emoji.guild.channels.fetch('928978742825586711') as TextChannel
    await notifyChannel.send('新しい絵文字が追加されました！')
    await notifyChannel.send(emoji.url)
})

client.on(Events.GuildStickerCreate, async (sticker) => {
    if (sticker.guild!.id !== '928978742825586708') return
    const notifyChannel = await sticker.guild!.channels.fetch('928978742825586711') as TextChannel
    await notifyChannel.send('新しい絵文字が追加されました！')
    await notifyChannel.send(sticker.url)
})

