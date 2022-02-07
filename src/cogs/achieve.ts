import { GuildMember, Role } from 'discord.js'
import { client } from '..'

const isTarget = (m: GuildMember, str: string) => {
  return [m.displayName, m.nickname, m.user.username, m.user.id].includes(str)
}

const isAchieve = (r: Role, str: string) => {
  return [r.name, r.id].includes(str)
}

client.on('messageCreate', async (message) => {
  if (!message.guild || !message.member) return
  if (!message.content.startsWith('.achieve')) return
  if (!message.member.permissions.has('ADMINISTRATOR')) return

  const [prefix, target, ...tmp] = message.content.split(' ')
  if (prefix != '.achieve') return
  const member =
    message.mentions.members?.first() ||
    message.guild.members?.cache.find((m) => isTarget(m, target))
  const achieve = tmp.join(' ')

  let err: string | undefined
  if (member?.roles.cache.has(achieve)) err = '既に実績を解除しています。'
  if (achieve.length === 0) err = 'ロール名を入力してください。'
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
