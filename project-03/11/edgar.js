// Trajanje upita: 0.114 sekunda

db.products.find({
    "reviewStats.reviewCount": { $gte: 200 },
    "reviewStats.avgReviewScore": { $gte: 4.5 },
    "price": { $lt: 20 },
    $or: [
        { "reviews": { $elemMatch: { "title": { $regex: "wonderful" } } } },
        { "reviews": { $elemMatch: { "summary": { $regex: "wonderful" } } } },
        { "reviews": { $elemMatch: { "text": { $regex: "wonderful" } } } },
    ]
}).count();
