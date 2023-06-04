import { Events } from 'discord.js'
import { client } from '..'

client.on(Events.GuildMemberRemove, async (member) => {
  const channel = client.guilds.cache
    .find((g) => g.id === '1024353262226374686')!
    .channels.cache.find((c) => c.name === 'left-log')!
  if (channel.isTextBased()) await channel.send('left: ' + member.displayName)
})
