import React, { useState } from "react";
import EventTable from "./EventTable";
import EventForm from "./EventForm";

function MyApp() {
  const [characters, setCharacters] = useState([]);
   function removeOneCharacter(index) {
    const updated = characters.filter((character, i) => {
      return i !== index;
    });
    setCharacters(updated);
  }
  
  function updateList(person) {
  setCharacters([...characters, person]);
}
  return (
  <div className="container">
    <EventTable
      characterData={characters}
      removeCharacter={removeOneCharacter}
    />
  <EventForm handleSubmit={updateList} />
  </div>
  
);
}

export default MyApp;

