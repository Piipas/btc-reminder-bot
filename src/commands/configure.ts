import { ChatInputCommandInteraction, TextChannel } from "discord.js";
import { db } from "../config/prisma-client";

export const configureCmd = async (interaction: ChatInputCommandInteraction) => {
  const { options } = interaction;

  const target = options.getNumber("target"),
    channel = options.getChannel("channel") as TextChannel;

  await interaction.reply(":eggplant:");

  await channel.send(
    `Hi <@${interaction.user.id}>, your notifications settings has been updated. I will notify you here once the BTC reaches \`$${target}\``,
  );

  await db.guild.upsert({
    where: { guild_user: { guild_id: interaction.guild?.id as string, user: interaction.user.id } },
    update: { target: Number(target) },
    create: {
      guild_id: interaction.guild?.id as string,
      target: Number(target),
      channel_id: channel.id,
      user: interaction.user.id,
    },
  });
};
