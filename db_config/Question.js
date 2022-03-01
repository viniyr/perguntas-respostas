const Sequelize = require("sequelize");
const conn = require("./database");

const Question = conn.define('question', { 
    title: { 
        type: Sequelize.STRING,
        allowNull : false
    },
    description: { 
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Question.sync({force: false}).then(() => {
    console.log("TABLE SUCCESS")
});

module.exports = Question;