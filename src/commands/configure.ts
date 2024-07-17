import { ChatInputCommandInteraction, Interaction, TextChannel } from "discord.js";
import { db } from "../config/prisma-client";

export const configureCmd = async (interaction: ChatInputCommandInteraction) => {
  const { options } = interaction;

  const target = options.getString("target"),
    channel = options.getChannel("channel") as TextChannel;

  await interaction.reply(`The bot is configured successfully, you will be notified once the BTC reaches $${target}.`);

  await channel.send("Hi, I will notify about BTC updates in this channel!");

  await db.guild.upsert({
    where: { guild_user: { guild_id: interaction.guild?.id as string, user: interaction.user.username } },
    update: { target: Number(target) },
    create: {
      guild_id: interaction.guild?.id as string,
      target: Number(target),
      channel_id: channel.id,
      user: interaction.user.id,
    },
  });
};
