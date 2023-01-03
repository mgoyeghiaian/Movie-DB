const express = require("express")
const app = express();
const port = 3000;

const movies = [
  { id: 1, title: 'Jaws', year: 1975, rating: 8 },
  { id: 2, title: 'Avatar', year: 2009, rating: 7.8 },
  { id: 3, title: 'Brazil', year: 1985, rating: 8 },
  { id: 4, title: 'الإرهاب والكباب', year: 1992, rating: 6.2 }
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

app.get(`/movies/read`, (req, res) => {
  res.json({ status: 200, data: movies });
});

app.get('/movies/read/by-date', (req, res) => {
  const sortedMovies = movies.sort((a, b) => {
    return new Date(a.year) - new Date(b.year);
  });
  res.json({ status: 200, data: sortedMovies });
});

app.get('/movies/read/by-rating', (req, res) => {
  const sortedMovies = movies.sort((a, b) => {
    return b.rating - a.rating;
  });
  res.json({ status: 200, data: sortedMovies });
});

app.get('/movies/read/by-title', (req, res) => {
  const sortedMovies = movies.sort((a, b) => {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  });
  res.json({ status: 200, data: sortedMovies });
});

app.get('/movies/read/id/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const movie = movies.find((m) => m.id === id);
  if (movie) {
    res.json({ status: 200, data: movie });
  } else {
    res.status(404).json({ status: 404, error: true, message: `the movie ${id} does not exist` });
  }
});


app.post(`/movies/create`, (req, res) => {
  res.json({ status: 200, message: "create ok" })
});


app.put(`/movies/update`, (req, res) => {
  res.json({ status: 200, message: "update ok" });

});
app.delete(`/movies/delete`, (req, res) => {
  res.json({ status: 200, message: "delete ok" });

});

app.get('/movies/add', (req, res) => {
  const title = req.query.title;
  const year = req.query.year;
  const rating = req.query.rating || 4;
  if (!title || !year || year.length < 4) {
    res.status(403).send({ status: 403, error: true, message: 'you cannot create a movie without providing a title and a year' })
  }
  const NewData = { title, year, rating };
  movies.push(NewData)
  res.json({ status: 200, data: movies });
})

app.get(`/movies/get`, (req, res) => {
  res.json({ status: 200, message: "get ok" })


});
app.put(`/movies/edit`, (req, res) => {

});


app.listen(port, () => {
  console.log(`Server Listening on port ${port}`)
});