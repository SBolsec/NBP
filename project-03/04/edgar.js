// Trajanje upita: 0.252 sekunda

db.watches
    .find({ score: { $eq: 1 } }, { _id: 0, title: 1, price: 1, time: 1 })
    .sort({ time: 1, _id: -1 })
    .skip(10)
    .limit(10)
