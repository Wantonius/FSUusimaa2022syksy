const express = require("express");
const apiroute = require("./routes/apiroute")

let app = express();

app.use(express.json());

let port = process.env.PORT || 3001;

app.use("/api",apiroute);

app.listen(port);

console.log("Running in port",port);