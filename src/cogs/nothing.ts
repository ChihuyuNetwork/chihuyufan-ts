import { Events, Message, TextChannel } from 'discord.js'
import { client } from '..'
import { nothingChannelId } from '../constant'

let queue: Message[] = []
const logCount = 10

let targetChannel: TextChannel

const deleteLog = async () => {
  const target = queue.shift()!
  await target.delete().catch(() => {})
}

client.on(Events.ClientReady, async () => {
  targetChannel = (await client.channels.fetch(nothingChannelId)) as TextChannel
  const messages = await targetChannel.messages.fetch()
  queue.push(...messages.reverse().values())

  if (queue.length <= logCount) return
  while (queue.length > logCount) await deleteLog()
})

client.on(Events.MessageCreate, async (message) => {
  if (message.channel.id !== nothingChannelId) return
  if (queue.push(message) <= logCount) return
  await deleteLog()
})
