const express = require("express")
const app = express();
const port = 3000;

app.all("/", (req, res) => {
  res.send('OK');
});

app.listen(port, () => {
  console.log(`Server Listening on port 3000`)
});