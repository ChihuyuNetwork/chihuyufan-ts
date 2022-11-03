import { client } from '..'
import { guildId } from '../constant'

client.on('messageCreate', async (message) => {
  if (message.content === '.repair') {
    const authorRoles = message.member!.roles.cache.map((r) => r.id)!
    if (
      !authorRoles.includes('928978798022631424') &&
      !authorRoles.includes('1026898339121340446')
    ) {
      await message.channel.send('アドミン/鯖缶専用コマンドです')
      return
    } // admin or 鯖缶 only

    await client.application!.fetch()
    await client.application!.commands.set([], guildId)
    client.emit('commandsReset')

    await message.channel.send('コマンドを修復しました')
  }
})
