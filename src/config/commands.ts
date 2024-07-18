import { SlashCommandBuilder } from "discord.js";

export const commands = [
  new SlashCommandBuilder()
    .setName("configure")
    .setDescription("Configure the bot with the target you want to be notified about.")
    .addNumberOption((option) =>
      option.setName("target").setDescription("The target in USD, eg: 60000").setRequired(true),
    )
    .addChannelOption((option) =>
      option.setName("channel").setDescription("The channel you will be notified in.").setRequired(true),
    ),
  new SlashCommandBuilder()
    .setName("convert")
    .setDescription("Command to convert amounts from BTC to USD")
    .addNumberOption((option) =>
      option.setName("amount").setDescription("The amount which will be converted.").setRequired(true),
    ),
  new SlashCommandBuilder().setName("help").setDescription("Show the help message."),
].map((command) => command.toJSON());
