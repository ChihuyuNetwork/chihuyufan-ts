import { GuildMember, MessageEmbed, HexColorString } from 'discord.js'
import { client } from '..'
import { getAverageColor } from 'fast-average-color-node'
import fetch from 'node-fetch'

const isTarget = (m: GuildMember, str: string) => {
  return [m.displayName, m.nickname, m.user.username, m.user.id].includes(str)
}

client.on('messageCreate', async (message) => {
  if (!message.guild || !message.member) return
  if (!message.content.startsWith('.avatar')) return

  const args = message.content.split(' ').slice(1)
  let member =
    message.mentions.members?.first() ||
    message.guild.members?.cache.find((m) => isTarget(m, args.join(' '))) ||
    message.guild.members?.cache.find((m) => m.id === message.author.id)
  const url =
    member?.avatarURL({ format: 'png', size: 1024 }) ||
    member?.user.avatarURL({ format: 'png', size: 1024 }) ||
    member?.user.defaultAvatarURL!

  const embed = new MessageEmbed()
    .setColor(
      ((await getAverageColor(await (await fetch(url)).buffer()))
        .hex as HexColorString) || '#ffffff'
    )
    .setTitle(member?.user.tag || 'undefined')
    .setImage(url)
    .setTimestamp()

  await message.channel.send({ embeds: [embed] })
})
