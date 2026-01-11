const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const employeeRoutes = require("./routes/employeeRoutes");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://khushikarpe1910_db_user:KHUSHI1910@cluster0.sk5db0k.mongodb.net/employeeDB?retryWrites=true&w=majority")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use("/api/employees", employeeRoutes);

app.listen(5001, () => console.log("Server running on port 5001"))
