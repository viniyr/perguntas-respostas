const express = require("express");
const app = express();

app.get("/", (req,res) => { 
    res.send("Creating the website!");
});

app.listen(2201, () => { console.log("Listening on port 2201");});