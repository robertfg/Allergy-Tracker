/*  **********  REQUIREMENTS  **********  */
const router   = require('express').Router();


/*  **********  ROUTES  **********  */

// GET /
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Home' });
});

// GET /about
router.get('/about', (req, res, next) => {
  res.render('about', { title: 'About' });
});

// GET /contact
router.get('/contact', (req, res, next) => {
  res.render('contact', { title: 'Contact' });
});

// GET /faqs
router.get('/faqs', (req, res, next) => {
  res.render('faqs', { title: 'FAQs' });
});

// GET /resources
router.get('/resources', (req, res, next) => {
  res.render('resources', { title: 'Resources' });
});


/*  **********  EXPORTS **********  */
module.exports = router;
