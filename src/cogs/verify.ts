import { GuildMember, MessageActionRow, MessageButton } from 'discord.js'
import outdent from 'outdent'
import { client } from '..'

const roleId = '929124332561641502'

client.on('messageCreate', async (message) => {
  const botAuthors = ['608242236546613259', '743393055113216093']
  if (!botAuthors.includes(message.author.id)) return // hirosuke only

  if (message.content.startsWith('.verify')) {
    const buttonVerifyMe = new MessageButton()
      .setCustomId('verifyMe')
      .setStyle('PRIMARY')
      .setLabel('認証')

    const content = outdent`
    【　認証　】
    ボタンを押すとチャットに参加できます。
    `

    await message.channel.send({
      content: content,
      components: [new MessageActionRow().addComponents(buttonVerifyMe)]
    })
  }
})

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return

  if (interaction.customId === 'verifyMe') {
    const member = interaction.member as GuildMember
    await member.roles.add(roleId)
    await interaction.deferUpdate().catch(() => {}) // インタラクションに失敗しました と表示させないため
  }
})
