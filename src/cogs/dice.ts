import { client } from '..'
import { guildId } from '../constant'

client.on('commandsReset', async () => {
  client.application!.commands.create(
    {
      name: 'dice',
      description: 'ランダムに抽選を行います',
      options: [
        {
          type: 'STRING',
          name: 'choices',
          description: '選択肢',
          required: true
        }
      ]
    },
    guildId
  )
})

client.on('interactionCreate', async (interaction) => {
  if (
    !interaction.inCachedGuild() ||
    !interaction.isCommand() ||
    interaction.commandName !== 'dice'
  )
    return
  const [...args] = interaction.options.getString('choices')!.split(' ')
  await interaction.reply(args[Math.floor(Math.random() * args.length)])
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
