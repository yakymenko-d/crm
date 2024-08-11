const moment = require('moment');
const Order = require('../models/Order');
const errorHandler = require('../utils/errorHandler');

module.exports.overview = async function(req, res) {
  try {  
    const allOrders = await Order.find({user: req.user.id}).sort({date: 1});
    const ordersMap = getOrdersMap(allOrders);
    const todayOrders = ordersMap[moment().format('DD.MM.YYYY')] || [];
    const yesterdayOrders = ordersMap[moment().add(-1, 'd').format('DD.MM.YYYY')] || [];

    // Today orders quantity
    const todayOrdersQuantity = todayOrders.length;

    // Yesterday orders quantity
    const yesterdayOrdersQuantity = yesterdayOrders.length;

    // Orders quantity
    const totalOrders = allOrders.length;

    // Days quantity
    const daysNumber = Object.keys(ordersMap).length;

    // Orders/Day
    const ordersPerDay = (totalOrders / daysNumber).toFixed(0);

    //Today ordrers quantity percent (((today orders quantity / orders per day) - 1) * 100)
    const todayOrdersPercent = (((todayOrdersQuantity / ordersPerDay) - 1) * 100).toFixed(2);

    //Yesterday ordrers quantity percent (((yesterday orders quantity / orders per day) - 1) * 100)
    const yesterdayOrdersPercent = (((yesterdayOrdersQuantity / ordersPerDay) - 1) * 100).toFixed(2);

    // Total gain
    const totalgain = calculatePrice(allOrders);

    // Gain per day
    const gainPerDay = totalgain / daysNumber;

    // Today gain
    const todayGain = calculatePrice(todayOrders);

    // Yesterday gain
    const yesterdayGain = calculatePrice(yesterdayOrders);

    // Today gain percent
    const todayGainPercent = (((todayGain / gainPerDay) - 1) * 100).toFixed(2);

    // Yesterday gain percent
    const yesterdayGainPercent = (((yesterdayGain / gainPerDay) - 1) * 100).toFixed(2);

    // Compare today gain
    const compareTodayGain = (todayGain - gainPerDay).toFixed(2);

    // Compare yesterday gain
    const compareYesterdayGain = (yesterdayGain - gainPerDay).toFixed(2);

    // Compare today orders quantity
    const compareTodayOrdersQuantity = (todayOrdersQuantity - ordersPerDay).toFixed(2);

    // Compare yesterday orders quantity
    const compareYesterdayOrdersQuantity = (yesterdayOrdersQuantity - ordersPerDay).toFixed(2);

    res.status(200).json({
      today: {
        gain: {
          percent: Math.abs(+todayGainPercent),
          compare: Math.abs(+compareTodayGain),
          dayGain: +todayGain,
          isHigher: +todayGainPercent > 0
        },
        orders: {
          percent: Math.abs(+todayOrdersPercent),
          compare: Math.abs(+compareTodayOrdersQuantity),
          dayOrders: +todayOrdersQuantity,
          isHigher: +todayOrdersPercent > 0
        }
      }, yesterday: {
        gain: {
          percent: Math.abs(+yesterdayGainPercent),
          compare: Math.abs(+compareYesterdayGain),
          dayGain: +yesterdayGain,
          todayIsHigher: +yesterdayGainPercent > 0
        },
        orders: {
          percent: Math.abs(+yesterdayOrdersPercent),
          compare: Math.abs(+compareYesterdayOrdersQuantity),
          dayOrders: +yesterdayOrdersQuantity,
          isHigher: +yesterdayOrdersPercent > 0
        }
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
    // console.log(ordersMap);

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

    // if (date === moment().format('DD.MM.YYYY')) {
    //   return
    // }

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