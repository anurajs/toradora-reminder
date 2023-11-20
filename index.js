import { Client } from 'discord.js';
import { scheduleJob } from 'node-schedule';
import 'dotenv/config';
import http from 'http';

const port = process.env.PORT;
const host = process.env.HOST;

http
  .createServer((req, res) => {
    res.write('ALIVE');
    res.end();
  })
  .listen(port);

const client = new Client({
  intents: ['GuildMembers', 'DirectMessages', 'Guilds']
});
client.once('ready', async () => {
  console.log('Logged in');
  const channelId = process.env.CHANNEL_ID;
  const channel = await client.channels.fetch(channelId);

  console.log(channel.toJSON());

  const roleId = process.env.ROLE_ID;
  const guildId = process.env.GUILD_ID;

  const guild = await client.guilds.fetch(guildId);
  const role = await guild.roles.fetch(roleId);
  console.log(role);

  const j = scheduleJob('50 17 6-31 12 *', async () => {
    await channel.send(`${role.toString()} We start in 10 mins`);
    if (new Date().getDate() == 31) {
      await channel.send(`Watching Special Episode}`);
    } else {
      await channel.send(`Watching episode ${new Date().getDate() - 5}`);
    }
  });

  const user = await client.users.fetch(process.env.MAJORS_ID);
  console.log(user.toJSON());
  const j2 = scheduleJob('00 17 6-31 12 *', async () => {
    await user.send('Toradora in an hour baby');
  });
  console.log(j.nextInvocation());
  console.log(j2.nextInvocation());
});

client.login(process.env.LOGIN_TOKEN);
