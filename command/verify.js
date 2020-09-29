const talkedRecently = new Set();
const Discord = require("discord.js");
module.exports = {
  name: "verify",
  description: "Just For Fun",
  execute(message, args, client, logChannel) {
    let options = message.content.split(/ +/);
    if (options[1] == "help") {
      message.channel.send({
        embed: {
          color: 6945791,
          title: "Verify",
          description:
            "**Description:** Just a fun test command\n**Cooldown:** 5 sec\n**Usage:** f!verify",
          timestamp: new Date(),
          footer: {
            text: "Mr Fluffycloud ™"
          }
        }
      });
    } else if (talkedRecently.has(message.author.id)) {
      message.reply("Please wait 5 seconds before using this command again!");
    } else {
      async function verify() {
        let embed = new Discord.RichEmbed()
          .setDescription(
            "React with <a:GreenVerifiedTick:755303142224035892> to get your role!"
          )
          .setColor("84DD63")
          .setTimestamp();
        const reactmessage = await message.channel.send(embed);
        await reactmessage.react("755303142224035892");

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
