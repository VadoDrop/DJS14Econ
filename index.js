const {Client, GatewayIntentBits, ActivityType, EmbedBuilder, Embed}=require('discord.js')
const fs = require('fs')
const {Prefix, Token } = require('./config.json')
const client = new Client({intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
]})
//npm install discord.js
//npm install fs

//Starting the bot
client.on('ready', ()=> {
    console.log(`${client.user.tag} Is Up And Running`)
    client.user.setPresence({activities: [{name: "Bot", type: ActivityType.Playing}]})
})
//Creating Commands
client.on('messageCreate', message => {
    if (message.content.startsWith(Prefix)){
        let args = message.content.substring(Prefix.length).toLowerCase().split(" ")
        if (args[0] == "help"){
            message.channel.send('Help Command')
            return
        }
        if (args[0] == "gen"){
            let account = args[1]
            
            if (!account){
                message.channel.send('please input an account to generate')
                return
            }
            if (["disney", "nordvpn","minecraft"].includes(account)){
                let db = JSON.parse(fs.readFileSync('accounts.json'))
                let em = new EmbedBuilder()
                //let Arraylist = db[account].list.length()
                let numArray = Array.from({length: db[account].list.length}, (_,i) => i=i)
                let Num100 = Math.floor(Math.random() * (db[account].list.length))
                let Total = Num100
                let em2 = new EmbedBuilder()
                em2.setTitle('**Account generated seccessfully!**')
                em2.setDescription(`Check your private <@${message.author.id}>! If you do not recieved the message, please unlock your private!`)
                em2.setFooter({text: `${message.author.tag}`})
                em2.setColor(`Random`)
                em2.setTimestamp()
                em.setTitle('**Account Generated**')
                em.setColor(`Random`)
                em.addFields({name: `Service`, value: "```"+`${account}`+"```", inline:true})
                em.addFields({name: `Account`, value: "```" + `${db[account].list[Total]}` + "```", inline:true})
                message.channel.send({embeds: [em2]})
                message.author.send({embeds: [em]})
                return
            }
        }
    }
})

client.login(Token)
