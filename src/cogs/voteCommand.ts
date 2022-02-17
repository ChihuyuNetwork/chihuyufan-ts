import { GuildMember, HexColorString, Message, MessageEmbed } from 'discord.js'
import { getAverageColor } from 'fast-average-color-node'
import fetch from 'node-fetch'
import { client, guildId } from '..'

client.once('ready', async () => {
  client.application?.commands.create(
    {
      name: 'vote',
      description: '投票を開始します',
      options: [
        {
          type: 'STRING',
          name: 'title',
          description: 'タイトル',
          required: true
        },
        {
          type: 'STRING',
          name: 'choice',
          description: '選択肢'
        }
      ]
    },
    guildId
  )
})

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand() || interaction.commandName !== 'vote') return
  const args = (interaction.options.getString('choice') || '').split(/\s+/)
  if (args.length > 20) {
    await interaction.reply({
      content: '選択肢が多すぎます。20個以下にしてください。',
      ephemeral: true
    })
    return
  }
  let emojis: string[] = []
  let choices: string[] = []
  const constEmojiLargeA = 0x1f1e6

  if (args[0] === '') {
    emojis = ['<:GOOD:931715830444621824>', '<:NO:931715830620778556>']
  } else {
    for (let i = 0; i < args.length; i++) {
      const emoji = String.fromCodePoint(constEmojiLargeA + i)
      emojis.push(emoji)
      choices.push(`${emoji} ${args[i]}`)
    }
  }

  const author = interaction.member as GuildMember
  const embed = new MessageEmbed()
    .setTitle(interaction.options.getString('title')!)
    .setColor((await user2color(author)) || '#ffffff')
    .setTimestamp()
    .setDescription(choices.join('\n'))

  const voteBoard = (await interaction.reply({
    embeds: [embed],
    fetchReply: true
  })) as Message
  emojis.map((emoji) => voteBoard.react(emoji))
})

client.on('messageCreate', async (message) => {
  if (!message.content.startsWith('.vote')) return
  const [prefix, ...args] = message.content.split(' ')
  if (prefix != '.vote') return

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

  const author = message.guild?.members?.cache.get(message.author.id)!
  const embed = new MessageEmbed()
    .setAuthor({
      name: author.user.username,
      url: message.url,
      iconURL: author.displayAvatarURL()
    })
    .setTitle(args[0])
    .setColor((await user2color(author)) || '#ffffff')
    .setTimestamp()
    .setDescription(choices.join('\n'))

  await message.delete()
  const voteBoard = await message.channel.send({ embeds: [embed] })
  emojis.map((emoji) => voteBoard.react(emoji))
})

const user2color = async (user: GuildMember): Promise<HexColorString> => {
  const url = user.displayAvatarURL({ format: 'png', size: 16 })
  const image = await (await fetch(url)).buffer()
  return (await getAverageColor(image)).hex as HexColorString
}
