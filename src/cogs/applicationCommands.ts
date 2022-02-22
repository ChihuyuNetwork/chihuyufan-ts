import { client } from '..'
import { guildId } from '../constant'

client.once('ready', async () => {
  await client.application?.fetch()
  await client.application?.commands.set([], guildId)
  client.emit('commandsReset')
})
