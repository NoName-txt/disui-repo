const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
 
exports.run = (client, message, args) => {
   if(!client.owners.includes(message.author.id)) return;
    try {
        var code = args.join(" ");
        var evaled = eval(code);
 
        if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled);
            
            let Embed = new Discord.MessageEmbed()
                .addFields(
                    { name: '**Input:**', value: `\`\`\`js\n${code}\`\`\``, inline: false },
                    { name: '**Output:**', value: `\`\`\`js\n${evaled}\`\`\``, inline: false }
                )

            return message.channel.send({embeds:[Embed]})
    } catch (err) {
      message.channel.send(`\`Error\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
    function clean(text) {
        if (typeof(text) === "string")
            return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else
            return text;
    }
};
 
exports.conf = {
  enabled: true,
  name: "eval",
  aliases: [],
};