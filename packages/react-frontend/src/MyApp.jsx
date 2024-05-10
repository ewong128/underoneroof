// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import ChoreTable from "./ChoreTable";
import ChoreForm from "./ChoreForm";
import EventTable from "./EventTable";
import EventForm from "./EventForm";

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
  const [chores, setChores] = useState([]);
  const [characters, setCharacters] = useState([]);
   

  function removeOneCharacter(index) {
    const updated = characters.filter((character, i) => {
      return i !== index;
	  
	  });
    setCharacters(updated);
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

function updatecharacterList(person) {
  setCharacters([...characters, person]);
}
  function fetchChores() {
    const promise = fetch("http://localhost:8000/chores");
    return promise;
  }

  useEffect(() => {
    fetchChores()
      .then((res) => res.json())
      .then((json) => setChores(json["chores_list"]))
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
  <ChoreTable 
      choreData = {chores} 
      removeChore = {removeOneChore}
      />
      <ChoreForm handleSubmit = {updateList}/>
    <EventTable
      characterData={characters}
      removeCharacter={removeOneCharacter}
    />
  <EventForm handleSubmit={updateList} />
  </div>
  
);
}

export default MyApp;

