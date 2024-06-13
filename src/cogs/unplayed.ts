import {Collection, Events, Message, TextChannel} from 'discord.js'
import {client} from '..'
import {guildId} from '../constant'
import {ApplicationCommandOptionType} from "discord-api-types/v10";

client.on('commandsReset', async () => {
    client.application!.commands.create(
        {
            name: 'unplayed',
            description: '#やりたいやつ からゲームを探します',
            options: [
                {
                    type: ApplicationCommandOptionType.String,
                    name: 'type',
                    description: 'ゲーム',
                    required: true,
                    choices: [
                        { name: 'Steam', value: 'steam' },
                        { name: '配布マップ', value: 'haihu' }
                    ]
                }
            ]
        },
        guildId
    )
})

client.on(Events.InteractionCreate, async (interaction) => {
    if (
        !interaction.inCachedGuild() ||
        !interaction.isChatInputCommand() ||
        interaction.commandName !== 'unplayed'
    )
        return
    const channel = await interaction.guild.channels.fetch('1134479379267866624') as TextChannel
    let type: string[] = []
    if (interaction.options.getString('type', true) == 'steam') {
        type.push('https://x.com/AUTOMATONJapan/', 'https://x.com/denfaminicogame/', 'https://store.steampowered.com/', 'https://x.com/indie_freaksjp/')
    } else if (interaction.options.getString('type', true) == 'haihu') {
        type.push('https://gerogero2.sakura.ne.jp/', 'https://minecraft-mcworld.com/')
    }
    let messages: Collection<string, Message<true>> = await channel!.messages.fetch()
    let filtered = messages.filter(async (m) =>
            type.some((s) => m.content.startsWith(s))
            && (await m.awaitReactions()).filter(async (r) =>
                (await r.fetch()).emoji.name !== 'sparkles'
            ).size > 0
    )

    await interaction.reply(filtered.map((m) => `${m.url}: ${m.content}`).join("\n"))
})