import {Events} from 'discord.js'
import {client} from '..'
import {guildId} from '../constant'

client.on('commandsReset', async () => {
    client.application!.commands.create(
        {
            name: 'last-year-message',
            description: 'チャンネルにある一年前のメッセージを引っ張り出してきます'
        },
        guildId
    )
})

client.on(Events.InteractionCreate, async (interaction) => {
    if (
        !interaction.inCachedGuild() ||
        !interaction.isChatInputCommand() ||
        interaction.commandName !== 'last-year-message'
    )
        return
    const messages = await interaction.channel!.messages.fetch()
    const filteredMessages = messages.filter(msg => {
        const timeDiff = Date.now() - msg.createdTimestamp
        const oneYear = 365 * 24 * 60 * 60 * 1000
        return timeDiff <= oneYear
    })
    await interaction.reply(filteredMessages.first()!.url)
})