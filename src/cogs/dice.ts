import {ApplicationCommandOptionType} from 'discord-api-types/v10'
import {Events} from 'discord.js'
import {client} from '..'
import {guildId} from '../constant'

client.on('commandsReset', async () => {
  client.application!.commands.create(
    {
      name: 'dice',
      description: 'ランダムに抽選を行います',
      options: [
        {
          type: ApplicationCommandOptionType.String,
          name: 'choices',
          description: '選択肢',
          required: true
        }
      ]
    },
    guildId
  )
})

client.on(Events.InteractionCreate, async (interaction) => {
  if (
    !interaction.inCachedGuild() ||
    !interaction.isChatInputCommand() ||
    interaction.commandName !== 'dice'
  )
    return
  const [...args] = interaction.options.getString('choices')!.split(' ')
  await interaction.reply(args[Math.floor(Math.random() * args.length)])
})