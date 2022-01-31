import { client } from '..'
import { MessageButton, MessageActionRow } from 'discord.js'

const serverIP = 'mc.hirosuke.works'
const discordInviteURL = 'https://discord.gg/gWTWVsqZB6'
const scrapboxInviteURL =
  'https://scrapbox.io/projects/hiro-hub/invitations/c687d9ed3a7fdc50a01730e9227d01c5'

client.on('messageCreate', async (message) => {
  if (message.author.id !== '743393055113216093') return // hirosuke only

  if (message.content.startsWith('?button')) {
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

    await message.channel.send({
      content:
        'ボタンをタップ / クリックしてください。\nボタンが表示されない場合は、Discord のアップデートをお試しください。 ',
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
