const router = require('express').Router();
const Celebrity = require('../models/Celebrity.model');

// celebrities create route
router.get('/create', (req, res, next) => {
  res.render('celebrities/new-celebrity');
});

router.post('/create', async (req, res, next) => {
  const { name, occupation, catchphrase } = req.body;

  console.log(req.body);
  try {
    const createdCelebrity = await Celebrity.create({
      name,
      occupation,
      catchphrase,
    });
    res.redirect('/celebrities');
  } catch (error) {
    res.render('celebrities/new-celebrity');
  }
});

router.get('/', async (req, res, next) => {
  try {
    const allCelebrities = await Celebrity.find();
    res.render('celebrities/celebrities', { foundCelebs: allCelebrities });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
