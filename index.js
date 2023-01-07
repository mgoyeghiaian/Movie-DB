const Joi = require("joi");
const mongoose = require("mongoose")
const express = require("express");
require('dotenv/config');
const app = express();
const bodyParser = require("body-parser")
app.use(express.json());
const port = 3000;
const MoviesRoute = require("./routes/Movies")
app.use(bodyParser.json())
app.use('/movies', MoviesRoute)
function validateMovie(movie) {
  const schema = {
    title: Joi.string().required(),
    year: Joi.number().integer().min(1888),
  }
  return Joi.validate(movie, schema);
}

const movies = [
  { id: 1, title: 'Jaws', year: 1975, rating: 8 },
  { id: 2, title: 'Avatar', year: 2009, rating: 7.8 },
  { id: 3, title: 'Brazil', year: 1985, rating: 8 },
  { id: 4, title: 'الإرهاب والكباب', year: 1992, rating: 6.2 }
];

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
  const id = parseInt(req.params.id);
  const movie = movies.find((m) => m.id === id);
  if (movie) {
    res.json({ status: 200, data: movie });
  } else {
    res.status(404).json({ status: 404, error: true, message: `the movie ${id} does not exist` });
  }
});

app.post('/movies/add', (req, res) => {

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

app.delete(`/movies/delete/:id`, (req, res) => {
  const id = parseInt(req.params.id);
  const movie = movies.find((x) => x.id === id);
  if (!movie) return res.status(404).json({ status: 404, error: true, message: `the movie ${id} dose not exist.` });

  const index = movies.indexOf(movie);

  movies.splice(index, 1);
  res.json({ status: 200, data: movies });

});


app.put(`/movies/update/:id`, (req, res) => {
  const id = parseInt(req.params.id);
  const movie = movies.find((x) => x.id === id);
  if (!movie) return res.status(404).json({ status: 404, error: true, message: `the movie ${id} dose not exist.` });

  const { error } = validateMovie(req.query)
  if (error) return res.status(403).json({ status: 403, error: true, message: error.details[0].message })

  movie.title = req.query.title;
  movie.year = req.query.year;
  movie.rating = req.query.rating || 4;
  res.json({ status: 200, data: movies })
});

app.post(`/movies/create`, (req, res) => {
  res.json({ status: 200, message: "create ok" })
});


app.get(`/movies/:id`, (req, res) => {

  const id = parseInt(req.params.id, 10);
  const movieId = movies.findIndex((x) => x.id === id);
  if (movieId !== -1) {
    const movie = movies[movieId];
    if (req.query.title) {
      movie.title = req.query.title;
    }
    if (req.query.rating) {
      movie.rating = req.query.rating;
    }
    if (req.query.year) {
      movie.year = req.query.year;
    }
    res.json({ status: 200, data: movies });
  } else {
    res.status(404).json({ status: 404, error: true, message: `the movie ${id} does not exist` });
  }
});


mongoose.set('strictQuery', true);

mongoose
  .connect(process.env.DB_con)
  .then(() => console.log("DB Connected...."))
  .catch(err => console.log(err),);


app.listen(port, () => {
  console.log(`Server Listening on port ${port}...`)
});