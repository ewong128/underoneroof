// Working
import React, { useState } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styled from 'styled-components';

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

  .rbc-toolbar {
    margin-bottom: 20px;
    background-color: #3f51b5;
    color: #ffffff;
    border-radius: 15px 15px 0 0;
    padding: 10px;
    text-align: center;
  }

  .rbc-toolbar button {
    background-color: transparent;
    border: none;
    color: #ffffff;
    font-weight: bold;
    cursor: pointer;
    outline: none;
  }

  .rbc-toolbar button:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .rbc-month-view {
    padding: 10px;
  }

  .rbc-date-cell {
    font-weight: bold;
  }

  .rbc-today {
    background-color: #ffeb3b !important;
    color: #000000;
  }

  .rbc-off-range-bg {
    background-color: #ffffff;
  }
`;

const CalendarComponent = () => {
  const [events, setEvents] = useState([
    {
      // title: 'CSC 307 Sprint #2',
      // start: new Date(),
      // end: new Date(),
      // allDay: false,
    },
  ]);

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
    </CalendarContainer>
  );
};

export default CalendarComponent;


// import React, { useState } from 'react';
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import moment from 'moment';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import styled from 'styled-components';
// import EventForm from './EventForm';

// const localizer = momentLocalizer(moment);

// const CalendarContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   height: 100vh;
//   background-color: #f0f8ff;
//   padding: 20px;
//   box-sizing: border-box;
// `;

// const StyledCalendar = styled(Calendar)`
//   width: 100%;
//   max-width: 1200px;
//   background-color: #ffffff;
//   border-radius: 15px;
//   box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
//   font-family: 'Roboto', sans-serif;

//   .rbc-event {
//     background-color: #3f51b5;
//     color: #ffffff;
//     border: none;
//     border-radius: 5px;
//   }

//   .rbc-today {
//     background-color: #ffeb3b !important;
//     color: #000000;
//   }

//   .rbc-off-range-bg {
//     background-color: #ffffff;
//   }
// `;

// const CalendarComponent = () => {
//   const [events, setEvents] = useState([]);

//   const handleAddEvent = (newEvent) => {
//     setEvents([...events, newEvent]);
//   };

//   return (
//     <CalendarContainer>
//       <EventForm onSubmit={handleAddEvent} />
//       <StyledCalendar
//         localizer={localizer}
//         events={events}
//         startAccessor="startDate"
//         endAccessor="endDate"
//         style={{ height: 600 }}
//       />
//     </CalendarContainer>
//   );
// };

// export default CalendarComponent;