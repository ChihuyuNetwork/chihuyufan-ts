import {Events} from 'discord.js'
import {client} from '..'

client.once(Events.ClientReady, async () => {
  // await client.application?.fetch()
  // await client.application?.commands.set([], guildId)
  // client.emit('commandsReset')
})
