import app from "./App.js";
import dotenv from "dotenv";
import dbConnection from "./configs/dbConnection.js";
dotenv.config({ path: './configs/.env' });
dbConnection();
app.get("/", (req, res) => {
    res.send("<h2>Hii, there </h2>");
});
app.listen(process.env.PORT || 8500, () => {
    console.log(`Server is Started At port :${process.env.PORT || 8000}`);
})
