// Trajanje upita: 0.017 sekunda

// Priprema indeksa za brzu pretragu
// Trajanje upita: 4.07 sekunda
db.products.createIndex({ "review.summary": "text", "review.text": "text" });

db.products.find({
    "reviewStats.reviewCount": { $gte: 200 },
    "reviewStats.avgReviewScore": { $gte: 4.5 },
    "price": { $lt: 20 },
    $text: { $search: "wonderful" },
}).count();
