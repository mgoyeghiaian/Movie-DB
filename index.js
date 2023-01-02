const express = require("express")
const app = express();
const port = 3000;

const movies = [
  { title: 'Jaws', year: 1975, rating: 8 },
  { title: 'Avatar', year: 2009, rating: 7.8 },
  { title: 'Brazil', year: 1985, rating: 8 },
  { title: 'الإرهاب والكباب', year: 1992, rating: 6.2 }
]
app.get("/test", (req, res) => {
  res.json({ status: 200, message: 'ok' });
});

app.get("/time", (req, res) => {
  const date = new Date();

  res.json({
    status: 200, message: date.toLocaleTimeString(),
  });
});

app.get(`/hello/:id`, (req, res) => {
  const id = req.params.id;
  res.json({ status: 200, message: `Hello, ${id}` })
});

app.get(`/search`, (req, res) => {
  const search = req.query.s;
  if (search) {
    res.json({ status: 200, message: "ok", data: search })
  }

  else {
    res.status(500).json({ status: 500, error: true, message: "you have to provide a search" })
  }

});

app.post(`/movies/create`, (req, res) => {
  res.json({ status: 200, message: "create ok" })
});

app.get(`/movies/read`, (req, res) => {
  res.json({ status: 200, data: movies });
});
app.put(`/movies/update`, (req, res) => {
  res.json({ status: 200, message: "update ok" });

});
app.delete(`/movies/delete`, (req, res) => {
  res.json({ status: 200, message: "delete ok" });

});

app.post(`/movies/add`, (req, res) => {
  res.json({ status: 200, message: "add ok" })


});
app.get(`/movies/get`, (req, res) => {
  res.json({ status: 200, message: "get ok" })


});
app.put(`/movies/edit`, (req, res) => {

});


app.listen(port, () => {
  console.log(`Server Listening on port ${port}`)
});