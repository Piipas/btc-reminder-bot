import { ChatInputCommandInteraction } from "discord.js";
import redis from "../config/redis-client";

export const convert = async (interaction: ChatInputCommandInteraction) => {
  const { options } = interaction;

  const amount = options.getNumber("amount");
  if (!amount) return await interaction.reply("The amount is not valid!");

  const currentValue = await redis.get("currencyjob:lastupdatedvalue");

  const result = Number(currentValue) * amount;

  await interaction.reply(`$${result}`);
};
