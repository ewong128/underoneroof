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
import Invitation from "./routes/Invitation";
import ContactForm from "./routes/ContactForm";
import ContactTable from "./routes/ContactTable";
import PreferencesForm from "./routes/PreferencesForm";
import PreferencesTable from "./routes/PreferencesTable";
import UnavailabilityTable from "./routes/UnavailabilityTable";
import UnavailabilityForm from "./routes/UnavailabilityForm";
import { jwtDecode } from "jwt-decode";
("");

function MyApp() {
  const link = "https://underoneroof.azurewebsites.net";
  // const link = "http://localhost:8000";
  const INVALID_TOKEN = "INVALID_TOKEN";
  const [token, setToken] = useState(INVALID_TOKEN);
  const [message, setMessage] = useState("");
  const [chores, setChores] = useState([]);
  const [events, setEvents] = useState([]);
  const [groups, setGroup] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [allContactsSubmitted, setAllContactsSubmitted] = useState(false);
  const [preferences, setPreferences] = useState([]);
  const navigate = useNavigate();
  const currentUser = localStorage.getItem("current user");
  const [unavailabilities, setUnavailabilities] = useState([]);

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

  function signupUser(creds, rememberMe, next) {
    console.log(next);
    creds.rememberMe = rememberMe;
    localStorage.setItem("current user", creds.username);
    const promise = fetch(link + "/signup", {
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
          navigate(next || "/createGroup");
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
    const promise = fetch(link + "/login", {
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
          console.log(next);
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
    const promise = fetch(link + "/groups", {
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
    const promise = fetch(link + "/groups?roommate=" + username, {
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
          //navigator.clipboard.writeText(
          //"Http://localhost:5173/login?next=acceptInvitation?group=" +
          //group_id
          //);
          navigator.clipboard.writeText(
            link + "/login?next=acceptInvitation?group=" + group_id
          );
        } else {
          //setChores(null);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function removeOneEvent(index) {
    const id = events[index]._id;

    deleteEvents(id)
      .then((res) => {
        if (res.status === 204) {
          const updated = events.filter((events, i) => {
            return i !== index;
          });
          setEvents(updated);
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
    const currentUser = localStorage.getItem("current user");
    fetchGroup(currentUser)
      .then((res) => (res.status === 200 ? res.json() : undefined))
      .then((json) => {
        if (json) {
          console.log(json);
          chore.group_id = json[0]._id.valueOf();
          console.log(chore.group_id);
          return chore;
        }
      })
      .then((chore) => {
        console.log(chore);
        postChore(chore)
          .then((res) => {
            if (res.status === 201) return res.json();
          })
          .then((json) => {
            if (json) {
              console.log(json);
              setChores([...chores, json]);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function updateEventList(events) {
    const currentUser = localStorage.getItem("current user");
    fetchGroup(currentUser)
      .then((res) => (res.status === 200 ? res.json() : undefined))
      .then((json) => {
        if (json) {
          console.log(json);
          events.group_id = json[0]._id.valueOf();
          console.log(events.group_id);
          return events;
        }
      })
      .then((events) => {
        console.log(events);
        postEvent(events)
          .then((res) => {
            if (res.status === 201) return res.json();
          })
          .then((json) => {
            if (json) {
              // setEvents([...events, json])
              setEvents((prevEvents) => [...prevEvents, json]);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function fetchChores() {
    const promise = fetch(link + "/chores", {
      headers: addAuthHeader(),
    });

    return promise;
  }

  function fetchGroup(username) {
    const promise = fetch(link + "/groups?roommate=" + username, {
      headers: addAuthHeader(),
    });

    return promise;
  }

  function fetchGroupById(id) {
    const promise = fetch(link + "/groups/" + id, {
      headers: addAuthHeader(),
    });

    return promise;
  }

  function fetchGroup(username) {
    const promise = fetch(link + "/groups?roommate=" + username, {
      headers: addAuthHeader(),
    });

    return promise;
  }

  function fetchGroupById(id) {
    const promise = fetch(link + "/groups/" + id, {
      headers: addAuthHeader(),
    });

    return promise;
  }

  useEffect(() => {
    let group_id;
    let currentUser = localStorage.getItem("current user");
    console.log(currentUser);
    fetchGroup(currentUser)
      .then((res) => (res.status === 200 ? res.json() : undefined))
      .then((json) => {
        if (json) {
          console.log(json);
          group_id = json[0]._id.valueOf();
          console.log(group_id);
          return group_id;
        }
      })
      .then((group_id) => {
        fetchChores()
          .then((res) => (res.status === 200 ? res.json() : undefined))
          .then((json) => {
            if (json) {
              console.log(json);
              const updated = json["chores_list"].filter((chore, i) => {
                console.log(chore);
                console.log(chore.group_id);
                console.log(group_id);
                return chore.group_id === group_id;
              });
              console.log(updated);
              setChores(updated);
            } else {
              setChores(null);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });
  }, [token]);

  function fetchEvents() {
    const promise = fetch(link + "/events", {
      headers: addAuthHeader(),
    });
    return promise;
  }

  useEffect(() => {
    let group_id;
    let currentUser = localStorage.getItem("current user");
    console.log(currentUser);
    fetchGroup(currentUser)
      .then((res) => (res.status === 200 ? res.json() : undefined))
      .then((json) => {
        if (json) {
          console.log(json);
          group_id = json[0]._id.valueOf();
          console.log(group_id);
          return group_id;
        }
      })
      .then((group_id) => {
        fetchEvents()
          .then((res) => (res.status === 200 ? res.json() : undefined))
          .then((json) => {
            if (json) {
              const updated = json["events_list"].filter((event, i) => {
                console.log(event);
                console.log(event.group_id);
                console.log(group_id);
                return event.group_id === group_id;
              });
              setEvents(updated);
            } else {
              setEvents(null);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });
  }, [token]);

  //useEffect(() => {
  //fetchEvents()
  //.then((res) => (res.status === 200 ? res.json() : undefined))
  //.then((json) => {
  //if (json) {
  //setEvents(json["events_list"]);
  //} else {
  //setEvents(null);
  //}
  //})
  //.catch((error) => {
  //console.log(error);
  //});
  //}, [token]);

  function postEvent(event) {
    const promise = fetch(link + "/events", {
      method: "POST",
      headers: addAuthHeader({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(event),
    });
    return promise;
  }

  function postChore(chore) {
    const promise = fetch(link + "/chores", {
      method: "POST",
      headers: addAuthHeader({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(chore),
    });

    return promise;
  }

  function deleteChore(id) {
    const promise = fetch(link + "/chores/" + id, {
      method: "DELETE",
      headers: addAuthHeader(),
    });

    return promise;
  }
  function deleteEvents(id) {
    const promise = fetch(link + "/events/" + id, {
      method: "DELETE",
      headers: addAuthHeader(),
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
          console.log(json);
          setChores(chores.toSpliced(index, 1, json));
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
    const promise = fetch(link + "/chores/" + id, {
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

          // check if all contacts have been submitted
          fetchGroup(localStorage.getItem("current user"))
            .then((res) => (res.status === 200 ? res.json() : undefined))
            .then((groupJson) => {
              if (groupJson) {
                const roommatesCount = groupJson[0].roommates.length;
                if (updated.length === roommatesCount) {
                  setAllContactsSubmitted(true);
                } else {
                  setAllContactsSubmitted(false);
                }
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function deleteContact(id) {
    const promise = fetch(link + "/contacts/" + id, {
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

          // for no refresh
          // check if all agreements submitted based on # of roommates
          fetchGroup(localStorage.getItem("current user"))
            .then((res) => (res.status === 200 ? res.json() : undefined))
            .then((groupJson) => {
              if (groupJson) {
                const roommatesCount = groupJson[0].roommates.length;
                if (contacts.length + 1 === roommatesCount) {
                  setAllContactsSubmitted(true);
                }
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function fetchContacts() {
    const promise = fetch(link + "/contacts", {
      headers: addAuthHeader(),
    });

    return promise;
  }

  function postContact(contact) {
    const promise = fetch(link + "/contacts", {
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

  // for preferences
  useEffect(() => {
    fetchPreferences()
      .then((res) => (res.status === 200 ? res.json() : undefined))
      .then((json) => {
        if (json) {
          setPreferences(json["preferences_list"]);
        } else {
          setPreferences(null);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  function removeAllPreferences() {
    deleteAllPreferences()
      .then((res) => {
        if (res.status === 204) {
          setPreferences([]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function deleteAllPreferences() {
    const promise = fetch(link + "/preferences", {
      method: "DELETE",
      headers: addAuthHeader(),
    });

    return promise;
  }

  function updatePreferences(preference) {
    postPreference(preference)
      .then((res) => {
        if (res.status === 201) return res.json();
      })
      .then((json) => {
        if (json) {
          setPreferences([...preferences, json]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function updateGroup(group_id) {
    const currentUser = localStorage.getItem("current user");
    console.log("before put group");
    console.log(group_id);
    let group = null;

    fetchGroupById(group_id)
      .then((res) => (res.status === 200 ? res.json() : undefined))
      .then((json) => {
        if (json) {
          console.log(json);
          console.log(json[0]);
          group = json;

          putGroup(group_id, currentUser, group)
            .then((res) => {
              navigate("/");
              //if (res.status === 200) return res.json();
            })
            .then((json) => {
              if (json) {
                console.log(json);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function putGroup(id, currentUser, group) {
    const promise = fetch(link + "/groups/" + id, {
      method: "PUT",
      headers: addAuthHeader({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        group: group.name,
        roommates: group.roommates.concat([currentUser]),
      }),
    });

    return promise;
  }

  function fetchPreferences() {
    const promise = fetch(link + "/preferences", {
      headers: addAuthHeader(),
    });

    return promise;
  }

  function postPreference(preference) {
    const promise = fetch(link + "/preferences", {
      method: "POST",
      headers: addAuthHeader({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(preference),
    });

    return promise;
  }

  //unavailability functions

  function removeOneUnavailability(index) {
    const id = unavailabilities[index]._id;

    deleteUnavailability(id)
      .then((res) => {
        if (res.status === 204) {
          const updated = unavailabilities.filter((unavailability, i) => {
            return i !== index;
          });
          setUnavailabilities(updated);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function updateUnavailabilityList(unavailability) {
    postUnavailability(unavailability)
      .then((res) => {
        if (res.status === 201) return res.json();
      })
      .then((json) => {
        if (json) {
          setUnavailabilities((prevUnavailabilities) => [
            ...prevUnavailabilities,
            json,
          ]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function fetchUnavailabilities() {
    const promise = fetch(link + "/unavailabilities", {
      headers: addAuthHeader(),
    });

    return promise;
  }

  useEffect(() => {
    fetchUnavailabilities()
      .then((res) => (res.status === 200 ? res.json() : undefined))
      .then((json) => {
        if (json) {
          setUnavailabilities(json["unavailabilities_list"]);
        } else {
          setUnavailabilities(null);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  function postUnavailability(unavailability) {
    const promise = fetch(link + "/unavailabilities", {
      method: "POST",
      headers: addAuthHeader({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(unavailability),
    });

    return promise;
  }

  function deleteUnavailability(id) {
    const promise = fetch(link + "/unavailabilities/" + id, {
      method: "DELETE",
      headers: addAuthHeader(),
    });

    return promise;
  }

  return (
    <div className="container">
      <Routes>
        <Route
          path="/login"
          element={
            <Login
              handleSubmit={loginUser}
              loginButtonStyle={{
                backgroundColor: "#00AA9E",
                borderColor: "#0a978d",
              }}
            />
          }
        />
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
          path="/acceptInvitation"
          element={<Invitation handleSubmit={updateGroup} />}
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
              <PreferencesTable
                preferencesData={preferences}
                removePreference={removeAllPreferences}
              />
              {preferences && preferences.length === 0 && (
                <PreferencesForm handleSubmit={updatePreferences} />
              )}
            </>
          }
        />
        <Route
          path="/agreement"
          element={
            <>
              <Navbar handleLogout={handleLogout} copyLink={copyLink} />
              <div className="welcome-message" style={{ float: "right" }}>
                {currentUser && (
                  <div>
                    Welcome back,{" "}
                    <span style={{ fontWeight: "bold" }}>{currentUser}</span>!
                  </div>
                )}
              </div>
              <ContactTable
                contactData={contacts}
                removeContact={removeOneContact}
              />
              {!allContactsSubmitted && (
                <ContactForm handleSubmit={updateContacts} />
              )}
              <PreferencesTable
                preferencesData={preferences}
                removePreference={removeAllPreferences}
              />
              {preferences && preferences.length === 0 && (
                <PreferencesForm handleSubmit={updatePreferences} />
              )}
            </>
          }
        />
        <Route
          path="/"
          element={
            <>
              <Navbar handleLogout={handleLogout} copyLink={copyLink} />
              <div className="welcome-message" style={{ float: "right" }}>
                {currentUser && (
                  <div>
                    Welcome back,{" "}
                    <span style={{ fontWeight: "bold" }}>{currentUser}</span>!
                  </div>
                )}
              </div>
              <ChoreTable
                choreData={chores}
                removeChore={removeOneChore}
                updateChoreStatus={updateChore}
              />
              <ChoreForm handleSubmit={updateList} />
              <EventTable eventData={events} removeEvents={removeOneEvent} />
              <EventForm handleSubmit={updateEventList} />
              <UnavailabilityTable
                unavailabilityData={unavailabilities}
                removeUnavailability={removeOneUnavailability}
              />
              <UnavailabilityForm handleSubmit={updateUnavailabilityList} />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default MyApp;
