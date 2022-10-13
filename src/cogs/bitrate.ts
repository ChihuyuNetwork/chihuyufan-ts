import { VoiceChannel } from 'discord.js'
import { client } from '..'
import { guildId } from '../constant'

client.on('commandsReset', async () => {
  client.application?.commands.create(
    {
      name: 'bitrate',
      description: '参加しているVCのビットレートを変更します',
      options: [
        {
          type: 'NUMBER',
          name: 'value',
          description: 'ビットレート'
        }
      ]
    },
    guildId
  )
})

client.on('interactionCreate', async (interaction) => {
  if (
    !interaction.inCachedGuild() ||
    !interaction.isCommand() ||
    interaction.commandName !== 'bitrate'
  )
    return
  const joinedVC = interaction.member?.voice.channel
  if (!joinedVC || !(joinedVC instanceof VoiceChannel)) {
    await interaction.reply({
      content: 'VCに参加してください。',
      ephemeral: true
    })
    return
  }
  const inputBitrateK = interaction.options.getNumber('value')
  const maxbps = interaction.guild.maximumBitrate
  const minbps = 8 * 1000
  const changeBitrate = async (inputBitrateK: number) => {
    const bitrate = Math.max(Math.min(inputBitrateK * 1000, maxbps), minbps)
    await joinedVC.setBitrate(
      bitrate,
      `${interaction.user.tag}(${interaction.user.id})によって要求されました。`
    )
    return `${joinedVC.toString()}: ${joinedVC.bitrate / 1000}kbpsに変更しました。`
  }
  const response =
    !inputBitrateK || Math.floor(inputBitrateK * 1000) === joinedVC.bitrate
      ? `${joinedVC.toString()}: ${joinedVC.bitrate / 1000}kbpsです。`
      : await changeBitrate(inputBitrateK)
  await interaction.reply({
    content: response
  })
})
