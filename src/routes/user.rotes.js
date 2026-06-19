const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload.js')

const { createProfile, saveDraft } = require('../controller/profile.controller.js')

router.post('/create_profile', upload.array('photos', 6), createProfile)
router.post('/save_draft', saveDraft)

module.exports = router;