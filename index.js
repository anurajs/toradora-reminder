import { Client } from 'discord.js';
import { scheduleJob } from 'node-schedule';
import 'dotenv/config';

const client = new Client();
client.once('ready', async () => {
  console.log('Logged in');
  const channelId = process.env.CHANNEL_ID;
  const channel = client.channels.cache.get(`${channelId}`);

  console.log(channel.toJSON());

  const j = scheduleJob('50 17 6-31 12 *', () => {
    channel.send(`${process.env.ROLE_ID} We start in 10 mins`);
    if (new Date().getDate() == 31) {
      channel.send(`Watching Special Episode}`);
    } else {
      channel.send(`Watching episode ${new Date().getDate() - 5}`);
    }
  });
  const j2 = scheduleJob('00 17 6-31 12 *', () => {
    const user = client.users.cache.get(process.env.MAJORS_ID);
    user.send('Toradora in an hour baby');
  });
  console.log(j.nextInvocation());
  console.log(j2.nextInvocation());
});

client.login(process.env.LOGIN_TOKEN);
