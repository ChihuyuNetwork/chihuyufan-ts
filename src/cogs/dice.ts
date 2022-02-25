import { client } from '..'

client.on('messageCreate', async (message) => {
  if (message.content.startsWith('.dice')) {
    const [prefix, ...args] = message.content.split(' ')
    let err = null
    if (args.length === 0) {
      err = '選択肢を入力してください'
    }
    const channel = message.channel
    if (err !== null) {
      await channel.send(err)
    }
    await channel.send(args[Math.floor(Math.random() * args.length)])
  }
})
