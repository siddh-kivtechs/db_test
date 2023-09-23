// In src/index.js
const express = require("express");
const { v4: uuidv4 } = require('uuid');

const uuid = uuidv4();
const app = express();
const PORT = process.env.PORT || 3000;

// *** REMOVE ***
app.get("/", (req, res) => {
  let data={};
    data['latitude'] = req.headers['x-vercel-ip-latitude'];
  data['longitude'] = req.headers['x-vercel-ip-longitude'];
  data['location'] = req.headers['x-vercel-ip-city'] + ',' + req.headers['x-vercel-ip-country-region'] + ',' + req.headers['x-vercel-ip-country'];
  data['ip_address'] = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  data['uuid']=uuid;
  res.send(data);
});


app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
