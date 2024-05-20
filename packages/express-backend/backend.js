// backend.js
import express from "express";
import cors from "cors";
import userServices from "./services/user-service.js";
import choreServices from "./services/chore-services.js";
import groupServices from "./services/group-services.js"
import { authenticateUser, registerUser, loginUser } from "./auth.js";

const app = express();
const port = 8000;

const users = {
    users_list: [
        
    ]
};

app.use(cors());
app.use(express.json());


app.get("/users", authenticateUser, (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  let promise = userServices.getUsers(name, job);
  promise.then((result) => {
    result = { users_list: result };
    res.send(result);
  } )
    
});

app.get("/chores", authenticateUser, (req, res) => {
  const chore = req.query.chore;
  const roommate = req.query.roommate;
  let promise = choreServices.getChores(chore, roommate);
  promise.then((result) => {
    result = { chores_list: result };
    res.send(result);
  } )
    
});

app.get("/users/:id", authenticateUser, (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let promise = userServices.findUserById(id);
  promise.then((result) => {
    if (result === undefined) {
      res.status(404).send("Resource not found.");
    } else {
      res.send(result);
    }
  })
  
});

app.get("/chores/:id", authenticateUser, (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let promise = choreServices.findChoreById(id);
  promise.then((result) => {
    if (result === undefined) {
      res.status(404).send("Resource not found.");
    } else {
      res.send(result);
    }
  })
  
});

app.delete("/users/:id", authenticateUser, (req, res) => {
  const id = req.params["id"];
  let promise = userServices.deleteUserById(id);
  promise.then((result) => {
    if (!result){
      res.status(404).send("Resource not found.");
    } else{
      res.status(204).send();
    }
  })
});

app.delete("/chores/:id", authenticateUser, (req, res) => {
  const id = req.params["id"];
  let promise = choreServices.deleteChoreById(id);
  promise.then((result) => {
    if (!result){
      res.status(404).send("Resource not found.");
    } else{
      res.status(204).send();
    }
  })
});

app.post("/users", authenticateUser, (req, res) => {
  const userToAdd = req.body;
  const promise = userServices.addUser(userToAdd);
  promise.then((newUser) => {
    res.status(201).send(newUser);
  })
  
});

app.post("/groups", authenticateUser, (req, res) => {
  const groupToAdd = req.body;
  const promise = groupServices.addGroup(groupToAdd);
  promise.then((newGroup) => {
    res.status(201).send(newGroup);
  })
  
});

app.post("/chores", authenticateUser, (req, res) => {
  const choreToAdd = req.body;
  const promise = choreServices.addChore(choreToAdd);
  promise.then((newChore) => {
    res.status(201).send(newChore);
  })
  
});

app.post("/signup", registerUser);

app.post("/login", loginUser);

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});