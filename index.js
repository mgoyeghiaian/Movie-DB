const Joi = require("joi");
const express = require("express");
const app = express();
app.use(express.json());
const port = 3000;

const movies = [
  { id: 1, title: 'Jaws', year: 1975, rating: 8 },
  { id: 2, title: 'Avatar', year: 2009, rating: 7.8 },
  { id: 3, title: 'Brazil', year: 1985, rating: 8 },
  { id: 4, title: 'الإرهاب والكباب', year: 1992, rating: 6.2 }
];


function validateMovie(movie) {
  const schema = {
    title: Joi.string().required(),
    year: Joi.number().integer().min(1888),
  }
  return Joi.validate(movie, schema);
}


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


app.get(`/movies`, (req, res) => {
  res.json({ status: 200, data: movies });
});

app.get('/movies/by-date', (req, res) => {
  const sortedMovies = movies.sort((a, b) => {
    return new Date(a.year) - new Date(b.year);
  });
  res.json({ status: 200, data: sortedMovies });
});

app.get('/movies/by-rating', (req, res) => {
  const sortedMovies = movies.sort((a, b) => {
    return b.rating - a.rating;
  });
  res.json({ status: 200, data: sortedMovies });
});

app.get('/movies/by-title', (req, res) => {
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

app.get('/movies/id/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const movie = movies.find((m) => m.id === id);
  if (movie) {
    res.json({ status: 200, data: movie });
  } else {
    res.status(404).json({ status: 404, error: true, message: `the movie ${id} does not exist` });
  }
});

app.post('/movies', (req, res) => {

  const { error } = validateMovie(req.query)
  if (error) return res.status(403).json({ status: 403, error: true, message: error.details[0].message })


  const NewData = {
    id: movies.length + 1,
    title: req.query.title,
    year: req.query.year,
    rating: req.query.rating || 4,
  }
  movies.push(NewData)
  res.json({ status: 200, data: movies });

});


app.delete(`/movies/:id`, (req, res) => {
  const id = parseInt(req.params.id);
  const movie = movies.find((x) => x.id === id);
  if (!movie) return res.status(404).json({ status: 404, error: true, message: `the movie ${id} dose not exist.` });

  const index = movies.indexOf(movie);

  movies.splice(index, 1);
  res.json({ status: 200, data: movies });

});


app.put(`/movies/:id`, (req, res) => {
  const id = parseInt(req.params.id);
  const movie = movies.find((x) => x.id === id);
  if (!movie) return res.status(404).json({ status: 404, error: true, message: `the movie ${id} dose not exist.` });

  const { error } = validateMovie(req.query)
  if (error) {
    res.status(403).json({ status: 403, error: true, message: error.details[0].message })
    return;
  }
  movie.title = req.query.title;
  movie.year = req.query.year;
  movie.rating = req.query.rating || 4;
  res.json({ status: 200, data: movies })
});


app.listen(port, () => {
  console.log(`Server Listening on port ${port}...`)
});