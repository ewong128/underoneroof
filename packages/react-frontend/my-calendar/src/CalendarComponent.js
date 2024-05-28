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
  background-color: white;
  border: none;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);

  .rbc-event {
    background-color: #3f51b5;
    color: white;
    border: none;
  }

  .rbc-today {
    background-color: #ffeb3b !important;
  }

  .rbc-off-range-bg {
    background-color: #f0f8ff;
  }
`;

const CalendarComponent = () => {
  const [events, setEvents] = useState([
    {
      title: 'Meeting',
      start: new Date(),
      end: new Date(),
      allDay: false,
    },
  ]);

  return (
    <CalendarContainer>
      <StyledCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={[Views.MONTH, Views.WEEK, Views.DAY]}
        defaultView={Views.MONTH}
        style={{ height: 700 }}
      />
    </CalendarContainer>
  );
};

export default CalendarComponent;

// import React, { useState } from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import styled from 'styled-components';

// const CalendarContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
//   background-color: #f0f8ff;
// `;

// const StyledCalendar = styled(Calendar)`
//   width: 100%;
//   max-width: 800px;
//   background-color: white;
//   border: none;
//   border-radius: 10px;
//   box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);

//   .react-calendar__tile {
//     max-width: 100%;
//     height: 100px;
//     font-size: 1.2rem;
//     color: #333;
//   }

//   .react-calendar__tile--now {
//     background: #ffeb3b;
//     color: white;
//   }

//   .react-calendar__tile--active {
//     background: #3f51b5;
//     color: white;
//   }
// `;

// const CalendarComponent = () => {
//   const [date, setDate] = useState(new Date());

//   return (
//     <CalendarContainer>
//       <StyledCalendar onChange={setDate} value={date} />
//     </CalendarContainer>
//   );
// };

// export default CalendarComponent;
