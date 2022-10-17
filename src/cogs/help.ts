import { EmbedBuilder } from 'discord.js'
import { client } from '..'
import { guildId } from '../constant'

client.on('commandsReset', async () => {
  client.application!.commands.create(
    {
      name: 'help',
      description: 'コマンドリファレンスを表示します'
    },
    guildId
  )
})

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand() || interaction.commandName !== 'help')
    return
  const cmds = [
    `**/neko**: にゃー`,
    `**/achieve**: ユーザーの実績を解除します`,
    `**/vc**: 参加しているVCの名前を変更します`,
    `**/vote**: 投票を開始します`,
    `**/pr**: 文句言うな黙ってPR出せ`,
    `**/avatar**: ユーザーのアイコンを表示します`,
    `**/dice**: ランダムに抽選します`,
    `**/resolve**: IDからユーザーを逆引きします`,
    `**/bitrate**: 参加しているVCのビットレートを変更します`,
    `**/help**: これ`
  ]

  const embed = new EmbedBuilder()
    .setTitle('Chihuyu fan - コマンドリファレンス')
    .setColor('Aqua')
    .setDescription(cmds.join('\n'))
    .setTimestamp()
  await interaction.reply({ embeds: [embed], ephemeral: true })
})

// client.on('messageCreate', async (message) => {
//   if (message.content === '.help') {
//     const cmds = [
//       `**/neko**: にゃー`,
//       `**/achieve**: ユーザーの実績を解除します`,
//       `**/vc**: 参加しているVCの名前を変更します`,
//       `**/vote**: 投票を開始します`,
//       `**/pr**: 文句言うな黙ってPR出せ`,
//       `**/avatar**: ユーザーのアイコンを表示します`,
//       `**/dice**: ランダムに抽選します`,
//       `**/resolve**: IDからユーザーを逆引きします`,
//       `**/bitrate**: 参加しているVCのビットレートを変更します`,
//       `**/help**: これ`
//     ]

//     const embed = new MessageEmbed()
//       .setTitle('Chihuyu fan - コマンドリファレンス')
//       .setColor('AQUA')
//       .setDescription(cmds.join('\n'))
//       .setTimestamp()
//       .setFooter({ text: 'スラッシュコマンドも使用可能です' })
//     await message.channel.send({ embeds: [embed] })
//   }
// })
