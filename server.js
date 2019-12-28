const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

if (process.env.NODE_ENV !== "production") dotenv.config();

const app = express();

connectDB();

app.get("/", (req, res) => res.send("API Running"));

//Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));