// Trajanje upita: 0.298 + 0.074 = 0.362 sekunda

let mostNumberOfReviews = db.products.aggregate([
    { $addFields: { reviewCount: { $size: "$reviews" } } },
    { $sort: { reviewCount: -1 } },
    { $limit: 10 }
]);
    
let leastNumberOfReviews = db.products.aggregate([
    { $addFields: { reviewCount: { $size: "$reviews" } } },
    { $sort: { reviewCount: 1 } },
    { $limit: 10 }
]);
    
/*
Najvise recenzija:
    - B0006AAS4M
    - B000EQS1JW
    - B000GAYQKY
    - B00093CZV0
    - B000JQFX1G
    - B000CK4FGI
    - B000HDJT6Q
    - B0006IEX04
    - B0006AAS7E
    - B000JQJS6M

Najmanje recenzija:
    - B0002KJZOK
    - B000E8J5UY
    - B000KZVFFO
    - B0009NWPTW
    - B0000A1XSN
    - B0006J9Q64
    - B0002CU718
    - B000MVUV4W
    - B000671K38
    - B000PYCSA6
*/