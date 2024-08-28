const QR = require('../models/QR');
const errorHandler = require('../utils/errorHandler');

module.exports.getQrCodes = async function(req, res) {
  try {
    const qrCodes = await QR.find({user: req.user.id})
    res.status(200).json(qrCodes)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.addNewQrCodes = async function (req, res) {
  try {
    const qrCodesArray = req.body;
    
    if (!Array.isArray(qrCodesArray)) {
      return res.status(400).json({ message: 'Invalid data format. Expected an array of QR codes.' });
    }

    const sortedQrCodes = qrCodesArray.sort((a, b) => a.order - b.order);

    const savedQrCodes = await Promise.all(
      sortedQrCodes.map(async (qrCode) => {
        return new QR({
          url: qrCode.url,
          qr: qrCode.qr,
          title: qrCode.title,
          order: qrCode.order
        }).save();
      })
    );

    res.status(201).json(savedQrCodes);
  } catch (err) {
    errorHandler(res, err)
  }
}

module.exports.removeQrCode = async function(req, res) {
  try {
    await QR.remove({ _id: req.params.id })
    console.log(req.params);
    res.status(200).json({
      message: 'QR code has been deleted.'
    })
  } catch (err) {
    errorHandler(res, err)
  }
}