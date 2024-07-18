import { ChatInputCommandInteraction, Interaction, REST, Routes } from "discord.js";
import { env } from "./src/config/init-envalid";
import { commands } from "./src/config/commands";
import { client } from "./src/config/discord-client";
import { configureCmd } from "./src/commands/configure";
import express from "express";
import { Guild } from "@prisma/client";
import { convert } from "./src/commands/convert";
import { help } from "./src/commands/help";

client.once("ready", async () => {
  console.log(`Logged in as ${client.user?.tag}!`);

  const rest = new REST({ version: "10" }).setToken(env.TOKEN);

  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(client.user?.id || ""), { body: commands });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
});

client.on("interactionCreate", async (interaction: Interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction as ChatInputCommandInteraction;

  try {
    switch (commandName) {
      case "configure":
        configureCmd(interaction as ChatInputCommandInteraction);
        break;
      case "convert":
        convert(interaction as ChatInputCommandInteraction);
        break;
      case "help":
        help(interaction as ChatInputCommandInteraction);
        break;
    }
  } catch (error) {
    console.log(error);
  }
});

const app = express();

app.use(express.json());
app.post("/send-message/:value", async (req, res) => {
  const { guilds } = req.body;
  const { value } = req.params;

  try {
    guilds.map(async (guild: Guild) => {
      const server = await client.guilds.fetch(guild.guild_id);
      const channel = await server.channels.fetch(guild.channel_id);

      if (channel && channel.isTextBased()) {
        await channel.send(
          `Hey <@${guild.user}> wake up, BTC has reached your target \`$${guild.target}\`, and the current value is \`$${value}\``,
        );
      }
    });
    res.status(200).send("Message sent successfully");
  } catch (error) {
    console.error("Error fetching channel or sending message:", error);
    res.status(500).send("Internal server error");
  }
});

app.listen(5556, () => {
  console.log(`Server is running on port 5556`);
});

client.login(env.TOKEN);
