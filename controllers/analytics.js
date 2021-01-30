const moment = require('moment');
const Order = require('../models/Order');
const errorHandler = require('../utils/errorHandler');

module.exports.overview = async function(req, res) {
  try {  
    const allOrders = await Order.find({user: req.user.id}).sort({date: 1});
    const ordersMap = getOrdersMap(allOrders);
    const yesterdayOrders = ordersMap[moment().add(-1, 'd').format('DD.MM.YYYY')] || [];

    // Yesterday orders quantity
    const yesterdayOrdersQuantity = yesterdayOrders.length;

    // Orders quantity
    const totalOrders = allOrders.length;

    // Days quantity
    const daysNumber = Object.keys(ordersMap).length;

    // Orders/Day
    const ordersPerDay = (totalOrders / daysNumber).toFixed(0);

    //Ordrers quantity percent (((yesterday orders quantity / orders per day) - 1) * 100)
    const ordersPercent = (((yesterdayOrdersQuantity / ordersPerDay) - 1) * 100).toFixed(2);

    // Total gain
    const totalgain = calculatePrice(allOrders);

    // Gain per day
    const gainPerDay = totalgain / daysNumber;

    // Yesterday gain
    const yesterdayGain = calculatePrice(yesterdayOrders);

    // Gain percent
    const gainPercent = (((yesterdayGain / gainPerDay) - 1) * 100).toFixed(2);

    // Compare gain
    const compareGain = (yesterdayGain - gainPerDay).toFixed(2);

    // Compare orders quantity
    const compareOrdersQuantity = (yesterdayOrdersQuantity - ordersPerDay).toFixed(2);

    res.status(200).json({
      gain: {
        percent: Math.abs(+gainPercent),
        compare: Math.abs(+compareGain),
        yesterday: +yesterdayGain,
        isHigher: +gainPercent > 0
      },
      orders: {
        percent: Math.abs(+ordersPercent),
        compare: Math.abs(+compareOrdersQuantity),
        yesterday: +yesterdayOrdersQuantity,
        isHigher: +ordersPercent > 0
      }
    })
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.analytics = async function(req, res) {
  try {
    const allOrders = await Order.find({user: req.user.id}).sort({date: 1});
    const ordersMap = getOrdersMap(allOrders);

    const average = +(calculatePrice(allOrders) / Object.keys(ordersMap).length).toFixed(2);
    
    const chart = Object.keys(ordersMap).map(label =>{
      const gain = calculatePrice(ordersMap[label]);
      const order = ordersMap[label].length;

      return { label, order, gain }
    })

    res.status(200).json({ average, chart })
  } catch (err) {
    errorHandler(res, err);
  }
}

function getOrdersMap(orders = []) {
  const daysOrders = {}
  orders.forEach(order => {
    const date = moment(order.date).format('DD.MM.YYYY')

    if (date === moment().format('DD.MM.YYYY')) {
      return
    }

    if (!daysOrders[date]) {
      daysOrders[date] = []
    }

    daysOrders[date].push(order)
  })
  return daysOrders
}

function calculatePrice(orders = []) {
  return orders.reduce((total, order) => {
    const orderPrice = order.list.reduce((orderTotal, item) => {
      return orderTotal += item.cost * item.quantity
    }, 0)
    return total += orderPrice
  }, 0)
}