
const Profile = require("../model/user.model.js");
const cloudinary = require("../config/cloudinary.js");

const saveDraft = async (req, res) => {
  try {
    const { profileId, ...fields } = req.body;

    let profile;
    if (profileId) {
      profile = await Profile.findByIdAndUpdate(
        profileId,
        { $set: { ...fields, status: 'draft' } },
        { new: true, upsert: false }
      );

      if (!profile) {
        profile = await Profile.create({ ...fields, status: 'draft' });
      }
    } else {
      profile = await Profile.create({ ...fields, status: 'draft' });
    }

    res.status(200).json({ success: true, profileId: profile._id, profile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Something went wrong', error: error.message });
  }
};

const createProfile = async (req, res) => {
  try {
    const { profileId, ...fields } = req.body;

    // Cloudinary gives us the secure URL and public_id directly on each file
    const photoPaths = req.files
      ? req.files.map(file => ({
          url:       file.path,          // secure Cloudinary URL
          public_id: file.filename,      // Cloudinary public_id (for deletion later)
        }))
      : [];

    let profile;
    if (profileId) {
      // If replacing photos, delete old ones from Cloudinary first
      const existing = await Profile.findById(profileId);
      if (existing?.photos?.length && photoPaths.length) {
        const deletePromises = existing.photos.map(p =>
          cloudinary.uploader.destroy(p.public_id)
        );
        await Promise.all(deletePromises);
      }

      profile = await Profile.findByIdAndUpdate(
        profileId,
        { $set: { ...fields, ...(photoPaths.length && { photos: photoPaths }), status: 'completed' } },
        { new: true }
      );

      if (!profile) {
        profile = await Profile.create({ ...fields, photos: photoPaths, status: 'completed' });
      }
    } else {
      profile = await Profile.create({ ...fields, photos: photoPaths, status: 'completed' });
    }

    res.status(201).json({ message: 'Profile created successfully', profile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

module.exports = { createProfile, saveDraft };