import { Routes } from 'discord-api-types/v10'
import {
  EmojiIdentifierResolvable,
  Message,
  TextChannel,
  DMChannel,
  GuildChannel,
  PartialGroupDMChannel
} from 'discord.js'
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

export const nullableFetch = async (
  fetchable: { fetch: (arg0: any) => Promise<any> },
  options: string
) => await fetchable.fetch(options).catch(() => null)

export const getChannelName = async (id: string) => {
  const channel = await nullableFetch(client.channels, id)
  if (!channel) return null
  if (channel instanceof DMChannel)
    return await client.users.fetch(channel.recipientId)
  if (
    channel instanceof GuildChannel ||
    channel instanceof PartialGroupDMChannel
  )
    return channel.name
  return null
}
