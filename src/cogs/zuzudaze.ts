import {Events} from 'discord.js'
import {client} from '..'
import {guildId} from '../constant'

const zuzudaze = ['ず', 'ず', 'だ', 'ぜ', 'ざ', 'じ']

client.on('commandsReset', async () => {
  client.application!.commands.create(
    {
      name: 'zuzudaze',
      description: 'ずずだぜジェネレーター'
    },
    guildId
  )
})

client.on(Events.InteractionCreate, async (interaction) => {
  if (
    !interaction.inCachedGuild() ||
    !interaction.isChatInputCommand() ||
    interaction.commandName !== 'zuzudaze'
  )
    return
  await interaction.reply(makeRanzozo())
})

function makeRanzozo() {
  var zuzudazo = ''
  for (let i = 0; i < 4; i++) {
    const random = Math.floor(Math.random() * zuzudaze.length)
    zuzudazo += zuzudaze[random]
  }
  return zuzudazo
}
