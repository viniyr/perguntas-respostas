const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const conn = require("./db_config/database");
const Question = require("./db_config/Question");

conn
    .authenticate()
    .then(() => { 
        console.log("DB connection OK!")
    })
    .catch((err) => { 
        console.log(err);
    });

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", (req,res) => { 
    Question.findAll({raw: true}).then(questions => { 
        res.render("index", { 
            questions: questions
        });
    });
});

app.get("/question", (req,res) => { 

    var name = req.params.name;
    res.render("questions")
});

app.post("/save", (req,res) => { 
    var title = req.body.title;
    var description = req.body.description;
    Question.create({ 
        title: title,
        description: description
    }).then(()=> { 
        res.redirect("/");
    })

});

app.listen(2201, () => { console.log("Listening on port 2201");});