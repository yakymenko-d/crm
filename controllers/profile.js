const Users = require('../models/Users');
const errorHandler = require('../utils/errorHandler');

module.exports.getByUserId = async function(req, res) {
    try {
      const user = await Users.findOne({
        user: req.user.id
      })

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(user);
    } catch (err) {
      errorHandler(res, err)
    }
  }
  

module.exports.update = async function(req, res) {
    try {
      const user = await Users.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
      )

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      res.status(200).json(user)
    } catch (err) {
      errorHandler(res, err)
    }
}