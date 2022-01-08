// Trajanje upita sa regexom: 0.194 sekunda
// Trajanje upita sa indexom: 0.009 sekunda

// Upit sa regexom
db.watches.find({$or: [
    { "summary": { $regex: "mindful" } },
    { "text": { $regex: "mindful" } } ,
]});


// Kreiranje indeksa
// Trajanje upita: 6.04 sekunda
db.watches.createIndex({ "summary": "text", "text": "text" });


// Upit sa indeksom
db.watches.find({ $text: { $search: "mindful" } });


/*
Dohvat s indeksom je znatno brzi nego dohvat koristenjem regexa.
Kod pretrazivanja sa regexom koristi se strategija COLLSCAN gdje se slijedno pretrazuje po cijeloj
kolekciji te se provjerava uvjet u regexu, kod pretrazivanja nakon izgradnje indeksa koristi se 
strategija IXSCAN gdje se koristi izgradeni indeks za ubrzanje pretrage.

Kod pretrage koristenjem indeksa pronalazi se vise rezultata koji zadovoljavaju uvijet iako je u
oba slucaja stavljen string "mindful". To je zato sto se kod pretrage koristenjem $text operatora
i indeksa micu stop rijeci i koristi se korijenski oblik rijeci. Tako se kod ovog primjera u rezultatu
mogu pronaci recenzije koje u sebi sadrze rijeci "mind", "minded", itd. koje imaju isti korijen kao
i trazena rijec "mindful".
*/
