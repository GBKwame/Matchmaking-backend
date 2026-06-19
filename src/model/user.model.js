const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
  {
    firstName: String,
    email: String,
    phoneNumber: String,
    gender: String,
    residence: String,
    age: String,
    city: String,
    nationality: String,
    occupation: String,
    education: String,
    religion: String,
    children: String,
    wantChildren: String,
    smoking_drinking: String,
    language: String,
    personalities: String,
    hobbies: String,
    passion: String,
    relationship_values: String,
    relationship_goals: String,
    prefrence_age_range: String,
    prefrence_location: String,
    open_to_long_distance: String,
    desired_quality_in_a_partner: String,
    dealbreakers: String,
    photos: [String],
    status:String
  },
  { timestamps: true }
);

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;