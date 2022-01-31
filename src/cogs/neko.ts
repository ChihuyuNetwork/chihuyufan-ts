import { client } from '..'

client.on('messageCreate', async (message) => {
  if (message.content.startsWith('.neko')) {
    const channel = message.channel
    await channel.send('にゃー')
  }
})
