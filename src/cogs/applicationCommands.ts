import {Events} from 'discord.js'
import {client} from '..'
import {guildId} from '../constant'

client.once(Events.ClientReady, async () => {
  await client.application?.fetch()
  await client.application?.commands.set([], guildId)
  client.emit('commandsReset')
})
