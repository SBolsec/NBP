// ===========================================================
// ===   Pronaci korisnika s najvise i najmanje recenzija  ===
// ===========================================================

/*
Trajanje upita za trazenje korisnika: 0.15 + 0.16 = 0.31 sekunda

Identifikatori korisnika su:
    - najvise recenzija:    A2FOTUD89BSEMJ
    - najmanje recenzija:   A2KY9LQYSZR6IA
*/

function findUser(sort) {
    return db.watches.aggregate([
        {$match: {"user_id": {$ne: "unknown"} }},
        {
            $group: {
                _id: "$user_id",
                reviewCount: { $sum: 1 }
            },
        }, 
        { $sort: { reviewCount: sort } },
        { $limit: 1 }
    ]).map(a => { return {_id: a._id, count: a.reviewCount} });
}

print(findUser(-1));     // korisnik s najvise recenzija
print(findUser(1));      // korisnik s najmanje recenzija


// ===========================================================
// ===         Dohvatiti sve recenzije tih korisnika       ===
// ===========================================================

// Trajanje upita: 0.029 + 0.026 = 0.054 sekunda

function getUserReviews(userId) {
    return db.products.aggregate([
        {$match: { "reviews.user_id": userId } },
        {$project: {
            reviews: {
                $filter: {
                    input: "$reviews",
                    cond: { $eq: ["$$this.user_id", userId] }
                }
            }
        }}
    ]).map(a => a.reviews);
}

print(getUserReviews("A2FOTUD89BSEMJ"));
print(getUserReviews("A2KY9LQYSZR6IA"));


// ===========================================================
// ===  Napraviti indeks na tom atributu i ponoviti upit   ===
// ===========================================================

// Trajanje upita: 0.007 + 0.004 = 0.011 sekunda
// Trajanje stvaranja indeksa: 0.142 sekunda

db.createIndex({ "reviews.user_id": 1 });

print(getUserReviews("A2FOTUD89BSEMJ"));
print(getUserReviews("A2KY9LQYSZR6IA"));


// ===========================================================
// ===             Ispisati explain kod dohvata            ===
// ===========================================================

// Trajanje upita: 0.004 sekunda

db.products.aggregate([
    {$match: { "reviews.user_id": "A2FOTUD89BSEMJ" } },
    {$project: {
        reviews: {
            $filter: {
                input: "$reviews",
                cond: { $eq: ["$$this.user_id", "A2FOTUD89BSEMJ"] }
            }
        }
    }}
], { explain: true });

// ===========================================================
// ===                      Zakljucak                      ===
// ===========================================================

/*
Nakon sto napravimo indeks, vrijeme pretrazivanja se ocekivano smanjuje, konkretno na ovom
primjeru je pretrazivanje bilo 5 puta brze.

Ispisom "explaina" vidljivo je da mongo kod "input stagea" koristi operaciju IXSCAN sto
znaci da se pretrazuju indeksirani kljucevi u nekom opsegu, sto je puno brze nego slijedno
pretrazivanje cijele kolekcije.
*/
