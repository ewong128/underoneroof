// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, useLocation, Navigate, Outlet } from "react-router-dom";
import Table from "./Table";
import ChoreTable from "./ChoreTable";
import Form from "./Form";
import ChoreForm from "./ChoreForm";
import Login from "./Login";

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
    const navigate = useNavigate();
  
    const promise = fetch("Http://localhost:8000/signup", {
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
          navigate("/");
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

  function loginUser(creds) {
    const promise = fetch("Http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(creds)
    })
      .then((response) => {
        if (response.status === 200) {
          response
            .json()
            .then((payload) => setToken(payload.token));
          setMessage(`Login successful; auth token saved`);
        } else {
          setMessage(
            `Login Error ${response.status}: ${response.data}`
          );
        }
      })
      .catch((error) => {
        setMessage(`Login Error: ${error}`);
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
    const promise = fetch("Http://localhost:8000/chores", {
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
      <div className="container">
        <Routes> 
          <Route
            path="/login"
            element={<Login handleSubmit={loginUser} />}
          />
          <Route
            path="/signup"
            element={<Login handleSubmit={signupUser} buttonLabel="Sign Up" />}
          />
        </Routes>
        <ChoreTable
          choreData = {chores} 
          removeChore = {removeOneChore}
        />
        <ChoreForm handleSubmit={updateList} />
      </div>
  );
}
export default MyApp;