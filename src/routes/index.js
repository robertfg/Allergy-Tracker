/*  **********  REQUIREMENTS  **********  */
const router = require('express').Router();

// This sets up a simple router: you'll go to localhost:2907/blog; was app.use in src/server.js
router.use('/about', (req, res, next) => {
  res.end("This is the about page.");
});

router.use('/blog', (req, res, next) => {
  res.end("This is my first blog post.");
});

router.use('/faqs', (req, res, next) => {
  res.end("This is the FAQs page.");
});

/*  **********  CRUD OPERATIONS  **********  */
/**
 * C - reate
 */
router.post('/file', function(req, res, next) {
  res.end('Create a new file');
});
/**
 * R - ead
 */
router.get('/file/:fileId', function(req, res, next) {
  res.end(`Reading file '${req.params.fileId}'`);
});
/**
 * U - pdate
 */
router.put('/file/:fileId', function(req, res, next) {
  res.end(`Updating file '${req.params.fileId}'`);
});
/**
 * D - elete
 */
router.delete('/file/:fileId', function(req, res, next) {
  res.end(`Deleting file '${req.params.fileId}'`);
});
/**
 * ¯\_(ツ)_/¯ - list
 */
router.get('/file', function(req, res, next) {
  res.end('List all files');
});

/*  **********  EXPORTS **********  */
module.exports = router;
