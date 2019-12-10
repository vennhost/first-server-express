const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const filePath = path.join(__dirname, "users.json");

const readFile = filePath => {
  const buffer = fs.readFileSync(filePath); // read the file
  const fileContent = buffer.toString();
  return JSON.parse(fileContent);
};

router.get("/:id", (req, res) => {
  // DO SOMETHING WITH REQUEST AND RESPONSE
  const usersArray = readFile(filePath);
  const foundUser = usersArray.find(
    user => user._id === Number.parseInt(req.params.id)
  ); // req.params can access to the placeholder in the url (:id)
  console.log(foundUser);
  if (!foundUser) {
    res.status(401).send(`Cannot find user with id ${req.params.id}`);
  } else {
    res.send(foundUser);
  }
}); // GET http:localhost:3000/users/1234 to READ a single user by id

router.get("/", (req, res) => {
  // DO SOMETHING WITH REQUEST AND RESPONSE
  const usersArray = readFile(filePath);
  res.send(usersArray);
}); // GET http:localhost:3000/users/ to LIST all the users

router.post("/", (req, res) => {
  // DO SOMETHING WITH REQUEST AND RESPONSE
  const usersArray = readFile(filePath);
  const newUser = {
    ...req.body,
    _id: usersArray.length + 1,
    createdAt: new Date()
  };
  usersArray.push(newUser);
  fs.writeFileSync(filePath, JSON.stringify(usersArray));
  res.status(201).send(`${newUser._id}`);
}); // POST http:localhost:3000/users/ to CREATE a single user

router.put("/:id", (req, res) => {
  // DO SOMETHING WITH REQUEST AND RESPONSE
  const modifiedUser = req.body;
  let usersArray = readFile(filePath);
  usersArray[req.params.id - 1] = modifiedUser;
  fs.writeFileSync(filePath, JSON.stringify(usersArray));
  res.send(modifiedUser);
  //const userToModify = usersArray.filter( user =>  user._id === req.params.id)
}); // PUT http:localhost:3000/users/ to UPDATE a single user

router.delete("/:id", (req, res) => {
  const usersArray = readFile(filePath);
  const usersToBeKept = usersArray.filter(user => user._id !== req.params.id);

  fs.writeFileSync(filePath, JSON.stringify(usersToBeKept));
  res.status(204);
  // DO SOMETHING WITH REQUEST AND RESPONSE
}); // DELETE http:localhost:3000/users/ to DELETE a single user

module.exports = router;
