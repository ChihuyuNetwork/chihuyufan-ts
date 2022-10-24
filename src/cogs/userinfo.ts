import { EmbedBuilder } from '@discordjs/builders'
import { ApplicationCommandOptionType } from 'discord-api-types/v10'
import { client } from '..'
import { guildId } from '../constant'

client.on('commandsReset', async () => {
  client.application!.commands.create(
    {
      name: 'userinfo',
      description: '情報を表示します',
      options: [
        {
          type: ApplicationCommandOptionType.User,
          name: 'user',
          description: '調べたい対象',
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
    !interaction.isChatInputCommand() ||
    interaction.commandName !== 'userinfo'
  ) 
    return
  const user = await interaction.options.getUser('user')?.fetch()
  const member = await interaction.guild?.members.fetch(
    user?.id || interaction.user
  )
  const embed = new EmbedBuilder()
    .setTitle(`${member?.nickname} (${user?.tag})` ?? (user?.tag || 'null'))
    .setColor(member?.displayColor || user?.accentColor || [50, 50, 255])
    .setTimestamp()

  embed.addFields([
    { name: 'ID', value: user?.id || 'null' },
    {
      name: 'Nitro Since',
      value: member?.premiumSince?.toLocaleString() || 'null',
      inline: true
    },
    { name: 'Created At', value: user?.createdAt.toLocaleString() || 'null' },
    {
      name: 'Joined At',
      value: member?.joinedAt?.toLocaleString() || 'null',
      inline: true
    },
    {
      name: 'Roles',
      value: member?.roles.cache.map((r) => `<@&${r.id}>`).join(' | ') || 'null'
    }
  ])

  embed.setThumbnail(member?.displayAvatarURL() || member?.avatarURL() || '')
  embed.setImage(user?.bannerURL() || user?.avatarURL() || '')

  await interaction.reply({ embeds: [embed], ephemeral: true })
})
