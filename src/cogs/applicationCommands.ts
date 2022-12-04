import { Events } from 'discord.js'
import { client } from '..'
import { guildId } from '../constant'

client.once(Events.ClientReady, async () => {
  // TODO: コマンドに差分があった時のみ登録作業をするようにする
})
