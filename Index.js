const Discord = require("discord.js");
const client = new Discord.Client();
client.commands = new Discord.Collection();
const fs = require("fs");
const { prefix, token } = require("./config.json");
const commandFiles = fs
  .readdirSync("./command")
  .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./command/${file}`);
  client.commands.set(command.name, command);
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setStatus("available");
  client.user.setPresence({
    game: {
      name: "a game",
      type: "PLAYING",
      url: "https://www.twitch.tv/MrFluffycloud"
    }
  });
});

client.on('message', async message => {
	if (message.content === 'hi') {
    let embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription(`<a:Hi:755322003883294751> **Hello ${message.author}!** <a:Hi:755322003883294751>`)
		message.channel.send(embed);

	}
});

client.on('message', async message => {
	if (message.content === 'hey') {
    let embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription(`<a:Hi:755322003883294751> **Hello ${message.author}!** <a:Hi:755322003883294751>`)
		message.channel.send(embed);

	}
});

client.on('message', async message => {
	if (message.content === 'hello') {
    let embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription(`<a:Hi:755322003883294751> **Hey ${message.author}!** <a:Hi:755322003883294751>`)
		message.channel.send(embed);

	}
});

client.on("message", async message => {
  if (message.content === "the unknow truth about the bot hahahaha") {
    const user = message.mentions.users.first() || message.author;
    message.delete(10000);
    let embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setDescription("``f!``")
      .setTitle("My prefix is")
      .setFooter(`Requested by ${user.username}`, user.avatarURL)
      .setTimestamp();
    message.channel.send(embed);
  }
  
  // Command-specific code here!
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  // ---> Reading normal commands
  if (!client.commands.has(command)) {
    return message.reply("<a:RedCross:755307418841383013> **That is not a command!** <a:RedCross:755307418841383013>");
  }
  try {
    // ---> Running the command
    client.commands.get(command).execute(message, args, client);
  } catch (error) {
    console.error(error);
    message.reply("<a:404:755319933545742347> **There was an error trying to execute that command!** <a:404:755319933545742347>");
  }
});


client.login(token);