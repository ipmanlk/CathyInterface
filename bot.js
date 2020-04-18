const timeout = require("connect-timeout");
const express = require("express");
const discord = require("discord.js");
const { Queue } = require("./lib/Queue");
const app = express();
const client = new discord.Client();

/* 
=====================================================================================
                                    CONFIGURATION
=====================================================================================
*/

// Discord server config
const interfaceBotId = ""
const interfaceBotToken = "";
const guildId = "";
const cathyChannelId = "";

// Web server config
const port = 3003;

/* 
=====================================================================================
=====================================================================================
*/

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(timeout("15s"));

// global var for cathy bot channel
let cathyChannel;

// queue for handling multiple requests
let reqQueue = new Queue();

client.on("ready", () => {
    // when discord bot is ready, find cathy channel
    const guild = client.guilds.cache.find(i => i.id == guildId);
    cathyChannel = guild.channels.cache.find(i => i.id == cathyChannelId);
    console.log("Bot is ready!.");
});


client.on("message", msg => {
    // ignore msgs from interface bot
    if (msg.channel.id !== cathyChannel.id || (msg.channel.id == cathyChannel && msg.author.id == interfaceBotId)) {
        return;
    }

    // handle req queue based on cathy responses
    if (msg.channel.id == cathyChannel.id) {
        if (reqQueue.getSize() !== 0) {
            try {
                const resp = msg.content;
                let currentResponse = reqQueue.dequeue();
                currentResponse.json({ response: resp });
            } catch (e) {
            }
        }
    }
});

// endpoint for interactign with the bot
app.get("/interact/:msg", (req, res) => {
    reqQueue.enqueue(res);
    cathyChannel.send(req.params.msg);
});

// discord app login
client.login(interfaceBotToken);

// express server start
app.listen(port, () => console.log(`Web server is ready @ port ${port}!.`));