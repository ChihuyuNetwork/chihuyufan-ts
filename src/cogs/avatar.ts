import { GuildMember, HexColorString, MessageEmbed } from 'discord.js'
import { getAverageColor } from 'fast-average-color-node'
import fetch from 'node-fetch'
import { client } from '..'

const isTarget = (m: GuildMember, str: string) => {
  return [m.displayName, m.nickname, m.user.username, m.user.id].includes(str)
}

client.on('messageCreate', async (message) => {
  if (!message.guild || !message.member) return
  if (!message.content.startsWith('.avatar')) return

  const [prefix, ...args] = message.content.split(' ')
  if (prefix != '.avatar') return
  let member =
    message.mentions.members?.first() ||
    message.guild.members?.cache.find((m) => isTarget(m, args.join(' '))) ||
    message.guild.members?.cache.get(message.author.id)
  const url = member?.displayAvatarURL({
    dynamic: true,
    format: 'png',
    size: 4096
  })!

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
