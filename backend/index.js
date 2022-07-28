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
  let posts = [
    {
      caption: "Home",
      location: "Balashiha, Russia",
    },
    {
      caption: "London Eye",
      location: "London",
    },
  ];
  response.send(posts);
});

/*
 listen
*/

app.listen(3000);
