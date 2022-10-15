import { MessageEmbed } from 'discord.js'
import { client } from '..'
import { guildId } from '../constant'
import { nullableFetch, getChannelName } from '../utils'

client.on('commandsReset', async () => {
  client.application!.commands.create(
    {
      name: 'userinfo',
      description: '情報を表示します',
      options: [
        {
          type: 'USER',
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
  if (!interaction.isCommand() || interaction.commandName !== 'userinfo') return
  const user = await interaction.options.getUser('user')?.fetch()
  const member = await interaction.guild?.members.fetch(user?.id || interaction.user)
  const embed = new MessageEmbed()
    .setTitle(`${member?.nickname} (${user?.tag})` ?? (user?.tag || 'null'))
    .setColor(member?.displayHexColor || user?.hexAccentColor || 'BLUE')
    .setTimestamp()

  embed.addField('ID', user?.id || 'null')
  embed.addField('Nitro Since', member?.premiumSince?.toLocaleString() || 'null', true)
  embed.addField('Created At', user?.createdAt.toLocaleString() || 'null')
  embed.addField('Joined At', member?.joinedAt?.toLocaleString() || 'null', true)
  embed.addField('Roles', member?.roles.cache.map(r => `<@&${r.id}>`).join(" | ") || 'null')
  
  embed.setThumbnail(member?.displayAvatarURL() || member?.avatarURL() || '')
  embed.setImage(user?.bannerURL() || user?.avatarURL() || '')

  await interaction.reply({ embeds: [embed], ephemeral: true })
})
