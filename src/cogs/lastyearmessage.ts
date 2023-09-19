import {Events, Message} from 'discord.js'
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
    let messages: Message[] = []
    let message = await interaction.channel!.messages
        .fetch({limit: 1})
        .then(messagePage => (messagePage.size === 1 ? messagePage.at(0) : null))
    while (message) {
        await interaction.channel!.messages
            .fetch({ limit: 100, before: message.id })
            .then(messagePage => {
                messagePage.forEach(msg => messages.push(msg));

                // Update our message pointer to be the last message on the page of messages
                message = 0 < messagePage.size ? messagePage.at(messagePage.size - 1) : null;
            });

        if (Date.now() - message.createdTimestamp >= 365 * 24 * 60 * 60 * 1000) break
    }
    await interaction.reply(messages[0].url)
})