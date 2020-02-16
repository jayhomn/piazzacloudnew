const { admin, db }  = require("../util/admin");
const config = require('../util/config');

const firebase = require('firebase');
firebase.initializeApp('config');

const { validateLoginData } = require('../util/validators');

const spawn = require("child_process").spawn;

// need validators for login

exports.login = (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    };

    // const { valid, errors } = validateLoginData(user);

    // if (!valid) return response.status(400).json({ errors });

    // runs this command on terminal with 2 extra args. Sys picks them up so we can include these params
    var process = spawn("python", ["C:\\Users\\samue\\Desktop\\piazzacloudnew\\backend\\functions\\functions\\pythonfiles\\PiazzaExtractorApi.py", req.body.email, req.body.password]);

    process.stdout.on("data", (data) => {
        res.send(data);
        firebase.auth()
            .signInWithEmailAndPassword(user.email, user.password)
            .then( (data) => {
                return res.send(data.user);
            });
    });
    process.stderr.on("data", (data) => {
        console.error(`Stderr: ${data}`);
    })

    process.on("close", (code) => {
        console.log(`Child process ended with status code ${code}`);
    })

    // sign into piazza with child process
    // firebase.collection("users").add({ email: __, password: ___})
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
