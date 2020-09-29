const talkedRecently = new Set();
module.exports = {
    name: 'FILL IN',
    description: 'INVULLEN',
    execute(message, args, client, logChannel) {
        let options = message.content.split(/ +/);
        if (options[1] == 'help') {
            message.channel.send({
                embed: {
                    color: 6945791,
                    title: 'Command v!level',
                    description: '**Description:** Explains how our current xp system works\n**Cooldown:** 5 sec\n**Usage:** v!level',
                    timestamp: new Date(),
                    footer: {
                        text: "Mr Fluffycloud ™"
                    }

                }
            })
        } else if (talkedRecently.has(message.author.id)) {
            message.reply(`<a:Circlestop:755438946518827009> **Man chill out!** <a:Circlestop:755438946518827009>`)
        } else {



            talkedRecently.add(message.author.id);
        }
        setTimeout(() => {
            // Removes the user from the set after a minute
            talkedRecently.delete(message.author.id);
        }, 5000);
    }
}