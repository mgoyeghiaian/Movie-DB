const express = require("express");
const router = express.Router();
const Movies = require('../models/movies');

const movies = [
  { id: 1, title: 'Jaws', year: 1975, rating: 8 },
  { id: 2, title: 'Avatar', year: 2009, rating: 7.8 },
  { id: 3, title: 'Brazil', year: 1985, rating: 8 },
  { id: 4, title: 'الإرهاب والكباب', year: 1992, rating: 6.2 }
];

//to get movies from db
router.get("/", async (req, res) => {
  try {
    const Gmovies = await Movies.find();
    res.json({ status: 200, Message: Gmovies })
  } catch (err) {
    res.json({ message: err })
  }

})

//get Movies By Id from db
router.get('/id/:id', async (req, res) => {
  try {
    const Nmovies = await Movies.find({ id: req.params.id });
    res.json({ status: 200, Message: Nmovies })
  } catch (err) {
    res.json({ message: err })
  }
});

//add Movies In db
router.post('/', async (req, res) => {
  movies.forEach(movie => {
    const Nmovies = new Movies(movie);
    Nmovies.save()
  });
  const Nmovies = new Movies({
    id: movies.length + 1,
    title: req.query.title,
    year: req.query.year,
    rating: req.query.rating || 4
  });
  try {
    const savedMovies = await Nmovies.save();
    res.json({ status: 200, Message: savedMovies })
  } catch (err) {
    res.json({ message: err })
  }
})

//delete Movies From Db
router.delete('/:Id', async (req, res) => {
  const id = req.params.Id;
  try {
    await Movies.remove({ id: id })
    res.json({ status: 200, Message: `${id} Deleted` })
  } catch (err) {
    res.json({ message: err })
  }
})

// Update Movies From Db

router.put(`/:Id`, async (req, res) => {
  const id = req.params.Id;
  try {
    await Movies.updateOne(
      { id: id },
      {
        $set: {
          title: req.query.title,
          year: req.query.year,
          rating: req.query.rating
        }
      }
    );
    res.json({ status: 200, Message: `${id} Updated` })
  } catch (err) {
    res.json({ message: err })
  }
})


module.exports = router;