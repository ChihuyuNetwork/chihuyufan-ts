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
      await message.channel.send('Specify user not found.')
      return
    }

    if (args.length < 2) {
      await message.channel.send('Please provide a role name.')
      return
    }

    if (target.roles.cache.find((r) => r.name === args[1]) === undefined) {
      const role = await message.guild?.roles.create({
        name: args.slice(1).join(' ')
      })
      target?.roles.add(role as RoleResolvable)

      await message.channel.send(
        `${target?.displayName} has unlocked achivement: **${role?.name}**`
      )
    } else {
      await message.channel.send(
        `The user has already unlocked that achivement.`
      )
    }
  }
})
