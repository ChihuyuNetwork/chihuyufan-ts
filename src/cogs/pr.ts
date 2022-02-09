import { client } from '..'

client.on('messageCreate', async (message) => {
  if (message.content === '.pr') {
    const channel = message.channel
    await channel.send(
      'https://twitter.com/hirosukt/status/1489252498540212224'
    )
  }
})
