import { TextChannel } from 'discord.js'
import { client } from '.'

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
