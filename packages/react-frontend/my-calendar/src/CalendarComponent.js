import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';

const CalendarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f8ff;
`;

const StyledCalendar = styled(Calendar)`
  width: 100%;
  max-width: 800px;
  background-color: white;
  border: none;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);

  .react-calendar__tile {
    max-width: 100%;
    height: 100px;
    font-size: 1.2rem;
    color: #333;
  }

  .react-calendar__tile--now {
    background: #ffeb3b;
    color: white;
  }

  .react-calendar__tile--active {
    background: #3f51b5;
    color: white;
  }
`;

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());

  return (
    <CalendarContainer>
      <StyledCalendar onChange={setDate} value={date} />
    </CalendarContainer>
  );
};

export default CalendarComponent;
