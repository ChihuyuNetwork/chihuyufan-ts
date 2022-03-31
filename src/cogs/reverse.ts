import { DMChannel, GuildChannel, PartialGroupDMChannel } from 'discord.js'
import { client } from '..'
import { guildId } from '../constant'

const nullableFetch = async (
  fetchable: { fetch: (arg0: any) => Promise<any> },
  options: string
) => await fetchable.fetch(options).catch(() => null)

const getChannelName = async (id: string) => {
  const channel = await nullableFetch(client.channels, id)
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
