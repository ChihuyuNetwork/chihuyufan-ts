import {Collection, Events, Message, SnowflakeUtil} from 'discord.js'
import {client} from '..'
import {guildId} from '../constant'
import {ApplicationCommandOptionType} from "discord-api-types/v10";

client.on('commandsReset', async () => {
    client.application!.commands.create(
        {
            name: 'last-year-message',
            description: 'チャンネルにある一年前のメッセージを引っ張り出してきます',
            options: [
                {
                    type: ApplicationCommandOptionType.Channel,
                    name: 'channel',
                    description: '歴史を見たいチャンネル'
                }
            ]
        },
        guildId
    )
})

/**
 * This is a function that ensures the return of JST dates
 * in environments where Date returns either UTC or JST.
 * @returns {Date} The current JST Date
 */
export const getJstDate = () => {
    const jstOffsetMinutes = 9 * 60
    const millisecondsInMinute = 60 * 1000

    // UTC: (   0 + jstOffsetMinutes) * millisecondsInMinute = 32400000
    // JST: (-540 + jstOffsetMinutes) * millisecondsInMinute = 0
    const differenceFromJST = (new Date().getTimezoneOffset() + jstOffsetMinutes) * millisecondsInMinute

    // UTC time + 32400000 -> JST time
    // JST time +        0 -> JST time
    return new Date(Date.now() + differenceFromJST)
}
// ---

const nowDate = getJstDate()

const snowflake = SnowflakeUtil.generate({timestamp: nowDate.setFullYear(nowDate.getFullYear() - 1)})
// 処理 with snowflake

client.on(Events.InteractionCreate, async (interaction) => {
    if (
        !interaction.inCachedGuild() ||
        !interaction.isChatInputCommand() ||
        interaction.commandName !== 'last-year-message'
    )
        return
    const channel = interaction.options.getChannel('channel') || interaction.channel
    // @ts-ignore
    let message: Collection<string, Message<true>> = await channel!.messages
        .fetch({limit: 1, before: snowflake})
    await interaction.reply({content: message.first() !== undefined ? message.first()!.url : "ないっぽいよ", ephemeral: false})
})