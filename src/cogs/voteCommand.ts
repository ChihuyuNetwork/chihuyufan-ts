import { MessageEmbed } from 'discord.js'
import { client } from '..'

client.on('messageCreate', async (message) => {
  if (!message.content.startsWith('.vote')) return
  const args = message.content.split(' ').slice(1)

  let response: string | undefined
  if (args.length === 0) response = 'Please provide the title of the poll.'
  if (args.length >= 22) response = 'Too many arguments. Please less than 20.'
  if (response !== undefined) {
    await message.channel.send(response)
    return
  }

  let emojis: string[] = []
  let choices: string[] = []
  const constEmojiLargeA = 0x1f1e6

  if (args.length === 1) {
    emojis = ['<:GOOD:931715830444621824>', '<:NO:931715830620778556>']
  } else {
    for (let i = 0; i < args.length - 1; i++) {
      const emoji = String.fromCodePoint(constEmojiLargeA + i)
      emojis.push(emoji)
      choices.push(`${emoji}: ${args[i + 1]}`)
    }
  }

  const embed = new MessageEmbed()
    .setAuthor({
      name: message.author.username,
      url: message.url,
      iconURL: message.author.avatarURL()!
    })
    .setTitle(args[0])
    .setColor(message.author.hexAccentColor || '#ffffff')
    .setTimestamp()
    .setDescription(choices.join('\n'))

  const voteBoard = await message.channel.send({ embeds: [embed] })
  emojis.map((emoji) => voteBoard.react(emoji))
})
