const express = require("express");
const usersRouter = require("./src/services/users");
//const moviesRouter = require("./src/services/movies");

const server = express(); // Create http server with express

const port = 3001;

server.use(express.json()); // To parse request bodies into objects
server.use("/users", usersRouter); // Each request on http://localhost:3000/users is handled by usersRouter
//server.use("/movies", moviesRouter); // Each request on http://localhost:3000/movies is handled by moviesRouter

server.listen(port, () => {
  // Server run and listen to connections on port 3000
  console.log(`Server is running on port ${port}`);
});
