import { SlashCommandBuilder } from "discord.js";

export const commands = [
  new SlashCommandBuilder()
    .setName("configure")
    .setDescription("Configure the bot with the target you want to be notified about.")
    .addStringOption((option) =>
      option.setName("target").setDescription("The target in USD, eg: 60000").setRequired(true),
    )
    .addChannelOption((option) =>
      option.setName("channel").setDescription("The channel you will be notified in.").setRequired(true),
    ),
].map((command) => command.toJSON());
