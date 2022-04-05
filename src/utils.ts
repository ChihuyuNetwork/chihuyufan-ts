import { Routes } from 'discord-api-types/v9'
import { EmojiIdentifierResolvable, Message, TextChannel } from 'discord.js'
import { client, rest } from '.'

export const isTextChannel = (channel: unknown): channel is TextChannel => {
  return channel instanceof TextChannel
}

export const getTextChannelById = (id: string) => {
  const channel = client.channels.resolve(id)
  if (isTextChannel(channel)) {
    return channel
  }
  return null
}

export const fastReact = async (
  message: Message,
  emoji: EmojiIdentifierResolvable
) => {
  return await rest.put(
    Routes.channelMessageOwnReaction(
      message.channelId,
      message.id,
      encodeURIComponent(emoji.toString().replace(/<|>/g, ''))
    )
  )
}
