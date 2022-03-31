import { DMChannel, GuildChannel, PartialGroupDMChannel } from 'discord.js'
import { client } from '..'
import { guildId } from '../constant'

const getChannelName = async (id: string) => {
  const channel = await client.channels.fetch(id).catch(() => null)
  if (!channel) return null
  if (channel instanceof DMChannel) return channel.recipient.username
  if (
    channel instanceof GuildChannel ||
    channel instanceof PartialGroupDMChannel
  )
    return channel.name
  return null
}

client.on('commandsReset', async () => {
  client.application?.commands.create(
    {
      name: 'reverse',
      description: 'IDから名前を逆引きします',
      options: [
        {
          type: 'STRING',
          name: 'id',
          description: '変換したいID',
          required: true
        }
      ]
    },
    guildId
  )
})

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand() || interaction.commandName !== 'reverse') return
  const id = interaction.options.getString('id', true).trim()
  const name =
    (interaction.inCachedGuild()
      ? (await interaction.guild.members.fetch(id).catch(() => null))
          ?.displayName ??
        (await interaction.guild.roles.fetch(id))?.name ??
        (await interaction.guild.emojis.fetch(id).catch(() => null))?.name
      : null) ??
    (await client.users.fetch(id).catch(() => null))?.username ??
    (await client.guilds.fetch(id).catch(() => null))?.name ??
    (await getChannelName(id)) ??
    client.emojis.cache.get(id)?.name ??
    '> `' + id + '`をみつけられませんでした。'
  await interaction.reply({ content: name, ephemeral: true })
})
