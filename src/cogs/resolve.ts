import { ApplicationCommandOptionType } from 'discord.js'
import { client } from '..'
import { guildId } from '../constant'
import { nullableFetch, getChannelName } from '../utils'

client.on('commandsReset', async () => {
  client.application!.commands.create(
    {
      name: 'resolve',
      description: 'IDから名前を逆引きします',
      options: [
        {
          type: ApplicationCommandOptionType.String,
          name: 'id',
          description: '調べたいID',
          required: true
        }
      ]
    },
    guildId
  )
})

client.on('interactionCreate', async (interaction) => {
  if (
    !interaction.isChatInputCommand() ||
    interaction.commandName !== 'resolve'
  )
    return
  const id = interaction.options.getString('id', true).trim()
  const name =
    (interaction.inCachedGuild()
      ? (await nullableFetch(interaction.guild.members, id))?.displayName ??
        (await interaction.guild.roles.fetch(id))?.name ??
        (await nullableFetch(interaction.guild.emojis, id))?.name
      : null) ??
    (await nullableFetch(client.users, id))?.username ??
    (await nullableFetch(client.guilds, id))?.name ??
    (await getChannelName(id)) ??
    client.emojis.cache.get(id)?.name ??
    `> \`${id}\`をみつけられませんでした。`
  await interaction.reply({ content: name, ephemeral: true })
})
