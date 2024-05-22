// backend.js
import express from "express";
import cors from "cors";
import userServices from "./services/user-service.js";
import choreServices from "./services/chore-services.js";
import eventsServices from "./services/event-services.js";


const app = express();
const port = 8000;

const users = {
    users_list: [
        
    ]
};

app.use(cors());
app.use(express.json());


app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  let promise = userServices.getUsers(name, job);
  promise.then((result) => {
    result = { users_list: result };
    res.send(result);
  } )
    
});

app.get("/chores", (req, res) => {
  const chore = req.query.chore;
  const roommate = req.query.roommate;
  let promise = choreServices.getChores(chore, roommate);
  promise.then((result) => {
    result = { chores_list: result };
    res.send(result);
  } )
    
});

app.get("/events", (req, res) => {
  const events = req.query.events;
  const name = req.query.name;
  let promise = eventsServices.getEvents(events, name);
  promise.then((result) => {
    result = { events_list: result };
    res.send(result);
  } )
    
});

app.get("/users/:id", (req, res) => {
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

app.get("/chores/:id", (req, res) => {
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
app.get("/events/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let promise = eventsServices.findEventById(id);
  promise.then((result) => {
    if (result === undefined) {
      res.status(404).send("Resource not found.");
    } else {
      res.send(result);
    }
  })
  
});

app.delete("/users/:id", (req, res) => {
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

app.delete("/chores/:id", (req, res) => {
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

app.delete("/events/:id", (req, res) => {
  const id = req.params["id"];
  let promise = eventsServices.deleteEventById(id);
  promise.then((result) => {
    if (!result){
      res.status(404).send("Resource not found.");
    } else{
      res.status(204).send();
    }
  })
});


app.post("/users", (req, res) => {
  const userToAdd = req.body;
  const promise = userServices.addUser(userToAdd);
  promise.then((newUser) => {
    res.status(201).send(newUser);
  })
  
});

app.post("/chores", (req, res) => {
  const choreToAdd = req.body;
  const promise = choreServices.addChore(choreToAdd);
  promise.then((newChore) => {
    res.status(201).send(newChore);
  })
  
});

app.post("/events", (req, res) => {
  const eventToAdd = req.body;
  const promise = eventsServices.addEvent(eventToAdd);
  promise.then((newEvent) => {
    res.status(201).send(newEvent);
  })
  
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});