  // src/MyApp.jsx
  import React, { useState, useEffect } from "react";
  import {
    BrowserRouter as Router,
    Route,
    Routes,
    useNavigate,
  } from "react-router-dom";
  import "bootstrap/dist/css/bootstrap.min.css";
  import Navbar from "../navigation/Navbar";
  import ChoreTable from "./routes/ChoreTable";
  import ChoreForm from "./routes/ChoreForm";
  import Login from "./routes/Login";
  import EventTable from "./routes/EventTable";
  import EventForm from "./routes/EventForm";
  import GroupForm from "./routes/GroupForm";
  import ContactForm from "./routes/ContactForm";
  import ContactTable from "./routes/ContactTable";
  import PreferencesForm from "./routes/PreferencesForm";
  import AgreementTable from "./routes/AgreementTable";
  import { jwtDecode } from "jwt-decode";

  function MyApp() {
    const INVALID_TOKEN = "INVALID_TOKEN";
    const [token, setToken] = useState(INVALID_TOKEN);
    const [message, setMessage] = useState("");
    const [chores, setChores] = useState([]);
    const [characters, setCharacters] = useState([]);
    const [groups, setGroup] = useState([]);
    const [agreements, setAgreements] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [allContactsSubmitted, setAllContactsSubmitted] = useState(false);
    const navigate = useNavigate();

    // authentiation

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

    useEffect(() => {
      // check if the user logged in
      const token = localStorage.getItem("token");
    
      // if not logged in, or token expired, redirect to the login page
      if (!token || token === INVALID_TOKEN) {
        navigate("/login");
      } else {
        // need to decode the token to check for expiration
        const decodedToken = jwtDecode(token);
        const expirationTime = decodedToken.exp * 1000; // milliseconds conversion
    
        // check if token has expired
        if (Date.now() >= expirationTime) {
          navigate("/login");
        } else {
          setToken(token);
        }
      }
    }, []);    

    // group

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

    function fetchGroup(username) {
      const promise = fetch("Http://localhost:8000/groups?roommate=" + username, {
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

    function removeOneCharacter(index) {
      const updated = characters.filter((character, i) => {
        return i !== index;
      });
      setCharacters(updated);
    }
    
    // chore table

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

    function deleteChore(id) {
      const promise = fetch("Http://localhost:8000/chores/" + id, {
        method: "DELETE",
        headers: addAuthHeader(),
      });

      return promise;
    }

    function updatecharacterList(person) {
      setCharacters([...characters, person]);
    }

    // agreement form

    useEffect(() => {
      fetchAgreements()
        .then((res) => (res.status === 200 ? res.json() : undefined))
        .then((json) => {
          if (json) {
            setAgreements(json["agreements"]);
          } else {
            setAgreements(null);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }, [token]);

    function removeOneAgreement(index) {
      const id = agreements[index]._id;

      deleteAgreement(id)
        .then((res) => {
          if (res.status === 204) {
            const updated = agreements.filter((agreement, i) => {
              return i !== index;
            });
            setAgreements(updated);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    function deleteAgreement(id) {
      const promise = fetch("Http://localhost:8000/agreements/" + id, {
        method: "DELETE",
        headers: addAuthHeader(),
      });

      return promise;
    }

    function updateAgreements(agreement) {
      postAgreement(agreement)
        .then((res) => {
          if (res.status === 201) return res.json();
        })
        .then((json) => {
          if (json) {
            setAgreements([...agreements, json]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    function fetchAgreements() {
      const promise = fetch("Http://localhost:8000/agreements", {
        headers: addAuthHeader(),
      });

      return promise;
    }

    function postAgreement(agreement) {
      const promise = fetch("Http://localhost:8000/agreements", {
        method: "POST",
        headers: addAuthHeader({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(agreement),
      });

      return promise;
    }

    // contacts form
    useEffect(() => {
      fetchContacts()
        .then((res) => (res.status === 200 ? res.json() : undefined))
        .then((json) => {
          if (json) {
            setContacts(json["contacts_list"]);
          } else {
            setContacts(null);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }, [token]);

    function removeOneContact(index) {
      const id = contacts[index]._id;
      deleteContact(id)
        .then((res) => {
          if (res.status === 204) {
            const updated = contacts.filter((contact, i) => {
              return i !== index;
            });
            setContacts(updated);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    function deleteContact(id) {
      const promise = fetch("Http://localhost:8000/contacts/" + id, {
        method: "DELETE",
        headers: addAuthHeader(),
      });

      return promise;
    }

    function updateContacts(contact) {
      postContact(contact)
        .then((res) => {
          if (res.status === 201) return res.json();
        })
        .then((json) => {
          if (json) {
            setContacts([...contacts, json]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    function fetchContacts() {
      const promise = fetch("Http://localhost:8000/contacts", {
        headers: addAuthHeader(),
      });

      return promise;
    }

    function postContact(contact) {
      const promise = fetch("Http://localhost:8000/contacts", {
        method: "POST",
        headers: addAuthHeader({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(contact),
      });

      return promise;
    }

    useEffect(() => {
      fetchContacts()
        .then((res) => (res.status === 200 ? res.json() : undefined))
        .then((json) => {
          if (json) {
            setContacts(json["contacts_list"]);
            // Check if all agreements have been submitted
            fetchGroup(localStorage.getItem("current user"))
              .then((res) => (res.status === 200 ? res.json() : undefined))
              .then((groupJson) => {
                if (groupJson) {
                  const roommatesCount = groupJson[0].roommates.length;
                  if (json["contacts_list"].length === roommatesCount) {
                    setAllContactsSubmitted(true);
                  }
                }
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            setContacts(null);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }, [token]);  

    return (
      <div className="container">
        <Routes>
          <Route path="/login" element={<Login handleSubmit={loginUser} 
            loginButtonStyle={{ backgroundColor: "#00AA9E", borderColor: "#0a978d" }}/>} />
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
              path="/agreement"
              element={
                <>
                  <Navbar handleLogout={handleLogout} copyLink={copyLink} />
                  <ContactTable
                    contactData={contacts}
                    removeContact={removeOneContact}
                  />
                  {!allContactsSubmitted && (
                    <ContactForm handleSubmit={updateContacts} />
                  )}
                  {/* <PreferencesForm handleSubmit={updateContacts} /> */}
                </>
              }
            />
          <Route
            path="/"
            element={
              <>
                <Navbar handleLogout={handleLogout} copyLink={copyLink} />
                <ChoreTable choreData={chores} removeChore={removeOneChore} />
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
