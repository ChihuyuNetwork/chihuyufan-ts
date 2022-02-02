import { client } from '..'

const defaultName = 'VC'
const voiceChannelId = '928983010081124393'

client.on('messageCreate', async (message) => {
  if (!message.content.startsWith('.vc')) return

  const name = message.content.split(' ').slice(1).join(' ')
  const joinedVC = message.member?.voice.channel?.id === voiceChannelId
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
    channel.id !== voiceChannelId ||
    channel.members.size !== 0 ||
    channel.name === defaultName
  ) {
    return
  }
  await channel.edit({ name: defaultName })
})
