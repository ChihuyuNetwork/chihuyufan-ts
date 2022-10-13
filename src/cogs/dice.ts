import {client} from '..'

client.on('commandsReset', async () => {
    client.application?.commands.create(
        {
            name: commandName,
            description: 'ランダムに抽選を行います',
            options: [
                {
                    type: 'NUMBER',
                    name: 'value',
                    description: 'ビットレート'
                }
            ]
        },
        guildId
    )
})

// client.on('messageCreate', async (message) => {
//   if (message.content.startsWith('.dice')) {
//     const [prefix, ...args] = message.content.split(' ')
//     let err = null
//     if (args.length === 0) {
//       err = '選択肢を入力してください'
//     }
//     const channel = message.channel
//     if (err !== null) {
//       await channel.send(err)
//       return
//     }
//     await channel.send(args[Math.floor(Math.random() * args.length)])
//   }
// })
