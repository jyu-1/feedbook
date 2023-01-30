const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDb = require("./db");
const PORT = process.env.PORT || 3000;
const app = express();
const userRoute = require("./routes/user");

connectDb();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", userRoute);

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
