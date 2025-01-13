const mongoose = require('mongoose');

const Suivi = mongoose.model('Suivi',{
    name : {
        type : String 
    }
})

module.exports = Suivi;