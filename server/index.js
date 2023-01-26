const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDb = require("./db");
const PORT = process.env.PORT || 3000;
const app = express();

connectDb();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
