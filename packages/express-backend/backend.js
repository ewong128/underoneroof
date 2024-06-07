// backend.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userServices from "./services/user-service.js";
import choreServices from "./services/chore-services.js";
import groupServices from "./services/group-services.js";
import contactServices from "./services/contact-services.js";
import preferenceServices from "./services/preference-services.js";
import { authenticateUser, registerUser, loginUser } from "./auth.js";
import eventServices from "./services/event-services.js";
import unavailabilityServices from "./services/unavailability-services.js";
import dotenv from "dotenv";

mongoose.set("debug", true);

dotenv.config();
console.log("hello", process.env.MONGODB_URI);
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

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
  });
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
  });
});

app.delete("/users/:id", authenticateUser, (req, res) => {
  const id = req.params["id"];
  let promise = userServices.deleteUserById(id);
  promise.then((result) => {
    if (!result) {
      res.status(404).send("Resource not found.");
    } else {
      res.status(204).send();
    }
  });
});

app.post("/users", authenticateUser, (req, res) => {
  const userToAdd = req.body;
  const promise = userServices.addUser(userToAdd);
  promise.then((newUser) => {
    res.status(201).send(newUser);
  });
});

// for chores
app.get("/chores", authenticateUser, (req, res) => {
  const chore = req.query.chore;
  const roommate = req.query.roommate;
  let promise = choreServices.getChores(chore, roommate);
  promise.then((result) => {
    result = { chores_list: result };
    res.send(result);
  });
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
  });
});

app.delete("/chores/:id", authenticateUser, (req, res) => {
  const id = req.params["id"];
  let promise = choreServices.deleteChoreById(id);
  promise.then((result) => {
    if (!result) {
      res.status(404).send("Resource not found.");
    } else {
      res.status(204).send();
    }
  });
});

app.post("/chores", authenticateUser, (req, res) => {
  const choreToAdd = req.body;
  const promise = choreServices.addChore(choreToAdd);
  promise.then((newChore) => {
    res.status(201).send(newChore);
  });
});

app.put("/chores/:id", authenticateUser, (req, res) => {
  const id = req.params["id"];
  let promise = choreServices.updateChoreById(id, req.body);
  promise.then((result) => {
    if (!result) {
      res.status(404).send("Resource not found.");
    } else {
      res.status(200).send(result);
    }
  });
});

//for events
app.get("/events", authenticateUser, (req, res) => {
  const event = req.query.event;
  const name = req.query.name;
  let promise = eventServices.getEvents(event, name);
  promise.then((result) => {
    result = { events_list: result };
    res.send(result);
  });
});

app.post("/events", authenticateUser, (req, res) => {
  const eventToAdd = req.body;
  const promise = eventServices.addEvent(eventToAdd);
  promise.then((newEvent) => {
    res.status(201).send(newEvent);
  });
});

app.get("/events/:id", authenticateUser, (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let promise = eventServices.findEventById(id);
  promise.then((result) => {
    if (result === undefined) {
      res.status(404).send("Resource not found.");
    } else {
      res.send(result);
    }
  });
});

app.delete("/events/:id", authenticateUser, (req, res) => {
  const id = req.params["id"];
  let promise = eventServices.deleteEventById(id);
  promise.then((result) => {
    if (!result) {
      res.status(404).send("Resource not found.");
    } else {
      res.status(204).send();
    }
  });
});

// for groups
app.get("/groups", authenticateUser, (req, res) => {
  const roommate = req.query.roommate;
  let promise = groupServices.findGroupByRoommate(roommate);
  promise.then((result) => {
    res.send(result);
  });
});

app.get("/groups/:id", authenticateUser, (req, res) => {
  const id = req.params["id"];
  let promise = groupServices.findGroupById(id);
  promise.then((result) => {
    res.send(result);
  });
});

app.post("/groups", authenticateUser, (req, res) => {
  const groupToAdd = req.body;
  const promise = groupServices.addGroup(groupToAdd);
  promise.then((newGroup) => {
    res.status(201).send(newGroup);
  });
});

app.put("/groups/:id", authenticateUser, (req, res) => {
  const id = req.params["id"];
  let promise = groupServices.updateGroupById(id, req.body);
  promise.then((result) => {
    if (!result) {
      res.status(404).send("Resource not found.");
    } else {
      res.status(200).send(result);
    }
  });
});

// for contacts
app.get("/contacts", authenticateUser, (req, res) => {
  const contact = req.query.contact;
  let promise = contactServices.getContacts(contact);
  promise.then((result) => {
    result = { contacts_list: result };
    res.send(result);
  });
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
  });
});

app.delete("/contacts/:id", authenticateUser, (req, res) => {
  const id = req.params["id"];
  let promise = contactServices.deleteContactById(id);
  promise.then((result) => {
    if (!result) {
      res.status(404).send("Resource not found.");
    } else {
      res.status(204).send();
    }
  });
});

app.post("/contacts", authenticateUser, (req, res) => {
  const contactToAdd = req.body;
  const promise = contactServices.addContact(contactToAdd);
  promise.then((newContact) => {
    res.status(201).send(newContact);
  });
});

// for preferences
app.get("/preferences", authenticateUser, (req, res) => {
  const preference = req.query.preference;
  let promise = preferenceServices.getPreferences(preference);
  promise.then((result) => {
    result = { preferences_list: result };
    res.send(result);
  });
});

app.get("/preferences/:id", authenticateUser, (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let promise = preferenceServices.findPrefById(id);
  promise.then((result) => {
    if (result === undefined) {
      res.status(404).send("Resource not found.");
    } else {
      res.send(result);
    }
  });
});

app.delete("/preferences", authenticateUser, (req, res) => {
  let promise = preferenceServices.deleteAllPreferences();
  promise
    .then((result) => {
      if (!result) {
        res.status(404).send("Resource not found.");
      } else {
        res.status(204).send();
      }
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post("/preferences", authenticateUser, (req, res) => {
  const prefToAdd = req.body;
  const promise = preferenceServices.addPref(prefToAdd);
  promise.then((newPref) => {
    res.status(201).send(newPref);
  });
});

// for unavailabilities
app.get("/unavailabilities", authenticateUser, (req, res) => {
  const eventName = req.query.eventName;
  const roommate = req.query.roommate;
  let promise = unavailabilityServices.getUnavailabilities(eventName, roommate);
  promise
    .then((result) => {
      result = { unavailabilities_list: result };
      res.send(result);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("An error occurred");
    });
});

app.get("/unavailabilities/:id", authenticateUser, (req, res) => {
  const id = req.params["id"];
  let promise = unavailabilityServices.findUnavailabilityById(id);
  promise
    .then((result) => {
      if (result === undefined) {
        res.status(404).send("Resource not found.");
      } else {
        res.send(result);
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("An error occurred");
    });
});

app.delete("/unavailabilities/:id", authenticateUser, (req, res) => {
  const id = req.params["id"];
  let promise = unavailabilityServices.deleteUnavailabilityById(id);
  promise
    .then((result) => {
      if (!result) {
        res.status(404).send("Resource not found.");
      } else {
        res.status(204).send();
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("An error occurred");
    });
});

app.post("/unavailabilities", authenticateUser, (req, res) => {
  const unavailabilityToAdd = req.body;
  const promise = unavailabilityServices.addUnavailability(unavailabilityToAdd);
  promise
    .then((newUnavailability) => {
      res.status(201).send(newUnavailability);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("An error occurred");
    });
});

app.post("/signup", registerUser);

app.post("/login", loginUser);

// app.listen(process.env.PORT || port, () => {
//   console.log("REST API is listening.");
// });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
