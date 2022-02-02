import { MessageEmbed } from 'discord.js'
import { client } from '..'

client.on('messageCreate', async (message) => {
  if (message.content.startsWith('.help')) {
    const cmds = [
      `**.neko**: meow`,
      `**.achieve**: unlock user's achievement.`,
      `**.vc**: change joining vc name.`,
      `**.vote**: start a vote.`,
      `**.help**: show this.`
    ]

    const embed = new MessageEmbed()
      .setTitle('Chihuyu fan Commands List')
      .setColor('AQUA')
      .setDescription(cmds.join('\n'))
      .setTimestamp()
    await message.channel.send({ embeds: [embed] })
  }
})
