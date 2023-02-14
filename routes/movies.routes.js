const router = require('express').Router();
const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');

router.get('/create', async (req, res, next) => {
  const allCelebrities = await Celebrity.find();
  res.render('movies/new-movie', { allCelebrities });
});

router.post('/create', async (req, res, next) => {
  const { title, genre, plot, cast } = req.body;

  console.log(req.body);
  try {
    const createdMovie = await Movie.create({
      title,
      genre,
      plot,
      cast,
    });
    res.redirect('/movies');
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const allMovies = await Movie.find();
    res.render('movies/movies', { foundMovies: allMovies });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const movieDetails = await Movie.findOne({ _id: req.params.id }).populate(
      'cast'
    );
    res.render('movies/movie-details', { movieDetails });
    //res.send({ movieDetails });
  } catch (error) {
    next(error);
  }
});

router.post('/:id/delete', async (req, res, next) => {
  try {
    console.log(req.params.id);
    const result = await Movie.findByIdAndDelete(req.params.id);
    res.redirect('/movies');
  } catch (error) {
    next(error);
  }
});

router.get('/:id/edit', async (req, res, next) => {
  try {
    const id = req.params.id;
    const movieDetails = await Movie.findOne({ _id: id });
    const celebrities = await Celebrity.find();
    res.render('movies/edit-movie', { movieDetails, celebrities });
    // res.send({ udpateMovie, castCelebs });
  } catch (error) {
    next(error);
  }
});

router.post('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const { title, genre, plot } = req.body;
    const updateQuery = {
      title: title,
      genre: genre,
      plot: plot,
    };

    const udpateMovie = await Movie.findByIdAndUpdate(id, updateQuery);

    console.log(udpateMovie);

    res.redirect('/movies/' + id);
  } catch (error) {}
});

module.exports = router;
