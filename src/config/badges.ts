//
export {}
const config = require('./config');

const badgeList = [
    {
      "id": 0,
      "name": "Co-Creator Listing Badge",
      "price": 0,
      "stripe_price": ""
    },
    {
      "id": 1,
      "name": "$50 Diamond Co-Creator Listing Badge",
      "price": 50,
      "stripe_price": config.stripe.price_1
    },
    {
      "id": 2,
      "name": "$40 Gold Co-Creator Listing Badge",
      "price": 40,
      "stripe_price": config.stripe.price_2
    },
    {
      "id": 3,
      "name": "$25 Silver Co-Creator Listing Badge",
      "price": 25,
      "stripe_price": config.stripe.price_3
    }
  
]

exports.badgeList = badgeList;