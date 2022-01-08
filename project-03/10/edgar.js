// Trajanje upita sa regexom: 0.136 sekunda
// Trajanje upita sa indexom:  sekunda

// Upit sa regexom
db.watches()

db.products.aggregate([{
    $match: {
        $or: [
            { "reviews": { $elemMatch: { "title": { $regex: "mindful" } } } },
            { "reviews": { $elemMatch: { "summary": { $regex: "mindful" } } } },
            { "reviews": { $elemMatch: { "text": { $regex: "mindful" } } } },
        ]
    }
},{ $project: {
        reviews: { 
            $filter: {
                input: "$reviews",
                cond: { 
                    $or: [
                        { $regexMatch: { input: "$$this.summary", regex: "mindful" } },
                        { $regexMatch: { input: "$$this.text", regex: "mindful" } }
                    ]
                }
            }
        }
    }
}
]);


// Kreiranje indeksa
// Trajanje upita: 4.07 sekunda
db.products.createIndex({ "reviews.summary": "text", "reviews.text": "text" });


// Upit sa indeksom
db.products.aggregate([{
    $unwind: "reviews"
},
{
    $match: { $text: { $search: "wonderful" } }
},{ $project: {
        reviews: { 
            $filter: {
                input: "$reviews",
                cond: { 
                    $text: { $search: "wonderful" } 
                }
            }
        }
    }
}
]);
