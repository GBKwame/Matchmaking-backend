
const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload.js')

const { getAllProfiles, deleteProfile } = require('../controller/admin.controller.js')

router.get('/all_profiles', getAllProfiles)
router.delete('/delete_profile/:id', deleteProfile)

module.exports = router;