const fs = require("fs");
const { MongoClient } = require("mongodb");

const mappings = {
    "product/productId": "product_id",
    "product/title": "title",
    "product/price": "price",
    "review/userId": "user_id",
    "review/profileName": "profile_name",
    "review/helpfulness": "helpfulness",
    "review/score": "score",
    "review/time": "time",
    "review/summary": "summary",
    "review/text": "text",
};

const rawData = fs.readFileSync("./Watches.txt", "utf-8");
const watches = [];
let watch = {};

rawData.split("\n").forEach((line) => {
    if (line.trim().length === 0) {
        watch["price"] = watch["price"] !== "unknown" ? parseFloat(watch["price"]) : null;
        watch["score"] = parseFloat(watch["score"]);
        watch["time"] = new Date(parseInt(watch["time"] * 1000));

        watches.push(watch);
        watch = {};
        return;
    }

    const parts = line.split(": ");
    watch[mappings[parts[0]]] = line.substring(line.indexOf(":") + 2);
});

const client = new MongoClient("mongodb://root:rootnmbp@localhost:27017");

const main = async () => {
    try {
        await client.connect();

        const batchSize = 10;
        let start = 0;

        while (start < watches.length) {
            const batch = watches.slice(start, start + batchSize);
            start += batchSize;

            if (batch.length > 0) {
                await client.db("project").collection("watches").insertMany(batch);
            }
        }
    } catch (error) {
        console.log(error);
    } finally {
        client.close();
    }
};

main().then(() => console.log("done"));
