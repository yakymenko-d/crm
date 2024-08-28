const Settings = require('../models/Settings');
const errorHandler = require('../utils/errorHandler');

module.exports.getSettings = async function(req, res) {
  try {
    const settings = await Settings.find({user: req.user.id})
    res.status(200).json(settings)
  } catch (err) {
    errorHandler(res, err)
  }
}
  

module.exports.create = async function(req, res) {
  try {
    const settings = await new Settings({
      restaurantName: req.body.restaurantName,
      url: req.body.url,
      image: req.body.image
    }).save()
    res.status(201).json(settings)
  } catch (err) {
    errorHandler(res, err)
  }
}


module.exports.update = async function(req, res) {
    try {
      const settings = await Settings.findOneAndUpdate(
        { settingsId: req.params._id },
        { $set: req.body },
        { new: true }
      )
      
      res.status(200).json(settings);
    } catch (err) {
      errorHandler(res, err)
    }
}