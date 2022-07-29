/*
 firebase
*/

const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");

const serviceAccount = require("./serviceAccountKey.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

/*
 dependencies
*/

const express = require("express");

/*
 config -express
*/
const app = express();

/*
 endpoint -posts
*/

app.get("/posts", (request, response) => {
  response.set('Access-Control-Allow-Origin', '*');

  let posts = [];

  db.collection("posts").orderBy('date', 'desc')
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
        posts.push(doc.data());
      });
      response.send(posts);
    });
});

/*
 listen
*/

app.listen(3000);
