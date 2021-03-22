import * as discord from 'discord.js';
import * as dotenv from 'dotenv';
import * as msganalyzer from './message_analyzer';

const client = new discord.Client();

msganalyzer.config();
dotenv.config();

client.once('ready', () => {
    console.log(client.user.username + ' is online!');
});

client.on('message', (message) => {
    // ignoruj správy od botov a adminov
    if (!message.author.bot && !message.member.hasPermission('ADMINISTRATOR')) {
        // prečítaj obsah spravy a skontroluj, či autor bol oboznamený
        msganalyzer.read(message.content, message.author.tag.split('#')[1])
        .then((response) => {
            // ak sa v správe nachádza keyword, odpíš autorovi s odkazom na potenciálnu odpoveď k dotazu
            if (response) {
                message.channel.send('Ahoj ' + message.author.toString() + ', ' + response + '.');
            }
        });
    }
});

client.login(process.env.BOT_TOKEN);
