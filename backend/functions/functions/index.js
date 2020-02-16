const functions = require('firebase-functions');
const app = require('express')();
// const admin = require('firebase-admin');

// admin.initializeApp();

const { db } = require('./util/admin');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

const { login } = require("./handlers/users");

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

// app.post("/login", login);
app.post("/login", login);

app.get('/users', (req, res) => {
    db.collection("users")
      .orderBy('email') // we need this to make a query
      .get()
      .then( (data) =>{
          let users = [];
          data.forEach( (doc) => {
              users.push({
                  userID: doc.id,
                  email: doc.data().email,
                  pass: doc.data().password
              });
          });
          return res.json(users);
      })
      .catch( (err) => {
          console.error(err);
          res.status(500).json({ error: err.code});
      });
});

exports.api = functions.https.onRequest(app);


// probably comment this out rn 
// exports.login = functions.https.onRequest( (req, res) => {
//     const user = {
//         email: req.body.email,
//         password: req.body.password
//     };

//     // admin.firestore().collection('users')
// });