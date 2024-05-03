// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

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
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(index) {
    const id = characters[index]._id

    deleteUser(id)
      .then((res) => {
        if(res.status === 204){
          const updated = characters.filter((character, i) => {
            return i !== index;
          })
          setCharacters(updated);
        }})
      .catch((error) => {
        console.log(error)
      })
  }

  function updateList(person){
    postUser(person)
      .then((res) => {
        if(res.status === 201)
          return res.json()})
      .then((json) => {
        if (json){
          setCharacters([...characters, json])
        }
        
      })
      .catch((error) => {
        console.log(error);
      })
  }

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => { console.log(error); });
  }, [] );

  function postUser(person) {
    const promise = fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

  function deleteUser(id){
    const promise = fetch("Http://localhost:8000/users/" + id, {
      method: "DELETE",
    })

    return promise;
  }

  return (
    <div className = "container">
      <Table 
      characterData = {characters} 
      removeCharacter = {removeOneCharacter}
      />
      <Form handleSubmit = {updateList}/>
    </div>
  );
}
export default MyApp;