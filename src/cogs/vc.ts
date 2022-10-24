import { ApplicationCommandOptionType } from 'discord-api-types/v10'
import { InteractionReplyOptions } from 'discord.js'
import { client } from '..'
import { guildId } from '../constant'

interface DefaultNameDictionary {
  [index: string]: string
}

const defaultNames: DefaultNameDictionary = {
  '928983010081124393': 'VC',
  '953922831924731935': 'VC2'
}
const voiceChannelsId = ['928983010081124393', '953922831924731935']

client.on('commandsReset', async () => {
  client.application!.commands.create(
    {
      name: 'vc',
      description: '参加しているVCの名前を変更します',
      options: [
        {
          type: ApplicationCommandOptionType.String,
          name: 'name',
          description: '今何してる？',
          required: true
        }
      ]
    },
    guildId
  )
})

client.on('interactionCreate', async (interaction) => {
  if (
    !interaction.inCachedGuild() ||
    !interaction.isChatInputCommand() ||
    interaction.commandName !== 'vc'
  )
    return
  const name = interaction.options.getString('name', true)
  const joinedVC = voiceChannelsId.includes(
    interaction.member.voice.channel?.id!
  )
  const noDiff = name === interaction.member.voice.channel?.name
  let response: string | InteractionReplyOptions | undefined
  if (!joinedVC)
    response = { content: 'チャンネルに参加してください。', ephemeral: true }
  else if (name === '')
    response = { content: '名前を入力してください。', ephemeral: true }
  else if (noDiff) response = { content: '既にその名前です。', ephemeral: true }
  else {
    await interaction.member.voice.channel?.edit({ name })
    response = `チャンネル名を\`${name}\`に変更しました。\n※10分のレートリミットがあります。`
  }
  await interaction.reply(response)
})

// client.on('messageCreate', async (message) => {
//   if (!message.content.startsWith('.vc')) return

//   const [prefix, ...nameArray] = message.content.split(' ')
//   const name = nameArray.join(' ')
//   if (prefix != '.vc') return
//   const joinedVC = voiceChannelsId.includes(message.member?.voice.channel?.id!)
//   const noDiff = name === message.member?.voice.channel?.name
//   let response: string | undefined

//   if (!joinedVC) response = 'チャンネルに参加してください。'
//   if (name === '') response = '名前を入力してください。'
//   if (noDiff) response = '既にその名前です。'
//   if (response === undefined) {
//     await message.member?.voice.channel?.edit({ name })
//     response = `チャンネル名を\`${name}\`に変更しました。\n※10分のレートリミットがあります。`
//   }
//   await message.channel.send(response)
// })

client.on('voiceStateUpdate', async (oldState) => {
  const channel = oldState.channel
  if (
    !channel ||
    !voiceChannelsId.includes(channel.id) ||
    channel.members.size !== 0 ||
    channel.name === defaultNames[channel.id]
  ) {
    return
  }
  await channel.edit({ name: defaultNames[channel.id] })
})
