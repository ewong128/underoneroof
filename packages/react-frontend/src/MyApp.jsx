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
  const [events, setEvents] = useState([]);
   

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
    const promise = fetch("http://localhost:8000/chores");
    return promise;
  }
 

  useEffect(() => {
    fetchChores()
      .then((res) => res.json())
      .then((json) => setChores(json["chores_list"]))
      .catch((error) => { console.log(error); });
  }, [] );

 function fetchEvents() {
    const promise = fetch("http://localhost:8000/events");
    return promise;
  }
 

  useEffect(() => {
    fetchEvents()
      .then((res) => res.json())
      .then((json) => setEvents(json["events_list"]))
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
  
  function postEvent(events) {
    const promise = fetch("Http://localhost:8000/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(events),
});

    return promise;
  }
  
  
  function deleteChore(id){
    const promise = fetch("Http://localhost:8000/chores/" + id, {
      method: "DELETE",
    })

    return promise;
  }


 function deleteEvents(id){
    const promise = fetch("Http://localhost:8000/events/" + id, {
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
      eventData={events}
      removeEvents={removeOneEvent}
    />
  <EventForm handleSubmit={updateEventList} />
  </div>
  
);
}

export default MyApp;

