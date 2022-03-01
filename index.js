const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const conn = require("./db_config/database");
const Question = require("./db_config/Question");
const Answer = require("./db_config/Answers");
const Sequelize = require("sequelize");


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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    Question.findAll({
        raw: true,
        order: [
            ['id', 'DESC']
        ]
    }).then(questions => {
        res.render("index", {
            questions: questions
        });
    });
});

app.get("/question", (req, res) => {

    var name = req.params.name;
    res.render("questions")
});

app.post("/save", (req, res) => {
    var title = req.body.title;
    var description = req.body.description;
    Question.create({
        title: title,
        description: description
    }).then(() => {
        res.redirect("/");
    })

});

app.get("/question/:id", (req, res) => {
    var id = req.params.id;
    Question.findOne({
        where: { id: id }
    }).then(question => {
        if (question != undefined) {

            Answer.count({
                col: Answer.id
            }).then(quantity => {

                Answer.findAll({
                    where: { questionId: question.id },
                    raw: true,
                    order: [
                        ['id', 'DESC']
                    ],

                    attributes: [
                        'id',
                        'author',
                        'body',
                        'questionId',
                        [Sequelize.fn('date_format', Sequelize.col('createdAt'), '%d/%m/%Y %H:%i'), 'created'],
                    ]

                }).then(answers => {

                    res.render("question", {
                        question: question,
                        answers: answers,
                        quantity: quantity,
                    });
                });
            });
        } else {
            res.redirect("/");
        }

    });
});


app.post("/answer", (req, res) => {
    var author = req.body.authorName;
    var answerBody = req.body.answerBody;
    var questionId = req.body.question;

    Answer.create({
        author: author,
        body: answerBody,
        questionId: questionId,
    }).then(() => {
        res.redirect(`/question/${questionId}`);
    });

})



app.listen(2201, () => { console.log("Listening on port 2201"); });