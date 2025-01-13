const mongoose = require('mongoose');
const myDb = 'My_DB';

// Vérification du connexion du base de donnée :
    mongoose.connect(`mongodb://localhost:27017/${myDb}`)
        .then(() => {
            console.log(`Connected to ${myDb}`);
        })
        .catch(err => {
            console.log(err);
    });


module.exports = mongoose;