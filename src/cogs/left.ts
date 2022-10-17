import { client } from '..'

client.on('guildMemberRemove', async (member) => {
  const channel = client.guilds.cache
    .find((g) => g.id === '840530499901849620')!
    .channels.cache.find((c) => c.name === 'log')!
  if (channel.isTextBased()) await channel.send('left: ' + member.displayName)
})
