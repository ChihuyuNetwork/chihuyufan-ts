import { GuildMember, RoleResolvable } from 'discord.js'
import { client } from '..'

client.on('messageCreate', async (message) => {
  if (
    message.content.startsWith('.achieve') &&
    message.member?.permissions.has('ADMINISTRATOR')
  ) {
    const args = message.content.split(' ').slice(1)

    const target =
      message.mentions.members?.first() ||
      message.guild?.members.cache.find(
        (m) => m.displayName === args[0] || m.user.username === args[0]
      )

    if (target === undefined) {
      await message.channel.send('ユーザーが見つかりませんでした。')
      return
    }

    if (args.length < 2) {
      await message.channel.send('ロール名を入力してください。')
      return
    }

    if (target.roles.cache.find((r) => r.name === args[1]) === undefined) {
      const role =
        message.guild?.roles.cache.find((r) => r.name === args[1]) ||
        (await message.guild?.roles.create({ name: args.slice(1).join(' ') }))
      target?.roles.add(role as RoleResolvable)

      await message.channel.send(
        `${target}が実績解除しました: "**${role?.name}**"`
      )
    } else {
      await message.channel.send(`ユーザーは既に実績を解除しています。`)
    }
  }
})
