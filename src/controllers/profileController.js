const User = require('../models/User');

const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id);

  const base64Image = user.profilePicture.data?.toString('base64');
  const base64Url = `data:${user.profilePicture.contentType};base64,${base64Image}`

  res.json({...user, profilePicture: base64Url});
};

const updateProfile = async (req, res) => {
  const name = req.body.name ? req.body.name : "";
  const email = req.body.email ? req.body.email : "";
  const bio = req.body.bio ? req.body.bio : "";
  const lastLogin = req.body.lastLogin ? req.body.lastLogin : "";

  const data = {
    name,
    email,
    bio,
    lastLogin,
    profilePicture: req.file
          ? {
              data: req.file.buffer,
              contentType: req.file.mimetype,
            }
          : "",
  }

  const user = await User.findByIdAndUpdate(req.user.id, data, { new: true });
  res.json(user);
};

module.exports = { getProfile, updateProfile };
