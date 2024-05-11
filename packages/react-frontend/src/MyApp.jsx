// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Table from "./Table";
import ChoreTable from "./ChoreTable";
import Form from "./Form";
import ChoreForm from "./ChoreForm";

const initialcharacters = [
  {
    name: "Charlie",
    job: "Janitor"
  },
  {
    name: "Mac",
    job: "Bouncer"
  },
  {
    name: "Dee",
    job: "Aspring actress"
  },
  {
    name: "Dennis",
    job: "Bartender"
  }
];

function MyApp() {
  const INVALID_TOKEN = "INVALID_TOKEN";
  const [token, setToken] = useState(INVALID_TOKEN);
  const [message, setMessage] = useState("");
  const [chores, setChores] = useState([]);

  function addAuthHeader(otherHeaders = {}) {
    if (token === INVALID_TOKEN) {
      return otherHeaders;
    } else {
      return {
        ...otherHeaders,
        Authorization: `Bearer ${token}`
      };
    }
  }

  function signupUser(creds) {
    const promise = fetch(`${API_PREFIX}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(creds)
    })
      .then((response) => {
        if (response.status === 201) {
          response
            .json()
            .then((payload) => setToken(payload.token));
          setMessage(
            `Signup successful for user: ${creds.username}; auth token saved`
          );
        } else {
          setMessage(
            `Signup Error ${response.status}: ${response.data}`
          );
        }
      })
      .catch((error) => {
        setMessage(`Signup Error: ${error}`);
      });
  
    return promise;
  }

  function removeOneChore(index) {
    const id = chores[index]._id

    deleteChore(id)
      .then((res) => {
        if(res.status === 204){
          const updated = chores.filter((chore, i) => {
            return i !== index;
          })
          setChores(updated);
        }})
      .catch((error) => {
        console.log(error)
      })
  }

  function updateList(chore){
    postChore(chore)
      .then((res) => {
        if(res.status === 201)
          return res.json()})
      .then((json) => {
        if (json){
          setChores([...chores, json])
        }
        
      })
      .catch((error) => {
        console.log(error);
      })
  }

  function fetchChores() {
    const promise = fetch(`${API_PREFIX}/chores`, {
      headers: addAuthHeader()
    });
  
    return promise;
  }

  useEffect(() => {
    fetchChores()
      .then((res) =>
        res.status === 200 ? res.json() : undefined
      )
      .then((json) => {
        if (json) {
          setChores(json["chores_list"]);
        } else {
          setChores(null);
        }
      })
      .catch((error) => { console.log(error); });
  }, [] );

  function postChore(chore) {
    const promise = fetch("Http://localhost:8000/chores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chore),
    });

    return promise;
  }

  function deleteChore(id){
    const promise = fetch("Http://localhost:8000/chores/" + id, {
      method: "DELETE",
    })

    return promise;
  }

  return (
    <Router> 
      <div className="container">
        <Route
          path="/login"
          element={<Login handleSubmit={loginUser} />}
        />
        <Route
          path="/signup"
          element={<Login handleSubmit={signupUser} buttonLabel="Sign Up" />}
        />
        <ChoreTable
          choreData = {chores} 
          removeChore = {removeOneChore}
        />
        <ChoreForm handleSubmit={updateList} />
      </div>
    </Router>
  );
}
export default MyApp;