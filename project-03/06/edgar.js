// Trajanje upita: 0.67 sekunda

db.watches.aggregate([{
    $group: {
        _id: "$product_id",
        price: { $first: "$price" },
        title: { $first: "$title" },
        reviews: {
            $addToSet: {
                user_id: "$user_id",
                profile_name: "$profile_name",
                helpfulness: "$helpfulness",
                score: "$score",
                time: "$time",
                summary: "$summary",
                text: "$text",
            },
        },
    },
}, { $out: "products" } ]);
