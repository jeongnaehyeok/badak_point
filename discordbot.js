const dotenv = require("dotenv");
const { Client, GatewayIntentBits } = require('discord.js');
const { REST, Routes } = require('discord.js');

dotenv.config();

const commands = [
  {
    name: 'badackpoint',
    description: '현제 바닥 포인트를 확인할 수 있습니다!',
  },
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  console.log('call');
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'badackpoint') {
    await interaction.reply('바바닥닥');
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
