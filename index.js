const Discord = require("discord.js");
const client = new Discord.Client({intents:32767});
const fs = require("fs");
const config = require("./config.json");

const colors = require("./util/log.js");
const log = (message,color) =>  colors.log(message,color);
const betterLog = (message) =>  colors.betterLog(message);

const {JsonDatabase} = require("wio.db");
const db = new JsonDatabase({
  databasePath:"./database.json"
});

client.prefix = config.prefix;
client.owners = config.owners;

client.on("ready", () => {
    log("Başarıyla Açıldım.","cyan")
});

client.on("messageCreate", (message) =>{
    require("./events/messageCreate.js")(client, message);
});


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
  
   if (err) console.error(err);
   log("┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓","yellow");
   files.forEach(fs => {
     let props = require(`./commands/${fs}`);
     let bosluk = "";
     let msg = `${fs.replace(".js", "").slice(0, 15)} // Yüklendi`
     for (let i=msg.length; i< 27; i++){

          bosluk += " ";
     }
     betterLog(`@yellow┃ ${fs.replace(".js", "").slice(0, 15)}.js @cyan// @greenYüklendi ${bosluk}@yellow┃`);
     client.commands.set(props.conf.name, props);
     props.conf.aliases.forEach(alias => {
       client.aliases.set(alias, props.conf.name);
     });
    });
    log("┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛","yellow");
 });
 client.reload = (name,command) => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(name);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(name, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.conf.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.login(config.token);