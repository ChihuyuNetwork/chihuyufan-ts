import { GuildMember, MessageEmbed, Role } from 'discord.js'
import { client } from '..'

client.on('messageCreate', async (message) => {
  if (!message.guild || !message.member) return
  if (!message.content.startsWith('.skin')) return

  const embed = new MessageEmbed().setTitle('')
})
