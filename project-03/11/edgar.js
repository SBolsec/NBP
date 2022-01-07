// Upit koji vraca broj proizvoda koji zadovoljavaju uvjete.
// Trajanje upita: 0.109 sekunda
db.products.aggregate([{ 
    $match: {
        $and: [
            { "reviewStats.reviewCount": { $gte: 200 } },
            { "reviewStats.avgReviewScore": { $gte: 4.5 } },
            { "price": { $lt: 20 } },
            { $or: [
                { "reviews": { $elemMatch: { "title": { $regex: "wonderful" } } } },
                { "reviews": { $elemMatch: { "summary": { $regex: "wonderful" } } } },
                { "reviews": { $elemMatch: { "text": { $regex: "wonderful" } } } },
            ]}
        ]
    } 
}, { $count: "passing" }
]);

// Upit koji vraca proizvode koji zadovoljavaju uvjete.
// Trajanje upita: 0.119 sekunda
db.products.aggregate([{ 
    $match: {
        $and: [
            { "reviewStats.reviewCount": { $gte: 200 } },
            { "reviewStats.avgReviewScore": { $gte: 4.5 } },
            { "price": { $lt: 20 } },
            { $or: [
                { "reviews": { $elemMatch: { "title": { $regex: "wonderful" } } } },
                { "reviews": { $elemMatch: { "summary": { $regex: "wonderful" } } } },
                { "reviews": { $elemMatch: { "text": { $regex: "wonderful" } } } },
            ]}
        ]
    } 
}
]);