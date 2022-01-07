// Trajanje upita: 0.02 sekunda

let productIdsToDelete = db.watches
    .aggregate([
        { 
            $group: {
                _id: "$product_id",
                allPrices: { $addToSet: "$price" }
            }
        },
        {
            $match: { 
                "allPrices.1": { $exists: true } 
            }
        }
    ]).map(function(d) {
        return d._id;
    });

db.watches.remove({ _id: { $in: productIdsToDelete } });
