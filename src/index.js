// In src/index.js
const express = require("express");


const app = express();
const PORT = process.env.PORT || 3000;

// *** REMOVE ***
app.get("/", (req, res) => {
  let data={};
  
  res.send(data);
});


app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
