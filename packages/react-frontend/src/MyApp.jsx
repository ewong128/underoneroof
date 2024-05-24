// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import ChoreTable from "./routes/ChoreTable";
import ChoreForm from "./routes/ChoreForm";
import Login from "./routes/Login";
import EventTable from "./routes/EventTable";
import EventForm from "./routes/EventForm";
import GroupForm from "./routes/GroupForm";
import { jwtDecode } from "jwt-decode";

function MyApp() {
  const INVALID_TOKEN = "INVALID_TOKEN";
  const [token, setToken] = useState(INVALID_TOKEN);
  const [message, setMessage] = useState("");
  const [chores, setChores] = useState([]);
  const [events, setEvents] = useState([]);
  const [groups, setGroup] = useState([]);
  const navigate = useNavigate();

  function addAuthHeader(otherHeaders = {}) {
    const storedToken = localStorage.getItem("token");
    console.log("in auth header");
    if (!storedToken || storedToken === INVALID_TOKEN) {
      console.log('no stored token found"');
      return otherHeaders;
    } else {
      console.log("token in header");
      return {
        ...otherHeaders,
        Authorization: `Bearer ${storedToken}`,
      };
    }
  }

  function handleTokenSave(token, rememberMe) {
    if (rememberMe) {
      localStorage.setItem("token", token);
    }
    localStorage.setItem("token", token);
    setToken(token);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setToken(INVALID_TOKEN);
    setMessage("Logged out successfully.");
    navigate("/login");
  }

  function signupUser(creds, rememberMe) {
    creds.rememberMe = rememberMe;
    localStorage.setItem("current user", creds.username);
    const promise = fetch("Http://localhost:8000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    })
      .then((response) => {
        if (response.status === 201) {
          response
            .json()
            .then((payload) => handleTokenSave(payload.token, rememberMe));
          setMessage(
            `Signup successful for user: ${creds.username}; auth token saved`
          );
          navigate("/createGroup");
        } else {
          setMessage(`Signup Error ${response.status}: ${response.data}`);
        }
      })
      .catch((error) => {
        setMessage(`Signup Error: ${error}`);
      });

    return promise;
  }

  // check for next component
  function loginUser(creds, rememberMe, next) {
    localStorage.setItem("current user", creds.username);
    creds.rememberMe = rememberMe;
    const promise = fetch("Http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    })
      .then((response) => {
        if (response.status === 200) {
          response
            .json()
            .then((payload) => handleTokenSave(payload.token, rememberMe));
          setMessage(`Login successful; auth token saved`);
          navigate(next || "/");
        } else {
          setMessage(`Login Error ${response.status}: ${response.data}`);
        }
      })
      .catch((error) => {
        setMessage(`Login Error: ${error}`);
      });

    return promise;
  }

  function createGroup(group, rememberMe) {
    const currentUser = localStorage.getItem("current user");
    group.roommates.push(currentUser);
    console.log(group.roommates);
    //group.roommates.append(currentUser);
    const promise = fetch("Http://localhost:8000/groups", {
      method: "POST",
      headers: addAuthHeader({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(group),
    })
      .then((res) => {
        if (res.status === 201) return res.json();
      })
      .then((json) => {
        if (json) {
          console.log("create group");
          setGroup([...groups, json]);
          navigate("/");
        }
      })
      .catch((error) => {
        console.log("error in create group");
        console.log(error);
      });

    return promise;
  }

  function removeOneEvent(index) {
    const id = events[index]._id

    deleteEvents(id)
      .then((res) => {
        if(res.status === 204){
          const updated = events.filter((events, i) => {
            return i !== index;
          })
          setEvents(updated);
        }})
      .catch((error) => {
        console.log(error)
      })
  }

  function removeOneChore(index) {
    const id = chores[index]._id;

    deleteChore(id)
      .then((res) => {
        if (res.status === 204) {
          const updated = chores.filter((chore, i) => {
            return i !== index;
          });
          setChores(updated);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function updateList(chore) {
    postChore(chore)
      .then((res) => {
        if (res.status === 201) return res.json();
      })
      .then((json) => {
        if (json) {
          setChores([...chores, json]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

function updateEventList(event) {
  postEvent(event)
      .then((res) => {
        if(res.status === 201)
          return res.json()})
      .then((json) => {
        if (json){
          setEvents([...events, json])
        }
        
      })
      .catch((error) => {
        console.log(error);
      })
}
  function fetchChores() {
    const promise = fetch("Http://localhost:8000/chores", {
      headers: addAuthHeader(),
    });

    return promise;
  }

  function fetchGroup(username) {
    const promise = fetch("Http://localhost:8000/groups?roommate=" + username, {
      headers: addAuthHeader(),
    });

    return promise;
  }
 

  useEffect(() => {
    fetchChores()
      .then((res) => (res.status === 200 ? res.json() : undefined))
      .then((json) => {
        if (json) {
          setChores(json["chores_list"]);
        } else {
          setChores(null);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  useEffect(() => {
    // Check if the user is logged in
    const token = localStorage.getItem("token");
    // If not logged in, redirect to the login page
    if (!token || token === INVALID_TOKEN) {
      navigate("/login");
    } else {
      setToken(token);
    }
  }, []);

 function fetchEvents() {
  const promise = fetch("Http://localhost:8000/events", {
    headers: addAuthHeader(),
  });
    return promise;
  }
 

  useEffect(() => {
    fetchEvents()
      .then((res) => (res.status === 200 ? res.json() : undefined))
      .then((json) => {
        if (json) {
          setEvents(json["events_list"]);
        } else {
          setEvents(null);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  function postChore(chore) {
    const promise = fetch("Http://localhost:8000/chores", {
      method: "POST",
      headers: addAuthHeader({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(chore),
});

    return promise;
  }
  
  function postEvent(events) {
    const promise = fetch("Http://localhost:8000/events", {
      method: "POST",
      headers: addAuthHeader({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(events),
});

    return promise;
  }

  function deleteChore(id) {
    const promise = fetch("Http://localhost:8000/chores/" + id, {
      method: "DELETE",
      headers: addAuthHeader(),
    });

    return promise;
  }


 function deleteEvents(id){
  const promise = fetch("Http://localhost:8000/events/" + id, {
    method: "DELETE",
    headers: addAuthHeader(),
  });

    return promise;
  }

  function copyLink() {
    const currentUser = localStorage.getItem("current user");
    let group_id = "";
    console.log(currentUser);
    fetchGroup(currentUser)
      .then((res) => (res.status === 200 ? res.json() : undefined))
      .then((json) => {
        if (json) {
          group_id = json[0]._id.toString();
          console.log(group_id);
          navigator.clipboard.writeText(
            "Http://localhost:5173/login?next=acceptInvitation?group=" +
              group_id
          );
        } else {
          //setChores(null);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="container">
      <Routes>
        <Route path="/login" element={<Login handleSubmit={loginUser} />} />
        <Route
          path="/signup"
          element={<Login handleSubmit={signupUser} buttonLabel="Sign Up" />}
        />
        <Route
          path="/createGroup"
          element={
            <GroupForm handleSubmit={createGroup} buttonLabel="Create Group" />
          }
        />
        <Route
          path="/createGroup"
          element={
            <GroupForm handleSubmit={createGroup} buttonLabel="Create Group" />
          }
        />
        <Route
          path="/"
          element={
            <>
              <button className="logout-button" onClick={handleLogout}>
                {" "}
                Logout{" "}
              </button>
              <button className="invite" onClick={copyLink}>
                Invite Roommates
              </button>
              <ChoreTable choreData={chores} removeChore={removeOneChore} />
              <ChoreForm handleSubmit={updateList} />
              <EventTable
                eventData={events}
                removeEvents={removeOneEvent}
              />
              <EventForm handleSubmit={updateEventList} />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default MyApp;
