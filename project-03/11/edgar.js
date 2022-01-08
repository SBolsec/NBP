// Trajanje upita: 0.017 sekunda

db.products.find({
    "reviewStats.reviewCount": { $gte: 200 },
    "reviewStats.avgReviewScore": { $gte: 4.5 },
    "price": { $lt: 20 },
    $text: { $search: "wonderful" },
}).count();
