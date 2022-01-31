import { client } from '..'
import { getTextChannelById } from '../utils'

client.on('ready', () => {
  const logChannel = getTextChannelById('739078686501098240')
  const loginMessage = 'Logged in as ' + client.user?.tag
  logChannel?.send(loginMessage)
})

client.on('messageCreate', async (message) => {
  if (message.content.startsWith('?ping')) {
    const channel = message.channel
    const response = await channel.send('Pong!')
    await response.edit('Pong!')
  }
})
