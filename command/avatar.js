const talkedRecently = new Set();
const Discord = require('discord.js');
module.exports = {
    name: 'avatar',
    description: 'Shows your avatar',
    execute(message, args, client, logChannel) {
        let options = message.content.split(/ +/);
        if (options[1] == 'help') {
            message.channel.send({
                embed: {
                    color: 6945791,
                    title: 'Avatar',
                    description: '**Description:** Sends the Avatar of a person mentioned or yours\n**Cooldown:** 5 sec\n**Usage:** f!avatar [user<optional>]',
                    timestamp: new Date(),
                    footer: {
                        text: "Mr Fluffycloud ™"
                    }

                }
            })
        } else if (talkedRecently.has(message.author.id)) {
            message.reply(`<a:Circlestop:755438946518827009> **Man chill out!** <a:Circlestop:755438946518827009>`)
        } else {
            message.delete(5000);
            const user = message.mentions.users.first() || message.author;
            const avatarEmbed = new Discord.RichEmbed()
                .setColor('RANDOM')
                .setAuthor(user.username)
                .setImage(user.avatarURL);
            message.channel.send(avatarEmbed);


            talkedRecently.add(message.author.id);
        }
        setTimeout(() => {
            // Removes the user from the set after a minute
            talkedRecently.delete(message.author.id);
        }, 5000);
    }
}