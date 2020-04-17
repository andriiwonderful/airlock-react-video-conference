const express = require('express');
const app = express();
const path = require('path');
const AccessToken = require('twilio').jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;
const {Pool, Client} = require('pg')

require('dotenv').config();

const MAX_ALLOWED_SESSION_DURATION = 14400;
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioApiKeySID = process.env.TWILIO_API_KEY_SID;
const twilioApiKeySecret = process.env.TWILIO_API_KEY_SECRET;

const dbHost = process.env.POSTGRES_HOST;
const dbPort = process.env.POSTGRES_PORT;
const dbUsername = process.env.POSTGRES_USERNAME;
const dbPassword = process.env.POSTGRES_PASSWORD;
const dbName = process.env.POSTGRES_DBNAME;
const connectionString = `postgresql://${dbUsername}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;

app.use(express.static(path.join(__dirname, 'build')));

app.get('/token', (req, res) => {
  const { accessCode } = req.query;
  const client = new Client({
    connectionString : connectionString
  })
  client.connect()
  const queryString = `SELECT * FROM users where accesscode = '${accessCode}'`;
  client.query(queryString).then(queryRes => {
    if(queryRes.rowCount === 0)
    {
      console.log('no result found!')
      res.status(404).send("Not found");
      return;
    }
    const user = queryRes.rows[0];
    const {username, roomname} = user;
    const token = new AccessToken(twilioAccountSid, twilioApiKeySID, twilioApiKeySecret, {
      ttl: MAX_ALLOWED_SESSION_DURATION,
    });
    const videoGrant = new VideoGrant({ room: roomname });
    token.identity = username;
    token.addGrant(videoGrant);
    res.send(token.toJwt());
  }).catch(err => {
    res.status(404).send("Not found");
    console.log(err)
  }).finally(() => {
    console.log("end")
    client.end()
  })
});

app.get('*', (_, res) => res.sendFile(path.join(__dirname, 'build/index.html')));

app.listen(8081, () => console.log('token server running on 8081'));
