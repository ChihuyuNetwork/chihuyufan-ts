import { client } from '..'
import { guildId } from '../constant'

client.on('commandsReset', async () => {
  client.application!.commands.create(
    {
      name: 'neko',
      description: 'にゃー'
    },
    guildId
  )
})

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand() || interaction.commandName !== 'neko') return
  await interaction.reply('にゃー')
})

// client.on('messageCreate', async (message) => {
//   if (message.content === '.neko') {
//     const channel = message.channel
//     await channel.send('にゃー')
//   }
// })
