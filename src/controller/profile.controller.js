
const Profile = require("../model/user.model.js");

const saveDraft = async (req, res) => {
  try {
    const { profileId, ...fields } = req.body;

    let profile;
    if (profileId) {
      profile = await Profile.findByIdAndUpdate(
        profileId,
        { $set: { ...fields, status: 'draft' } },
        { returnNewDocument: "after", upsert: false }
      );

      if (!profile) {
        profile = await Profile.create({ ...fields, status: 'draft' });
      }
    } else {
      profile = await Profile.create({ ...fields, status: 'draft' });
    }

    res.status(200).json({ success: true, profileId: profile._id, profile });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Something went wrong', error: error.message });
  }
};

const createProfile = async (req, res) => {
  try {
    const { profileId, ...fields } = req.body;

    const photoPaths = req.files ? req.files.map(file => `/uploads/photos/${file.filename}`) : [];

    let profile;
    if (profileId) {
      profile = await Profile.findByIdAndUpdate(
        profileId,
        { $set: { ...fields, photos: photoPaths, status: 'completed' } },
        { returnNewDocument: "after"}
      );

      if (!profile) {
        profile = await Profile.create({ ...fields, photos: photoPaths, status: 'completed' });
      }
    } else {
      profile = await Profile.create({ ...fields, photos: photoPaths, status: 'completed' });
    }

    res.status(201).json({ message: 'Profile created successfully', profile });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

module.exports = { createProfile, saveDraft };