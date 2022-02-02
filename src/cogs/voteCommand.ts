import { MessageEmbed, User, HexColorString } from 'discord.js'
import { client } from '..'
import { getAverageColor } from 'fast-average-color-node'
import fetch from 'node-fetch'

client.on('messageCreate', async (message) => {
  if (!message.content.startsWith('.vote')) return
  const args = message.content.split(' ').slice(1)

  let response: string | undefined
  if (args.length === 0) response = 'タイトルを入力してください。'
  if (args.length >= 22)
    response = '選択肢が多すぎます。20個以下にしてください。'
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
      choices.push(`${emoji} ${args[i + 1]}`)
    }
  }

  const author = await message.author.fetch()
  const embed = new MessageEmbed()
    .setAuthor({
      name: author.username,
      url: message.url,
      iconURL: author.avatarURL()!
    })
    .setTitle(args[0])
    .setColor((await user2color(author)) || '#ffffff')
    .setTimestamp()
    .setDescription(choices.join('\n'))

  const voteBoard = await message.channel.send({ embeds: [embed] })
  emojis.map((emoji) => voteBoard.react(emoji))
})

const user2color = async (user: User): Promise<HexColorString> => {
  const url =
    user.avatarURL({ format: 'png', size: 16 }) || user.defaultAvatarURL
  const image = await (await fetch(url)).buffer()
  return (await getAverageColor(image)).hex as HexColorString
}
