import React, { useState, useEffect } from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';

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

function Calendar() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        console.log('Fetching events...'); 
        const response = await fetch('/api/events');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const fetchedEvents = await response.json();
        console.log('Fetched events:', fetchedEvents); // Log the fetched events
        setEvents(fetchedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);
    // Function to format events
  const formatEvents = events => {
    return events.map(event => ({
      ...event,
      start: new Date(`${event.startDate} ${event.startTime}`), // Combine startDate and startTime
      end: new Date(`${event.endDate} ${event.endTime}`),       // Combine endDate and endTime
    }));
  };

  return (
    <div className="calendar">
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="name"
        style={{ height: 700, margin: '20px' }}
        views={[Views.MONTH, Views.WEEK, Views.DAY]}
      />
    </div>
  );
}

export default Calendar;


// // import React, { useState, useEffect } from 'react';
// // import { Calendar as BigCalendar, dateFnsLocalizer, Views } from 'react-big-calendar';
// // import format from 'date-fns/format';
// // import parse from 'date-fns/parse';
// // import startOfWeek from 'date-fns/startOfWeek';
// // import getDay from 'date-fns/getDay';
// // import enUS from 'date-fns/locale/en-US';
// // import 'react-big-calendar/lib/css/react-big-calendar.css';
// // import './Calendar.css';

// // const locales = {
// //   'en-US': enUS,
// // };

// // const localizer = dateFnsLocalizer({
// //   format,
// //   parse,
// //   startOfWeek,
// //   getDay,
// //   locales,
// // });

// // function Calendar() {
// //   const [events, setEvents] = useState([]);

// //   useEffect(() => {
// //     const fetchEvents = async () => {
// //       try {
// //         console.log('Fetching events...'); // Log before fetching
// //         const response = await fetch('/api/events', {
// //           method: 'GET',
// //           headers: {
// //             'Content-Type': 'application/json',
// //           },
// //         });
// //         if (!response.ok) {
// //           throw new Error('Failed to fetch events');
// //         }
// //         const fetchedEvents = await response.json();
// //         console.log('Fetched events:', fetchedEvents); // Log the fetched events
// //         if (Array.isArray(fetchedEvents)) {
// //           const formattedEvents = formatEvents(fetchedEvents);
// //           setEvents(formattedEvents);
// //         } else {
// //           console.error('Fetched events are not in array format');
// //         }
// //       } catch (error) {
// //         console.error('Error fetching events:', error);
// //         // Display an error message to the user or handle the error gracefully
// //       }
// //     };

// //     fetchEvents();
// //   }, []);

// //   // Function to format events
// //   const formatEvents = events => {
// //     return events.map(event => ({
// //       ...event,
// //       start: new Date(`${event.startDate} ${event.startTime}`), // Combine startDate and startTime
// //       end: new Date(`${event.endDate} ${event.endTime}`),       // Combine endDate and endTime
// //     }));
// //   };

// //   return (
// //     <div className="calendar">
// //       <BigCalendar
// //         localizer={localizer}
// //         events={events}
// //         startAccessor="start"
// //         endAccessor="end"
// //         titleAccessor="name"
// //         style={{ height: 700, margin: '20px' }}
// //         views={[Views.MONTH, Views.WEEK, Views.DAY]}
// //       />
// //     </div>
// //   );
// // }

// // export default Calendar;


// // import React, { useState, useEffect } from 'react';
// // import { Calendar as BigCalendar, dateFnsLocalizer, Views } from 'react-big-calendar';
// // import format from 'date-fns/format';
// // import parse from 'date-fns/parse';
// // import startOfWeek from 'date-fns/startOfWeek';
// // import getDay from 'date-fns/getDay';
// // import enUS from 'date-fns/locale/en-US';
// // import 'react-big-calendar/lib/css/react-big-calendar.css';
// // import './Calendar.css';
// // import eventServices from '../../express-backend/services/event-services.js';


// // const locales = {
// //   'en-US': enUS,
// // };

// // const localizer = dateFnsLocalizer({
// //   format,
// //   parse,
// //   startOfWeek,
// //   getDay,
// //   locales,
// // });

// // function Calendar() {
// //   const [events, setEvents] = useState([]);

// //   useEffect(() => {
// //     const fetchEvents = async () => {
// //       try {
// //         console.log('Fetching events...'); // Log before fetching
// //         const fetchedEvents = await eventServices.grabEvents(
// //           new Date(),  // startDate: Current date
// //           new Date(),  // endDate: Current date
// //           null,        // name:
// //           null,        // startTime: 
// //           null         // endTime: 
// //         );
// //         console.log('Fetched events:', fetchedEvents); // Log the fetched events
// //         if (Array.isArray(fetchedEvents)) {
// //           const formattedEvents = fetchedEvents.map(event => ({
// //             ...event,
// //             start: new Date(`${event.startDate} ${event.startTime}`), // Combine startDate and startTime
// //             end: new Date(`${event.endDate} ${event.endTime}`),         // Combine endDate and endTime
// //           }));
// //           setEvents(formattedEvents);
// //         } else {
// //           console.error('Fetched events are not in array format');
// //         }
// //       } catch (error) {
// //         console.error('Error fetching events:', error);
// //       }
// //     };

// //     fetchEvents();
// //   }, []);

// //   return (
// //     <div className="calendar">
// //       <BigCalendar
// //         localizer={localizer}
// //         events={events}
// //         startAccessor="start"
// //         endAccessor="end"
// //         titleAccessor="name"
// //         style={{ height: 700, margin: '20px' }}
// //         views={[Views.MONTH, Views.WEEK, Views.DAY]}
// //       />
// //     </div>
// //   );
// // }

// // export default Calendar;