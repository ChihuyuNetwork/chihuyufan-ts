import {Events} from 'discord.js'
import {client} from '..'
import {guildId} from '../constant'

client.on('commandsReset', async () => {
  client.application!.commands.create(
    {
      name: 'pr',
      description: '文句言うな黙ってPR出せ'
    },
    guildId
  )
})

client.on(Events.InteractionCreate, async (interaction) => {
  if (
    !interaction.inCachedGuild() ||
    !interaction.isChatInputCommand() ||
    interaction.commandName !== 'pr'
  )
    return
  await interaction.reply(
    'https://twitter.com/hirosukt/status/1489252498540212224'
  )
})