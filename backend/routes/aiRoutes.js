const express = require('express');
const router = express.Router();
const { suggestTasks } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

router.post('/suggest', protect, suggestTasks);

module.exports = router;
