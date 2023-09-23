const express = require("express");
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

const logs = []; // Array to store visitor logs

app.get("/", (req, res) => {
  const log = {
    latitude: req.headers['x-vercel-ip-latitude'],
    longitude: req.headers['x-vercel-ip-longitude'],
    location: req.headers['x-vercel-ip-city'] + ',' + req.headers['x-vercel-ip-country-region'] + ',' + req.headers['x-vercel-ip-country'],
    ip_address: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    uuid: uuidv4()
  };

  logs.push(log); // Add the log to the array

  res.send(log);
});

app.get("/logs", (req, res) => {
  res.send(logs);
});

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
