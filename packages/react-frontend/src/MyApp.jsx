// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";
import ChoreTable from "./ChoreTable";
import ChoreForm from "./ChoreForm";
import Login from "./Login";
import EventTable from "./EventTable";
import EventForm from "./EventForm";

function MyApp() {
  const INVALID_TOKEN = "INVALID_TOKEN";
  const [token, setToken] = useState(INVALID_TOKEN);
  const [message, setMessage] = useState("");
  const [chores, setChores] = useState([]);
  const [characters, setCharacters] = useState([]);
  const navigate = useNavigate();

  function addAuthHeader(otherHeaders = {}) {
    if (token === INVALID_TOKEN) {
      return otherHeaders;
    } else {
      return {
        ...otherHeaders,
        Authorization: `Bearer ${token}`,
      };
    }
  }

  function signupUser(creds) {
    const promise = fetch("Http://localhost:8000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    })
      .then((response) => {
        if (response.status === 201) {
          response.json().then((payload) => setToken(payload.token));
          setMessage(
            `Signup successful for user: ${creds.username}; auth token saved`
          );
          navigate("/");
        } else {
          setMessage(`Signup Error ${response.status}: ${response.data}`);
        }
      })
      .catch((error) => {
        setMessage(`Signup Error: ${error}`);
      });

    return promise;
  }

  function loginUser(creds) {
    const promise = fetch("Http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    })
      .then((response) => {
        if (response.status === 200) {
          response.json().then((payload) => setToken(payload.token));
          setMessage(`Login successful; auth token saved`);
          navigate("/");
        } else {
          setMessage(`Login Error ${response.status}: ${response.data}`);
        }
      })
      .catch((error) => {
        setMessage(`Login Error: ${error}`);
      });

    return promise;
  }

  function removeOneCharacter(index) {
    const updated = characters.filter((character, i) => {
      return i !== index;
    });
    setCharacters(updated);
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

  function updatecharacterList(person) {
    setCharacters([...characters, person]);
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

  function updatecharacterList(person) {
    setCharacters([...characters, person]);
  }
  function fetchChores() {
    const promise = fetch("Http://localhost:8000/chores", {
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
    if (!token) {
      navigate("/login");
    }
  }, []);

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

  function updateChore(index) {
    const id = chores[index]._id;
    const chore = chores[index];
    putChore(id, chore)
      .then((res) => {
        if (res.status === 200) return res.json();
      })
      .then((json) => {
        if (json) {
          const updated = chores.toSpliced(index, 1, json);
          setChores(updated);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function putChore(id, chore) {
    console.log(chore);
    console.log(chore.chore);
    console.log(chore.roommate);
    const promise = fetch("Http://localhost:8000/chores/" + id, {
      method: "PUT",
      headers: addAuthHeader({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        chore: chore.chore,
        roommate: chore.roommate,
        status: "Completed",
        day: chore.day,
      }),
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

  return (
    <div className="container">
      {/* <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav> */}
      <Routes>
        <Route path="/login" element={<Login handleSubmit={loginUser} />} />
        <Route
          path="/signup"
          element={<Login handleSubmit={signupUser} buttonLabel="Sign Up" />}
        />
        <Route
          path="/"
          element={
            <>
              <ChoreTable
                choreData={chores}
                removeChore={removeOneChore}
                updateChoreStatus={updateChore}
              />
              <ChoreForm handleSubmit={updateList} />
              <EventTable
                characterData={characters}
                removeCharacter={removeOneCharacter}
              />
              <EventForm handleSubmit={updatecharacterList} />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default MyApp;
