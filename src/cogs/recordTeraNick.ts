import { client } from '..'
import { TextChannel, ThreadChannel } from 'discord.js'
// てらのニックを記録するスレ
const channelId = "949221516313235456"
client.on('guildMemberUpdate', async (oldMember, newMember) => {
  if(newMember.id !== "537586501798723584" || oldMember.displayName === newMember.displayName){
    return;
  }
  const channel = client.channels.resolve(channelId)
  if(channel instanceof ThreadChannel || channel instanceof TextChannel){
    await channel.send(newMember.displayName)
  }
})