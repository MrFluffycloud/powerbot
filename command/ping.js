const talkedRecently = new Set();

module.exports = {
    name: 'ping',
    description: 'Sends the ping',
    execute(message, args, client, logChannel) {
        let options = message.content.split(/ +/);
        if (options[1] == 'help') {
            message.channel.send({
                embed: {
                    color: 6945791,
                    title: 'Ping',
                    description: '**Description:** Checks the ping and uptime of the bot \n**Cooldown:** 5 sec\n**Usage:** f!ping',
                    timestamp: new Date(),
                    footer: {
                        text: "Mr Fluffycloud ™",
                        icon_url: "https://cdn.discordapp.com/attachments/747679713954103328/747679860213940254/20200821_120453.jpg"
                    }

                }
            })
        } else if (talkedRecently.has(message.author.id)) {
            message.reply("Please wait 5 seconds before using this command again!")
        } else {
            async function pinging() {
				let botMsg = await message.channel.send("<a:BlackPing:755303127590371419> Pinging")

				botMsg.edit({
					embed: {
						title: "<a:WhitePing:755303127426662421> Ping!",
						description: [
							"**Server**: `" + (botMsg.createdAt - message.createdAt) + " ms`",
							"**API**: `" + Math.round(client.ws.ping) + " ms`",
							"**Uptime**: `" + msToTime(client.uptime) + "`"
						].join("\n"),
						color: 1752220,
						footer: {
							text: "Requested by " + message.author.tag,
							icon_url: message.author.displayAvatarURL
						},
						timestamp: new Date()
					}
				}).catch(() => botMsg.edit("<a:RedCross:755307418841383013> An unknown error occurred. Do I have permission? (Embed Links)"));
			

			function msToTime(ms) {
				let days = Math.floor(ms / 86400000); // 24*60*60*1000
				let daysms = ms % 86400000; // 24*60*60*1000
				let hours = Math.floor(daysms / 3600000); // 60*60*1000
				let hoursms = ms % 3600000; // 60*60*1000
				let minutes = Math.floor(hoursms / 60000); // 60*1000
				let minutesms = ms % 60000; // 60*1000
				let sec = Math.floor(minutesms / 1000);

				let str = "";
				if (days) str = str + days + "d";
				if (hours) str = str + hours + "h";
				if (minutes) str = str + minutes + "m";
				if (sec) str = str + sec + "s";

				return str;
			}
			
            }
          pinging();

            talkedRecently.add(message.author.id);
        }
        setTimeout(() => {
            // Removes the user from the set after a minute
            talkedRecently.delete(message.author.id);
        }, 5000);
    }
}