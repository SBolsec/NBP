// Trajanje upita: 0.702 sekunda

db.products.aggregate([{
    $addFields: {
        reviewStats: {
            avgReviewScore: { $round: [{ $avg: "$reviews.score" }, 2] },
            reviewCount: { $size: "$reviews" },
            reviewScoreDistrib: {
                1: { $round: { $multiply: [{ $divide: [{$size: {$filter:{input: "$reviews", cond: {$eq: ["$$this.score", 1]}}}}, {$size: "$reviews"}] }, 100] } },
                2: { $round: { $multiply: [{ $divide: [{$size: {$filter:{input: "$reviews", cond: {$eq: ["$$this.score", 2]}}}}, {$size: "$reviews"}] }, 100] } },
                3: { $round: { $multiply: [{ $divide: [{$size: {$filter:{input: "$reviews", cond: {$eq: ["$$this.score", 3]}}}}, {$size: "$reviews"}] }, 100] } },
                4: { $round: { $multiply: [{ $divide: [{$size: {$filter:{input: "$reviews", cond: {$eq: ["$$this.score", 4]}}}}, {$size: "$reviews"}] }, 100] } },
                5: { $round: { $multiply: [{ $divide: [{$size: {$filter:{input: "$reviews", cond: {$eq: ["$$this.score", 5]}}}}, {$size: "$reviews"}] }, 100] } },  
            }
        }
    }
}, {$out: "products"}
]);
