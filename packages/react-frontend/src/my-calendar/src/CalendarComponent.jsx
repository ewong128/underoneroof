// my-calendar/src/components/CalendarComponent.js

import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styled from 'styled-components';
import ChoreForm from "./routes/ChoreForm";
import EventForm from "./routes/EventForm";
const [chores, setChores] = useState([]);
const [events, setEvents] = useState([]);

const localizer = momentLocalizer(moment);

const CalendarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f8ff;
  padding: 20px;
  box-sizing: border-box;
`;

const StyledCalendar = styled(Calendar)`
  width: 100%;
  max-width: 1200px;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  font-family: 'Roboto', sans-serif;
  // Your styles...
`;

const CalendarComponent = () => {
  const [chore, setChore] = useState([]);
  const [event, setEvent] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const choreResponse = await fetch(link + "/chores", {
        headers: addAuthHeader(),
      });
      const eventResponse = await fetch(link + "/events", {
        headers: addAuthHeader(),
      });
  
      if (choreResponse.ok && eventResponse.ok) {
        const choreData = await choreResponse.json();
        const eventData = await eventResponse.json();
        setChore(choreData);
        setEvent(eventData);
      } else {
        // Handle error response
        console.error("Failed to fetch chore and event data");
      }
    } catch (error) {
      // Handle fetch errors
      console.error("Error fetching chore and event data:", error);
    }
  };
  
  // const handleForm1Delete = (entryId) => {
  //   // Implement deletion logic for Form 1 entry
  //   // Update form1Entries state after deletion
  // };

  const events = chore.concat(event).map((entry) => ({
    title: entry.title,
    start: moment(entry.start).toDate(),
    end: moment(entry.end).toDate(),
    allDay: entry.allDay,
  }));

  const [view, setView] = useState(Views.MONTH);
  const [date, setDate] = useState(new Date());

  const handleSelectSlot = ({ start }) => {
    setDate(start);
    setView(Views.DAY);
  };

  return (
    <CalendarContainer>
      <StyledCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={[Views.MONTH, Views.WEEK, Views.DAY]}
        view={view}
        date={date}
        onView={setView}
        onNavigate={setDate}
        selectable
        onSelectSlot={handleSelectSlot}
        style={{ height: 700 }}
      />
      <ChoreForm handleSubmit={(data) => console.log('Chore Form Submitted:', data)} />
      <EventForm handleSubmit={(data) => console.log('Event Form Submitted:', data)} />
    </CalendarContainer>
  );
};

export default CalendarComponent;
