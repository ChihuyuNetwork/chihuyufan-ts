import { GuildMember, Role } from 'discord.js'
import { client, guildId } from '..'

const isTarget = (m: GuildMember, str: string) => {
  return [m.displayName, m.nickname, m.user.username, m.user.id].includes(str)
}

const isAchieve = (r: Role, str: string) => {
  return [r.name, r.id].includes(str)
}

client.once('ready', async () => {
  client.application?.commands.create(
    {
      name: 'achieve',
      description: 'ユーザーの実績を解除します',
      options: [
        {
          type: 'USER',
          name: 'member',
          description: '対象ユーザー',
          required: true
        },
        {
          type: 'STRING',
          name: 'achieve',
          description: '実績名',
          required: true
        }
      ]
    },
    guildId
  )
})

client.on('interactionCreate', async (interaction) => {
  // Guildで使われたコマンドか判定してないけど大丈夫？
  if (!interaction.inCachedGuild() || !interaction.isCommand() || interaction.commandName !== 'achieve') return
  if (!(interaction.member.permissions.has('ADMINISTRATOR'))) {
    await interaction.reply({
      content: 'このコマンドは管理者権限を持つ人のみ実行できます。',
      ephemeral: true
    })
    return
  }
  // Required Optionならこうすることで not nullにすることができる
  const member = interaction.options.get('member', true).member!
  const achieve = interaction.options.get('achieve', true).value as string
  let err: string | undefined
  if (member.roles.cache.has(achieve))
    err = '既に実績を解除しています。'
  if (err) {
    await interaction.reply({ content: err, ephemeral: true })
    return
  }
  const role =
    interaction.guild!.roles.cache.find((r) => isAchieve(r, achieve)) ||
    (await interaction.guild!.roles.create({ name: achieve }))
  await member.roles.add(role)
  await interaction.reply(`${member}が実績解除しました: "**${role.name}**"`)
})

client.on('messageCreate', async (message) => {
  if (!message.guild || !message.member) return
  if (!message.content.startsWith('.achieve')) return
  if (!message.member.permissions.has('ADMINISTRATOR')) return

  const [prefix, target, ...tmp] = message.content.split(' ')
  if (prefix != '.achieve') return
  const member =
    message.mentions.members?.first() ||
    message.guild.members?.cache.find((m) => isTarget(m, target)) ||
    (await message.channel.messages.fetch(message.reference?.messageId!)).member
  let achieve = tmp.join(' ')

  if (!achieve && message.reference) {
    achieve = target
  }

  let err: string | undefined
  if (member?.roles.cache.has(achieve)) err = '既に実績を解除しています。'
  if (!achieve) err = 'ロール名を入力してください。'
  if (!member) err = 'ユーザーが見つかりませんでした。'
  if (err) {
    await message.channel.send(err)
    return
  }

  const role =
    message.guild.roles.cache.find((r) => isAchieve(r, achieve)) ||
    (await message.guild.roles.create({ name: achieve }))
  await member?.roles.add(role)
  await message.channel.send(`${member}が実績解除しました: "**${role.name}**"`)
  await message.delete()
})
