import app from "./App.js";
import dotenv from "dotenv";

app.get("/", (req, res) => {
    res.send("<h2>Hii, there </h2>");
});
app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is Started with port :${process.env.PORT || 8000}`);
})
