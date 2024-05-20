  // src/MyApp.jsx
  import React, { useState, useEffect } from "react";
  import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
  import ChoreTable from "./routes/ChoreTable";
  import ChoreForm from "./routes/ChoreForm";
  import Login from "./routes/Login";
  import EventTable from "./routes/EventTable";
  import EventForm from "./routes/EventForm";
  import GroupForm from "./routes/GroupForm";

  function MyApp() {
    const INVALID_TOKEN = "INVALID_TOKEN";
    const [token, setToken] = useState(INVALID_TOKEN);
    const [message, setMessage] = useState("");
    const [chores, setChores] = useState([]);
    const [characters, setCharacters] = useState([]);
    const navigate = useNavigate();

    function addAuthHeader(otherHeaders = {}) {
      const storedToken = localStorage.getItem("token");
      if (!storedToken || storedToken === INVALID_TOKEN) {
        return otherHeaders;
      } else {
        return {
          ...otherHeaders,
          Authorization: `Bearer ${storedToken}`
        };
      }
    }

    function handleTokenSave(token, rememberMe) {
      if (rememberMe) {
        localStorage.setItem("token", token);
      }
      setToken(token);
    }

    function handleLogout() {
      localStorage.removeItem("token");
      setToken(INVALID_TOKEN);
      setMessage("Logged out successfully.");
      navigate("/login");
    }

    function signupUser(creds, rememberMe) {
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
              .then((payload) => handleTokenSave(payload.token, rememberMe));
            setMessage(
              `Signup successful for user: ${creds.username}; auth token saved`
            );
            navigate("/createGroup");
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

    function loginUser(creds, rememberMe) {
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
              .then((payload) => handleTokenSave(payload.token, rememberMe));
            setMessage(`Login successful; auth token saved`);
            navigate("/");
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
  
  function createGroup(group) {
    const promise = fetch("http://localhost:8000/groups", {
      method: "POST",
      headers: addAuthHeader({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(group)
    })
    .then(response => {
      if (response.status === 201) {
        return response.json();
      } else {
        return response.json().then(data => {
          throw new Error(data.message || `Error ${response.status}`);
        });
      }
    })
    .then(payload => {
      setMessage("Group successfully created.");
      console.log("Group creation successful, navigating to home."); // Debugging line
      navigate("/"); // Correctly navigate to the home page
    })
    .catch(error => {
      setMessage(`Group Creation Error: ${error.message}`);
      console.error("Group creation error:", error); // Debugging line
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

    function updatecharacterList(person) {
      setCharacters([...characters, person]);
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
    }, [token] );

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
    
    
    function deleteChore(id){
      const promise = fetch("Http://localhost:8000/chores/" + id, {
        method: "DELETE",
        headers: addAuthHeader()
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
              element={<Login handleSubmit={signupUser} buttonLabel = "Sign Up" />}
            />
            <Route
            path="/createGroup"
            element={<GroupForm handleSubmit={createGroup} buttonLabel = "Create Group" />}
            />
            <Route 
              path="/"
              element={<>
                <button className="logout-button" onClick={handleLogout}> Logout </button>
                <ChoreTable
                  choreData={chores}
                  removeChore={removeOneChore}
                />
                <ChoreForm handleSubmit={updateList} />
                <EventTable
                  characterData={characters}
                  removeCharacter={removeOneCharacter}
                />
                <EventForm handleSubmit={updatecharacterList} />
              </> } 
            />
        </Routes>
      </div>
    );
  }

  export default MyApp;

