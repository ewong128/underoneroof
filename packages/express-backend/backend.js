// backend.js
import express from "express";
import cors from "cors";
import userServices from "./services/user-service.js";
import choreServices from "./services/chore-services.js";
import groupServices from "./services/group-services.js"
import contactServices from "./services/contact-services.js";
import preferenceServices from "./services/preference-services.js";
import { authenticateUser, registerUser, loginUser } from "./auth.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// for users
app.get("/users", authenticateUser, (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  let promise = userServices.getUsers(name, job);
  promise.then((result) => {
    result = { users_list: result };
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

app.post("/users", authenticateUser, (req, res) => {
  const userToAdd = req.body;
  const promise = userServices.addUser(userToAdd);
  promise.then((newUser) => {
    res.status(201).send(newUser);
  })
  
});

// for chores
app.get("/chores", authenticateUser, (req, res) => {
  const chore = req.query.chore;
  const roommate = req.query.roommate;
  let promise = choreServices.getChores(chore, roommate);
  promise.then((result) => {
    result = { chores_list: result };
    res.send(result);
  } )
    
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

app.post("/chores", authenticateUser, (req, res) => {
  const choreToAdd = req.body;
  const promise = choreServices.addChore(choreToAdd);
  promise.then((newChore) => {
    res.status(201).send(newChore);
  })
  
});

// for groups
app.get("/groups", authenticateUser, (req, res) => {
  const roommate = req.query.roommate;
  console.log("in backend")
  console.log(roommate)
  let promise = groupServices.findGroupByRoommate(roommate);
  promise.then((result) => {
    console.log("before result")
    console.log(result)
    res.send(result);
  } )
    
});

app.post("/groups", authenticateUser, (req, res) => {
  const groupToAdd = req.body;
  const promise = groupServices.addGroup(groupToAdd);
  promise.then((newGroup) => {
    res.status(201).send(newGroup);
  })
  
});


// for contacts
app.get("/contacts", authenticateUser, (req, res) => {
  const contact = req.query.contact;
  let promise = contactServices.getContacts(contact);
  promise.then((result) => {
    result = { contacts_list: result };
    res.send(result);
  } )
    
});

app.get("/contacts/:id", authenticateUser, (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let promise = contactServices.findContactById(id);
  promise.then((result) => {
    if (result === undefined) {
      res.status(404).send("Resource not found.");
    } else {
      res.send(result);
    }
  })
  
});

app.delete("/contacts/:id", authenticateUser, (req, res) => {
  const id = req.params["id"];
  let promise = contactServices.deleteContactById(id);
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
  let promise = preferenceServices.deletePrefById(id);
  promise.then((result) => {
    if (!result){
      res.status(404).send("Resource not found.");
    } else{
      res.status(204).send();
    }
  })
});

app.post("/preferences", authenticateUser, (req, res) => {
  const prefToAdd = req.body;
  const promise = preferenceServices.addPref(prefToAdd);
  promise.then((newPref) => {
    res.status(201).send(newPref);
  })
  
});

app.post("/signup", registerUser);

app.post("/login", loginUser);

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});