const express = require("express");
const { v4: uuidv4 } = require('uuid');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3000;

const supabaseUrl = 'https://jdpqxxbxbebmbujrkrne.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.get("/", async (req, res) => {
  const log = {
    latitude: req.headers['x-vercel-ip-latitude'],
    longitude: req.headers['x-vercel-ip-longitude'],
    location: req.headers['x-vercel-ip-city'] + ',' + req.headers['x-vercel-ip-country-region'] + ',' + req.headers['x-vercel-ip-country'],
    ip_address: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    uuid: uuidv4()
  };
// Insert the log into the 'logs' table
  const { data, error } = await supabase.from('logs').insert([log]); 

  if (error) {
    console.error('Error inserting log:', error);
    res.status(500).send('Error inserting log');
  } else {
    console.log('Log inserted successfully:', data);
    res.send(log);
  }
});

app.get("/logs", async (req, res) => {
  const { data, error } = await supabase.from('logs').select(); // Retrieve all logs from the 'logs' table

  if (error) {
    console.error('Error retrieving logs:', error);
    res.status(500).send('Error retrieving logs');
  } else {
    console.log('Logs retrieved successfully:', data);
    res.send(data);
  }
});

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
