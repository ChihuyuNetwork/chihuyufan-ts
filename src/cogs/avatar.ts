import {ApplicationCommandOptionType} from 'discord-api-types/v10'
import {EmbedBuilder, Events, GuildMember, HexColorString} from 'discord.js'
import {getAverageColor} from 'fast-average-color-node'
import fetch from 'node-fetch'
import {client} from '..'
import {guildId} from '../constant'

const isTarget = (m: GuildMember, str: string) => {
  return [m.displayName, m.nickname, m.user.username, m.user.id].includes(str)
}

client.on('commandsReset', async () => {
  client.application!.commands.create(
    {
      name: 'avatar',
      description: 'ユーザーのアイコンを表示します',
      options: [
        {
          type: ApplicationCommandOptionType.User,
          name: 'member',
          description: 'ユーザー'
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
    interaction.commandName !== 'avatar'
  )
    return
  const member = interaction.options.getMember('member') || interaction.member
  const url = member.displayAvatarURL({
    extension: 'png',
    forceStatic: true,
    size: 4096
  })

  const embed = new EmbedBuilder()
    .setColor(
      ((await getAverageColor(await (await fetch(url)).buffer()))
        .hex as HexColorString) || '#ffffff'
    )
    .setTitle(member.user.tag)
    .setImage(url)
    .setTimestamp()
  await interaction.reply({ embeds: [embed] })
})