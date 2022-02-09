import {
  ButtonInteraction,
  CacheType,
  Collection,
  GuildMember,
  Interaction,
  InteractionCollector,
  Message,
  MessageActionRow,
  MessageButton,
  TextChannel
} from 'discord.js'
import { client } from '..'
import { outdent } from 'outdent'

client.on('messageCreate', async (message) => {
  const deleteMessage = (msg: Message) => {
    if (msg.deletable) {
      setTimeout(() => {
        try {
          msg.delete()
        } catch {}
      }, 5000)
    }
  }
  if (
    !message.guild ||
    !message.member ||
    !message.member.permissions.has('ADMINISTRATOR')
  )
    return
  if (message.content.startsWith('.panel')) {
    const args = message.content.split(' ')
    if (args[0] != '.panel') return
    if (args.length === 1) {
      await message
        .reply({
          content: outdent`
      \`.panel 役職のID\` もしくは \`.panel 役職のID ボタンに表示するラベル\` と入力してください。`
        })
        .then((replyMessage) => {
          deleteMessage(message)
          deleteMessage(replyMessage)
        })
      return
    }
    const [, id, ...labelArray] = args
    const roleName = (await message.guild?.roles.fetch(id))?.name
    if (roleName == null) {
      await message
        .reply({
          content: outdent`対象とする役職が見つかりませんでした。
        ロールIDを確認してください。`
        })
        .then((replyMessage) => {
          deleteMessage(message)
          deleteMessage(replyMessage)
        })
      return
    }
    const targetLinkIndex = labelArray.findIndex((t) =>
      t.includes('.com/channels/')
    )
    const targetLink =
      targetLinkIndex > -1
        ? labelArray.splice(targetLinkIndex, 1).pop()
        : undefined

    let label = labelArray.join(' ').trim()

    if (label.length > 80) {
      await message
        .reply({
          content: outdent`ラベルは80字以内にしてください。
        <https://discord.com/developers/docs/interactions/message-components#button-object-button-structure>`
        })
        .then((replyMessage) => {
          deleteMessage(message)
          deleteMessage(replyMessage)
        })
      return
    }
    if (label.length === 0) label = roleName!
    if (targetLink == null) {
      await message.channel
        .send({
          content: outdent`
          【　通知　】
          お知らせ通知の受け取りを設定できます。
          ボタンをタップ/クリックすることでオン・オフを切り替えられます。
          `,
          components: [
            new MessageActionRow().addComponents(
              new MessageButton()
                .setCustomId(id)
                .setStyle('PRIMARY')
                .setLabel(label)
            )
          ]
        })
        .then(() => {
          deleteMessage(message)
        })
    } else {
      const urlPattern =
        /https?:\/\/(?:canary\.|(?:ptb\.))?discord(?:app)?\.com\/channels\/\d{17,19}\/(?<channelId>\d{17,19})\/(?<messageId>\d{17,19})/
      const found = targetLink.match(urlPattern)
      if (found == null) return
      let targetMsg: Message<boolean> | null | undefined = undefined
      try {
        targetMsg = (await (
          (await client.channels.fetch(found.groups!.channelId)) as TextChannel
        ).messages.fetch(found.groups!.messageId)) as Message
      } catch (e) {
        await message
          .reply({
            content: outdent`
          メッセージリンク先を特定できませんでした。
          URLが正しいか確認してください。`
          })
          .then((replyMessage) => {
            deleteMessage(message)
            deleteMessage(replyMessage)
          })
        return
      }
      if (targetMsg == null) return
      if (
        !(
          targetMsg.author == client.user &&
          targetMsg.content.includes('【　通知　】')
        )
      ) {
        await message
          .reply({
            content: outdent`
          役職付与ボタンのあるメッセージではないようです。
          URLが正しいか確認してください。`
          })
          .then((replyMessage) => {
            deleteMessage(message)
            deleteMessage(replyMessage)
          })
        return
      }
      let panelComponents = targetMsg.components
      const buttonRowIndex = panelComponents.findIndex((row) =>
        row.components.some((button) => button.customId === id)
      )
      if (buttonRowIndex > -1) {
        const askMsg = await message.reply({
          content: outdent`
          すでに<@&${id}>用のボタンが作成されているようです。
          既存のボタンをどうしますか。`,
          allowedMentions: {
            repliedUser: true
          },
          components: [
            new MessageActionRow().addComponents([
              new MessageButton()
                .setCustomId('overwrite')
                .setStyle('SUCCESS')
                .setLabel('上書き'),
              new MessageButton()
                .setCustomId('delete')
                .setStyle('DANGER')
                .setLabel('削除'),
              new MessageButton()
                .setCustomId('cancel')
                .setStyle('SECONDARY')
                .setLabel('キャンセル')
            ])
          ]
        })
        const collector = new InteractionCollector(client, {
          componentType: 'BUTTON',
          idle: 30 * 1000,
          message: askMsg
        })
        async function on_end(
          collected: Collection<string, Interaction<CacheType>>,
          reason: string
        ) {
          switch (reason) {
            case 'idle':
              if (collected.size > 0) return
              const content = `タイムアウトしました。コマンド入力からやり直してください。`
              const message_data = {
                content,
                components: []
              }
              await askMsg.edit(message_data).then(() => {
                deleteMessage(message)
                deleteMessage(askMsg)
              })
              return

            case 'messageDelete':
            case 'channelDelete':
            case 'guildDelete':
              // do nothing
              return
            default:
              throw new Error('unknown reason')
          }
        }
        const on_collect = async (
          interaction: ButtonInteraction<CacheType>
        ) => {
          switch (interaction.customId) {
            case 'overwrite':
              ;(
                panelComponents[buttonRowIndex].components.find(
                  (button) => button.customId === id
                )! as MessageButton
              ).setLabel(label)
              await targetMsg!.edit({
                components: panelComponents
              })

              await askMsg
                .edit({
                  content: `\`${label}\`で上書きしました。`,
                  components: []
                })
                .then(() => {
                  if (targetMsg?.channel !== message.channel) return
                  deleteMessage(message)
                  deleteMessage(askMsg)
                })
              await interaction.deferUpdate().catch(() => {})
              return
            case 'delete':
              panelComponents[buttonRowIndex].spliceComponents(
                panelComponents[buttonRowIndex].components.findIndex(
                  (button) => button.customId === id
                ),
                1
              )
              if (!panelComponents[buttonRowIndex].components.length)
                panelComponents.pop()
              await targetMsg!.edit({
                components: panelComponents
              })
              await askMsg
                .edit({
                  content: `<@&${id}>用のボタンを削除しました。`,
                  allowedMentions: {
                    repliedUser: true
                  },
                  components: []
                })
                .then(() => {
                  if (targetMsg?.channel !== message.channel) return
                  deleteMessage(message)
                  deleteMessage(askMsg)
                })
              await interaction.deferUpdate().catch(() => {})
              return
            case 'cancel':
              await askMsg
                .edit({
                  content: `キャンセルしました。`,
                  components: []
                })
                .then(() => {
                  deleteMessage(message)
                  deleteMessage(askMsg)
                })
              await interaction.deferUpdate().catch(() => {})
              return
          }
          throw new Error('unknown custom id')
        }
        collector.on('collect', (i: ButtonInteraction) => {
          on_collect(i).catch((err) => console.error(err))
        })
        collector.on('end', (collected, reason) =>
          on_end(collected, reason).catch((err) => console.error(err))
        )
        return
      }
      if (
        panelComponents.length === 5 &&
        panelComponents[4].components.length === 5
      ) {
        await message
          .reply(`このパネルにはこれ以上ボタンを追加することができません。`)
          .then((replyMessage) => {
            deleteMessage(message)
            deleteMessage(replyMessage)
          })
      } else if (!panelComponents.length) {
        targetMsg.edit({
          components: [
            new MessageActionRow().addComponents(
              new MessageButton()
                .setCustomId(id)
                .setStyle('PRIMARY')
                .setLabel(label)
            )
          ]
        })
        await message
          .reply({
            content: `<@&${id}>用のボタンを\`${roleName}\`のラベルをつけて作成しました。`,
            allowedMentions: {
              repliedUser: true
            }
          })
          .then((replyMessage) => {
            if (targetMsg?.channel !== message.channel) return
            deleteMessage(message)
            deleteMessage(replyMessage)
          })
      } else if (
        panelComponents[panelComponents.length - 1].components.length === 5
      ) {
        targetMsg.edit({
          components: [
            ...targetMsg.components,
            new MessageActionRow().addComponents(
              new MessageButton()
                .setCustomId(id)
                .setStyle('PRIMARY')
                .setLabel(label)
            )
          ]
        })

        await message
          .reply({
            content: `<@&${id}>用のボタンを\`${roleName}\`のラベルをつけて作成しました。`,
            allowedMentions: {
              repliedUser: true
            }
          })
          .then((replyMessage) => {
            if (targetMsg?.channel !== message.channel) return
            deleteMessage(message)
            deleteMessage(replyMessage)
          })
      } else {
        panelComponents[panelComponents.length - 1].addComponents(
          new MessageButton()
            .setCustomId(id)
            .setStyle('PRIMARY')
            .setLabel(label)
        )
        targetMsg.edit({
          components: panelComponents
        })
        await message
          .reply({
            content: `<@&${id}>用のボタンを\`${roleName}\`のラベルをつけて作成しました。`,
            allowedMentions: {
              repliedUser: true
            }
          })
          .then((replyMessage) => {
            if (targetMsg?.channel !== message.channel) return
            deleteMessage(message)
            deleteMessage(replyMessage)
          })
      }
    }
  }
})

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return

  if (interaction.guild?.roles.cache.get(interaction.customId) != null) {
    const member = interaction.member as GuildMember
    let msg: string
    if (member?.roles.cache.has(interaction.customId)) {
      msg = `<:NO:931715830620778556> <@&${interaction.customId}>を外しました。`
      await member.roles.remove(interaction.customId)
    } else {
      msg = `<:GOOD:931715830444621824> <@&${interaction.customId}>を付けました。`
      await member.roles.add(interaction.customId)
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
