import { client } from '..'

const defaultName = 'VC'
const voiceChannelsId = ['928983010081124393', '941561562810966036']

client.on('messageCreate', async (message) => {
  if (!message.content.startsWith('.vc')) return

  const [prefix, ...nameArray] = message.content.split(' ')
  const name = nameArray.join(' ')
  if (prefix != '.vc') return
  const joinedVC = voiceChannelsId.includes(message.member?.voice.channel?.id!)
  const noDiff = name === message.member?.voice.channel?.name
  let response: string | undefined

  if (!joinedVC) response = 'チャンネルに参加してください。'
  if (name === '') response = '名前を入力してください。'
  if (noDiff) response = '既にその名前です。'
  if (response === undefined) {
    await message.member?.voice.channel?.edit({ name })
    response = `チャンネル名を\`${name}\`に変更しました。\n※10分のレートリミットがあります。`
  }
  await message.channel.send(response)
})

client.on('voiceStateUpdate', async (oldState, newState) => {
  const channel = newState.channel ? newState.channel : oldState.channel
  if (
    !channel ||
    !voiceChannelsId.includes(channel.id) ||
    channel.members.size !== 0 ||
    channel.name === defaultName
  ) {
    return
  }
  await channel.edit({ name: defaultName })
})
