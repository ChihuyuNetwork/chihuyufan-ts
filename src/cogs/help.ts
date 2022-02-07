import { MessageEmbed } from 'discord.js'
import { client } from '..'

client.on('messageCreate', async (message) => {
  if (message.content === '.help') {
    const cmds = [
      `**.neko**: にゃー`,
      `**.achieve**: ユーザーを実績を解除します`,
      `**.vc**: 参加しているVCの名前を変更します`,
      `**.vote**: 投票を開始します`,
      `**.pr**: 文句言うな黙ってPR出せ`,
      `**.avatar**: ユーザーのアイコンを表示します`,
      `**.help**: これ`
    ]

    const embed = new MessageEmbed()
      .setTitle('Chihuyu fan - コマンドリファレンス')
      .setColor('AQUA')
      .setDescription(cmds.join('\n'))
      .setTimestamp()
    await message.channel.send({ embeds: [embed] })
  }
})
