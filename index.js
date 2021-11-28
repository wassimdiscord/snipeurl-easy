let config = {
    guild: "", // obligatoire 
    channel: "", // facultatif 
    code: "", // obligatoire 
    timeout: 250 // obligatoire 

}

function snipe(token) {
    const Discord = require("discord.js")
    const c = new Discord.Client()
    const request = require("request")
    const client = c
    c.login(token).then(async () => {


    c.on("ready", async () => {
        console.log("Salut")
        let guild = client.guilds.cache.get(config.guild)
        if (!guild) return console.log("guild introuvable")

        setInterval(async () => {
            await request({
                url: `https://discord.com/api/v8/guilds/${guild.id}/vanity-url`,
                body: {
                    code: config.code
                },
                json: true,
                method: 'PATCH',
                headers: {
                    "Authorization": `Bot ${token}`
                }
            }, (err, res, body) => {
                if (err) {
                    return

                } else if (res) {
                    if (body.code === config.code) {
                    if(channel) client.channels.cache.get(config.channel).send("@everyone " + "discord.gg/" + config.code + " <3 by wassim gamin")

                        console.log(`${new Date()} snipe`)
                    }
                }

            });
        }, config.timeout);
    }).catch(err => {
        console.error(err)
    })


    })
}

snipe("token")

// by wassim 
