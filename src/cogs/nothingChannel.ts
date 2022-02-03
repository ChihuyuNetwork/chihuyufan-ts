import { Message, TextChannel } from 'discord.js'
import { client } from '..'

let queue: Message[] = []
const logCount = 10

let targetChannel: TextChannel
const targetChannelId = '938000977217331230'

const deleteLog = async () => {
  const target = queue.shift()!
  await target.delete().catch(() => {})
}

client.on('ready', async () => {
  targetChannel = (await client.channels.fetch(targetChannelId)) as TextChannel
  const messages = await targetChannel.messages.fetch()
  queue.push(...messages.reverse().values())

  if (queue.length <= logCount) return
  while (queue.length > logCount) await deleteLog()
})

client.on('messageCreate', async (message) => {
  if (message.channel.id !== targetChannelId) return
  if (queue.push(message) <= logCount) return
  await deleteLog()
})
