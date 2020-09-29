const talkedRecently = new Set();
const Discord = require('discord.js');
module.exports = {
    name: 'artposter',
    description: 'Tells you the info for being a ArtPoster',
    execute(message, args, client, logChannel) {
        let options = message.content.split(/ +/);
        if (options[1] == 'help') {
            message.channel.send({
                embed: {
                    color: 6945791,
                    title: 'Artposter',
                    description: '**Description:** Explains about Artposter and how to join it\n**Cooldown:** 5 sec\n**Usage:** f!artposter',
                    timestamp: new Date(),
                    footer: {
                        text: "𝙲𝚕𝚘𝚞𝚍 𝗛𝗤",
                        icon_url: "https://cdn.discordapp.com/attachments/746330910559043585/755068473687670815/PngItem_435964.png"
                    }

                }
            })
        } else if (talkedRecently.has(message.author.id)) {
            message.reply("🛑 **Chill out man!** 🛑")
        } else {
            message.delete(5000);
            let embedlol = new Discord.RichEmbed()
                .setColor('RANDOM')
                .setDescription('**I Have DMed you the info**')
                .setAuthor('𝙲𝚕𝚘𝚞𝚍 𝗛𝗤', 'https://cdn.discordapp.com/attachments/747679713954103328/747679824247652452/20200821_212232.png', 'https://discord.gg/CFb6XKh')
                .setTimestamp()
            message.channel.send(embedlol);
            let embed = new Discord.RichEmbed()
                .setColor('RANDOM')
                .setDescription('🚧** Under Construction** 🚧')
                .setTitle('Art Poster')
                .setURL('https://discord.gg/CFb6XKh')
                .setAuthor('𝙲𝚕𝚘𝚞𝚍 𝗛𝗤', 'https://cdn.discordapp.com/attachments/747679713954103328/747679824247652452/20200821_212232.png', 'https://discord.gg/CFb6XKh')
                .setTimestamp()
                .setFooter('Mr Fluffycloud ™ #3172', 'https://cdn.discordapp.com/attachments/747679713954103328/747679860213940254/20200821_120453.jpg');
            message.author.send(embed);

            talkedRecently.add(message.author.id);
        }
        setTimeout(() => {
            // Removes the user from the set after a minute
            talkedRecently.delete(message.author.id);
        }, 5000);
    }
}