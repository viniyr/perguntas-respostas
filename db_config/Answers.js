const Sequelize = require("sequelize");
const conn = require("./database");

const Answer = conn.define("answers", { 
    author: { 
        type: Sequelize.STRING,
        allowNull: false,
    },
    body: { 
        type: Sequelize.TEXT,
        allowNull: false
    },
    questionId: { 
        type: Sequelize.INTEGER,
        allowNull: false
    },
    createdAt: { 
        type: Sequelize.DATEONLY,
    }

});

Answer.sync({force: false})

module.exports = Answer;