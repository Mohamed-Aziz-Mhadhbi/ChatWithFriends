const mongoose = require('mongoose');

const  Image= mongoose.model('Image',{
    image : {
        type : String 
    }
})

module.exports =Image;