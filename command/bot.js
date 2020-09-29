const talkedRecently = new Set();
const Discord = require("discord.js");
module.exports = {
  name: "bot",
  description: "Bot?",
  execute(message, args, client, logChannel) {
    let options = message.content.split(/ +/);
    if (options[1] == "help") {
      message.channel.send({
        embed: {
          color: 6945791,
          title: " ",
          description:
            " ",
          timestamp: new Date(),
          footer: {
            icon_url: "https://cdn.discordapp.com/emojis/755377825585954859.png?v=1"
          }
        }
      });
    } else if (talkedRecently.has(message.author.id)) {
      message.reply("Please wait 5 seconds before using this command again!");
    } else {
      async function verify() {
        let embed = new Discord.RichEmbed()
            .setTitle('Fluff<:Bot:755377825585954859>')
            .setColor('RANDOM')
            .setDescription('**You think i am a bot?**')
            .addField('<:SadBot:755377827242836018>', 'Shame on you', true);
        const reactmessage = await message.channel.send(embed);
        await reactmessage.react("755377843872989194");

        const filter = (reaction, user) =>
          reaction.emoji.name === "✅" && !user.bot;
        const collector = reactmessage.createReactionCollector(filter, {
          time: 15000
        });

        collector.on("collect", async reaction => {
          const user = reaction.users.last();
          const guild = reaction.message.guild;
          const member = guild.member(user) || (await guild.fetchMember(user));
        });
      }
      verify();

      talkedRecently.add(message.author.id);
    }
    setTimeout(() => {
      // Removes the user from the set after a minute
      talkedRecently.delete(message.author.id);
    }, 5000);
  }
};
