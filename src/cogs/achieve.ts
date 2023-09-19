import {ApplicationCommandOptionType} from 'discord-api-types/v10'
import {Events, GuildMember, Role} from 'discord.js'
import {client} from '..'
import {guildId} from '../constant'

const isTarget = (m: GuildMember, str: string) => {
  return [m.displayName, m.nickname, m.user.username, m.user.id].includes(str)
}

const isAchieve = (r: Role, str: string) => {
  return [r.name, r.id].includes(str)
}

client.on('commandsReset', async () => {
  client.application!.commands.create(
    {
      name: 'achieve',
      description: 'ユーザーの実績を解除します',
      options: [
        {
          type: ApplicationCommandOptionType.User,
          name: 'user',
          description: '対象ユーザー',
          required: true
        },
        {
          type: ApplicationCommandOptionType.String,
          name: 'achieve',
          description: '実績名',
          required: true
        }
      ]
    },
    guildId
  )
})

client.on(Events.InteractionCreate, async (interaction) => {
  if (
    !interaction.inCachedGuild() ||
    !interaction.isChatInputCommand() ||
    interaction.commandName !== 'achieve'
  )
    return
  if (!interaction.memberPermissions!.has('Administrator')) {
    await interaction.reply({
      content: 'このコマンドは管理者権限を持つ人のみ実行できます。',
      ephemeral: true
    })
    return
  }
  const user = interaction.options.getMember('user')!
  const achieve = interaction.options.getString('achieve', true)
  if (achieve in user.roles) {
    await interaction.reply({
      content: '既に実績を解除しています。',
      ephemeral: true
    })
    return
  }
  const role =
    interaction.guild!.roles.cache.find((r) => isAchieve(r, achieve)) ||
    (await interaction.guild!.roles.create({ name: achieve }))
  await interaction.guild!.members.addRole({user: user, role: role})
  await interaction.reply(`${user}が実績解除しました: "**${role.name}**"`)
})