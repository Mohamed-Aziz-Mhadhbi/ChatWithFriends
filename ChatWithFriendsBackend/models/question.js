const mongoose = require('mongoose');

const  Question= mongoose.model('Question',{
    question : {
        type : String 
    }
})

module.exports =Question;