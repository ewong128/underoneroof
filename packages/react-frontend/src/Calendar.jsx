// src/Calendar.jsx

import React from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: 'Big Meeting',
    allDay: true,
    start: new Date(2023, 5, 0),
    end: new Date(2023, 5, 0),
  },
  {
    title: 'Vacation',
    start: new Date(2023, 4, 7),
    end: new Date(2023, 4, 10),
  },
  {
    title: 'Conference',
    start: new Date(2023, 3, 20),
    end: new Date(2023, 3, 23),
  },
];

function Calendar() {
  return (
    <div className="calendar">
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 700, margin: '20px' }}
        views={[Views.MONTH, Views.WEEK, Views.DAY]} // Enable month, week, and day views
      />
    </div>
  );
}

export default Calendar;
