import app from "./app";
import { initMongo } from "./mongo";

const dbUrl = process.env.DATABASE_URL ||
    "mongodb+srv://aerialblue:5iKe533hnixFQaOo@aerialblue-mongodb.s3aea.mongodb.net/?retryWrites=true&w=majority&appName=aerialblue-mongodb";
const port = process.env.PORT || 8080;

initMongo(dbUrl).then(() => {
    app.listen(port, (error) => {
        if (!error) {
            console.log(`listening on port ${port}`);
        } else {
            console.error('could not start server', error.message);
        }
    });
}).catch(error => {
    console.error("could not connect to database", error);
});