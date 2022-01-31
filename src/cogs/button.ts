import { client } from '..'
import { MessageButton, MessageActionRow } from 'discord.js'
import outdent from 'outdent'

const serverIP =
  '繋がらない場合は運営に連絡してください。\n\n`mc.hirosuke.works`'
const discordInviteURL = 'https://discord.gg/gWTWVsqZB6'
const scrapboxInviteURL =
  'https://scrapbox.io/projects/hiro-hub/invitations/c687d9ed3a7fdc50a01730e9227d01c5'

client.on('messageCreate', async (message) => {
  const botAuthors = ['608242236546613259', '743393055113216093']
  if (!botAuthors.includes(message.author.id)) return // hirosuke only

  if (message.content.startsWith('.button')) {
    const buttonShowServerIP = new MessageButton()
      .setCustomId('showServerIP')
      .setStyle('PRIMARY')
      .setLabel('マイクラサーバーのIP')
    const buttonShowDiscordInviteURL = new MessageButton()
      .setCustomId('showDiscordInviteURL')
      .setStyle('PRIMARY')
      .setLabel('Discordの招待リンク')
    const buttonShowScrapboxInviteURL = new MessageButton()
      .setCustomId('showScrapboxInviteURL')
      .setStyle('PRIMARY')
      .setLabel('Scrapboxの招待リンク')
    const buttons = [
      buttonShowServerIP,
      buttonShowDiscordInviteURL,
      buttonShowScrapboxInviteURL
    ]

    const content = outdent`
    【　ようこそ　】
    このサーバーは、暇なときに遊戯<ｱｿ>ぶ鯖です。──

    【　ちなみに　】
    全て運営の判断で処罰が下されます。

    【　さておき　】
    ボタンをタップ / クリックすることで情報が見れます。
    何も表示されない場合は Discord アプリのアップデートを試してみてください。
    `

    await message.channel.send({
      content: content,
      components: [new MessageActionRow().addComponents(buttons)]
    })
  }
})

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return

  if (interaction.customId === 'showServerIP') {
    await interaction.reply({
      content: serverIP,
      ephemeral: true
    })
  }
  if (interaction.customId === 'showDiscordInviteURL') {
    await interaction.reply({
      content: discordInviteURL,
      ephemeral: true
    })
  }
  if (interaction.customId === 'showScrapboxInviteURL') {
    await interaction.reply({
      content: scrapboxInviteURL,
      ephemeral: true
    })
  }
})
