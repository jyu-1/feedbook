const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDb = require("./db");
const PORT = process.env.PORT || 3000;
const app = express();
const userRoute = require("./routes/user");
const postRoute = require("./routes/post");
const commentRoute = require("./routes/comment");

connectDb();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
});

app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/comment", commentRoute);

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
