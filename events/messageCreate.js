module.exports = (client,message) =>{
    if (message.author.bot) return;
    if (!message.content.startsWith(client.prefix)) return;
    let command = message.content.split(" ")[0].slice(client.prefix.length);
    let params = message.content.split(" ").slice(1);
    let cmd;
    if (client.commands.has(command)) {
        cmd = client.commands.get(command);
    } else if (client.aliases.has(command)) {
        cmd = client.commands.get(client.aliases.get(command));
    }
    if (cmd) {
        if(cmd.conf.enabled == false) return message.channel.send("Komut Kullanıma Kapalı.");
        cmd.run(client, message, params);
    }
};