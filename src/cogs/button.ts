import { GuildMember, MessageActionRow, MessageButton } from 'discord.js'
import outdent from 'outdent'
import { client } from '..'

const serverIP =
  '繋がらない場合は運営に連絡してください。\n\n`mc.hirosuke.works`'
const discordInviteURL = 'https://chihuyu.love/'
const scrapboxInviteURL =
  'https://scrapbox.io/projects/hiro-hub/invitations/c687d9ed3a7fdc50a01730e9227d01c5'

client.on('messageCreate', async (message) => {
  const botAuthors = ['608242236546613259', '743393055113216093']
  if (!botAuthors.includes(message.author.id)) return // hirosuke only

  if (message.content === '.button') {
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
    const addSeeArchiveRole = new MessageButton()
      .setCustomId('addSeeArchiveRole')
      .setStyle('PRIMARY')
      .setLabel('アーカイブ表示/非表示')
    const buttons = [
      buttonShowServerIP,
      buttonShowDiscordInviteURL,
      buttonShowScrapboxInviteURL,
      addSeeArchiveRole
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
  if (interaction.customId === 'addSeeArchiveRole') {
    const member = interaction.member as GuildMember
    let msg: string
    if (member?.roles.cache.has('1006924113551568988')) {
      msg = `<:NO:931715830620778556> <@&1006924113551568988>を外しました。`
      await member.roles.remove('1006924113551568988')
    } else {
      msg = `<:GOOD:931715830444621824> <@&1006924113551568988>を付けました。`
      await member.roles.add('1006924113551568988')
    }

    await interaction.reply({
      content: msg,
      allowedMentions: {
        parse: ['roles']
      },
      ephemeral: true
    })
  }
})
