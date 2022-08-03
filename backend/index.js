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
const { getStorage } = require('firebase-admin/storage');

const serviceAccount = require("./serviceAccountKey.json");

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: 'quasar-protogram.appspot.com'
});

const db = getFirestore();
let bucket = getStorage().bucket();

/*
 dependencies
*/

const express = require("express");
let inspect = require("util").inspect;
let Busboy = require("busboy");
let path = require('path');
let os = require('os');
let fs = require("fs");
let UUID = require("uuid-v4");

/*
 config -express
*/
const app = express();

/*
 endpoint -posts
*/

app.get("/posts", (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");

  let posts = [];

  db.collection("posts")
    .orderBy("date", "desc")
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
 endpoint -createPost
*/

app.post("/createPost", (request, response) => {
  response.set("Access-Control-Allow-Origin", "*");

  let uuid = UUID();

  const bb = Busboy({ headers: request.headers });
  let fields = {};
  let fileData ={};

  bb.on("file", (name, file, info) => {
    const { filename, encoding, mimeType } = info;
    console.log(
      `File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
      filename,
      encoding,
      mimeType
    );

    let filePath = path.join(os.tmpdir(), filename);
    file.pipe(fs.createWriteStream(filePath));
    fileData = {filePath, mimeType};
  });

  bb.on("field", (name, val, info) => {
    console.log(`Field [${name}]: value: %j`, val);
    fields[name] = val;
  });

  bb.on("close", () => {
    bucket.upload(
      fileData.filePath,
      {
        uploadType: "media",
        metadata: {
          metadata: {
            contentType: fileData.mimeType,
            firebaseStorageDownloadTokens: uuid,
          }
        },
      },
      (error, uploadedFile) => {
        if (!error) {
          createDocument(uploadedFile);
        }
      }
    );

    function createDocument(uploadedFile) {
      db.collection('posts').doc(fields.id).set({
        id: fields.id,
        caption: fields.caption,
        location: fields.location,
        date: parseInt(fields.date),
        imageUrl: 
        `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${uploadedFile.name}?alt=media&token=${uuid}`,
      }).then(() => {
        response.send('Post added:' + fields.id)
      })
    }
  });

  request.pipe(bb);
});

/*
 listen
*/

app.listen(3000);
