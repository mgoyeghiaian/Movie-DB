const express = require("express")
const app = express();
const port = 3000;

app.get("/test", (req, res) => {
  res.json({ status: 200, message: 'ok' });
});

app.get("/time", (req, res) => {
  const date = new Date();

  res.json({
    status: 200, message: date.toLocaleTimeString(),
  });
});

app.listen(port, () => {
  console.log(`Server Listening on port ${port}`)
});