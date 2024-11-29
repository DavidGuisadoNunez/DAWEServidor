import express from 'express';

const router = express.Router();

router.get('/dog', function (req, res) {
  res.status(200).json({ grow: 'guau guau' });
});

router.get('/cat', function (req, res) {
  res.status(200).json({ grow: 'miau' });
});

router.get('/bird', function (req, res) {
  res.status(200).json({ grow: 'pio pio' });
});

export default router;