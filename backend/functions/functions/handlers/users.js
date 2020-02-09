const { admin, db }  = require("../util/admin");
const config = require('../util/config');

const firebase = require('firebase');
firebase.initializeApp('config');

const { validateLoginData } = require('../util/validators');

// need validators for login

exports.login = (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    };

    const { valid, errors } = validateLoginData(user);

    if (!valid) return response.status(400).json({ errors });

    // sign into piazza with child process
};

// validateLoginData(data) {
//     let errors = {};

//     if (isEmpty(data.email)) errors.email = 'Must not be empty';
//     if (isEmpty(data.password)) errors.password = 'Must not be empty';

//     // if no errors, valid will return true and carry on
//     return {
//         errors,
//         valid: Object.keys(errors).length === 0 ? true: false
//     };
// }