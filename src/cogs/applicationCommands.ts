import { client, guildId } from '..'

client.once('ready', async () => {
  await client.application?.fetch()
  await client.application?.commands.set([], guildId)
  client.emit('commandsReset')
})
