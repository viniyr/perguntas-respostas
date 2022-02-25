const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get("/", (req,res) => { 

    var name = req.params.name;
    res.render("index", {
        name : name,

    });
});

app.get("/question", (req,res) => { 

    var name = req.params.name;
    res.render("questions", {
        name : name,

    });
});

app.listen(2201, () => { console.log("Listening on port 2201");});