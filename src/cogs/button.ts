import { ActionRowBuilder, ButtonBuilder, MessageComponentBuilder } from '@discordjs/builders'
import { ButtonStyle, MessageComponent } from 'discord.js'
import outdent from 'outdent'
import { client } from '..'

const serverIP = outdent`
    繋がらない場合は<@&928978798022631424>か<@&1026898339121340446>に連絡してください。

    アドレス: \`chihuyu.love\`
    `
const discordInviteURL = 'https://chihuyu.love/'
const scrapboxInviteURL ='https://scrapbox.io/projects/hiro-hub/invitations/c687d9ed3a7fdc50a01730e9227d01c5'
const seesaaWikiURL = 'https://seesaawiki.jp/chihuyu/'

client.on('messageCreate', async (message) => {
  const botAuthors = ['608242236546613259', '743393055113216093']
  if (!botAuthors.includes(message.author.id)) return // hirosuke only

  if (message.content === '.button') {
    const buttonShowDiscordInviteURL = new ButtonBuilder()
      .setCustomId('showDiscordInviteURL')
      .setStyle(ButtonStyle.Primary)
      .setLabel('Discordの招待リンク')
    const buttonShowScrapboxInviteURL = new ButtonBuilder()
      .setCustomId('showScrapboxInviteURL')
      .setStyle(ButtonStyle.Primary)
      .setLabel('Scrapboxの招待リンク')
    const buttonShowSeesaaWikiURL = new ButtonBuilder()
    .setCustomId('showSeesaaWikiURL')
      .setStyle(ButtonStyle.Primary)
      .setLabel('ちふゆ鯖のWiki')
    const buttonShowMinecraftAddress = new ButtonBuilder()
      .setCustomId('showMinecraftAddress')
      .setStyle(ButtonStyle.Primary)
      .setLabel('マイクラ鯖のアドレス')
    const buttons = [
      buttonShowDiscordInviteURL,
      buttonShowScrapboxInviteURL,
      buttonShowSeesaaWikiURL,
      buttonShowMinecraftAddress
    ]

    const content = outdent`
    【　ようこそ　】
    このサーバーは、暇なときに遊戯<ｱｿ>ぶ鯖です。──

    【　ちなみに　】
    全て運営の判断で処罰が下されます。

    【　さておき　】
    ボタンをタップ / クリックすることで情報が見れます。
    `

    await message.channel.send({
      content: content,
      components: [new ActionRowBuilder<ButtonBuilder>().addComponents(buttons)]
    })
  }
})

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return

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

  if (interaction.customId === 'showSeesaaWikiURL') {
    await interaction.reply({
      content: seesaaWikiURL,
      ephemeral: true
    })
  }

  if (interaction.customId === 'showMinecraftAddress') {
    await interaction.reply({
      content: serverIP,
      ephemeral: true
    })
  }
})
