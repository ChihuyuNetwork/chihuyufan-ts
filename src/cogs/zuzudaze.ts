import { client } from '..'
import { guildId } from '../constant'

const zuzudaze = ['ず', 'ず', 'だ', 'ぜ', 'ざ', 'じ']

client.on('commandsReset', async () => {
  client.application?.commands.create(
    {
      name: 'zuzudaze',
      description: 'ずずだぜジェネレーター'
    },
    guildId
  )
})

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand() || interaction.commandName !== 'zuzudaze') return
  await interaction.reply(makeRanzozo())
})

// client.on('messageCreate', async (message) => {
//   if (message.content === '.zuzudaze') {
//     const channel = message.channel
//     await channel.send(makeRanzozo())
//   }
// })

function makeRanzozo() {
  var zuzudazo = ''
  for (let i = 0; i < 4; i++) {
    const random = Math.floor(Math.random() * zuzudaze.length)
    zuzudazo += zuzudaze[random]
  }
  return zuzudazo
}
