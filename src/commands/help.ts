import { ChatInputCommandInteraction } from "discord.js";

export const help = (interaction: ChatInputCommandInteraction) => {
  interaction.reply(
    `BTC reminder commands guide:\nconfigure:      To configure the bot's notification with your USD target and the notification channel.\nconvert:      To convert amounts from BTC to USD.\nhelp:      To show this message.`,
  );
};
