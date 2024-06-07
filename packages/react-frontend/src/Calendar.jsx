// import React, { useState, useEffect } from 'react';
// import { Calendar as BigCalendar, dateFnsLocalizer, Views } from 'react-big-calendar';
// import format from 'date-fns/format';
// import parse from 'date-fns/parse';
// import startOfWeek from 'date-fns/startOfWeek';
// import getDay from 'date-fns/getDay';
// import enUS from 'date-fns/locale/en-US';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import './Calendar.css';

// const locales = {
//   'en-US': enUS,
// };

// const localizer = dateFnsLocalizer({
//   format,
//   parse,
//   startOfWeek,
//   getDay,
//   locales,
// });

// function Calendar() {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // useEffect(() => {
//   //   function fetchEvents() {
//   //     return fetch(link + "/events", {
//   //       headers: addAuthHeader(),
//   //     })
//   //       .then((response) => {
//   //         if (!response.ok) {
//   //           throw new Error('Failed to fetch events');
//   //         }
//   //         return response.json();
//   //       })
//   //       .then((data) => {
//   //         // Format the events data for the calendar
//   //         const formattedEvents = data.map((event) => ({
//   //           title: event.name, // Use the appropriate property for the event title
//   //           start: new Date(event.startDate), // Convert the start date to a Date object
//   //           end: new Date(event.endDate), // Convert the end date to a Date object
//   //           allDay: false, // Assuming all events are not all-day events
//   //         }));
//   //         return formattedEvents;
//   //       })
//   //       .catch((error) => {
//   //         console.error('Error fetching events:', error);
//   //         throw error; // Rethrow the error to handle it in the component
//   //       });
//   //   }
//   //   ;
//   //   fetchEvents();
//   // }, []);
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchEvents = async () => {
//     try {
//       const response = await fetch('/events');
//       if (!response.ok) {
//         throw new Error('Failed to fetch events');
//       }
//       const data = await response.json();
//       setEvents(data);
//       setLoading(false);
//       setError(null); // Reset error state if fetch is successful
//     } catch (error) {
//       //console.error('Error fetching events:', error);
//       setError('Failed to fetch events. Please try again later.');
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div className="calendar">
//       <BigCalendar
//         localizer={localizer}
//         events={events}
//         startAccessor="start"
//         endAccessor="end"
//         style={{ height: 700, margin: '20px' }}
//         views={[Views.MONTH, Views.WEEK, Views.DAY]}
//       />
//     </div>
//   );
// }

// export default Calendar;


// import React, { useState, useEffect } from 'react';
// import { Calendar as BigCalendar, dateFnsLocalizer, Views } from 'react-big-calendar';
// import format from 'date-fns/format';
// import parse from 'date-fns/parse';
// import startOfWeek from 'date-fns/startOfWeek';
// import getDay from 'date-fns/getDay';
// import enUS from 'date-fns/locale/en-US';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import './Calendar.css';

// const locales = {
//   'en-US': enUS,
// };

// const localizer = dateFnsLocalizer({
//   format,
//   parse,
//   startOfWeek,
//   getDay,
//   locales,
// });

// function Calendar() {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const response = await fetch('/events');
//         if (!response.ok) {
//           throw new Error('Failed to fetch events');
//         }
//         const data = await response.json();
//         setEvents(data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching events:', error);
//         setError('Failed to fetch events. Please try again later.');
//         setLoading(false);
//       }
//     };
//     fetchEvents();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div className="calendar">
//       <BigCalendar
//         localizer={localizer}
//         events={events}
//         startAccessor="start"
//         endAccessor="end"
//         style={{ height: 700, margin: '20px' }}
//         views={[Views.MONTH, Views.WEEK, Views.DAY]}
//       />
//     </div>
//   );
// }

// export default Calendar;


// src/Calendar.jsx
import React, { useState, useEffect } from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';
// import eventService from '../express-backend/services/eventService'; // Import your event service module

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
        const fetchedEvents = await eventService.getEvents(); // Call the function to fetch events
        console.log('Fetched events:', fetchedEvents); // Log the events
        setEvents(fetchedEvents);
      } catch (error) {
        console.error('Error fetching events:', error); // Log errors
      }
    };

    fetchEvents();
  }, []);

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



// // // // // import React from 'react';
// // // // // import { Calendar as BigCalendar, dateFnsLocalizer, Views } from 'react-big-calendar';
// // // // // import format from 'date-fns/format';
// // // // // import parse from 'date-fns/parse';
// // // // // import startOfWeek from 'date-fns/startOfWeek';
// // // // // import getDay from 'date-fns/getDay';
// // // // // import enUS from 'date-fns/locale/en-US';
// // // // // import 'react-big-calendar/lib/css/react-big-calendar.css';
// // // // // import './Calendar.css';

// // // // // const locales = {
// // // // //   'en-US': enUS,
// // // // // };

// // // // // const localizer = dateFnsLocalizer({
// // // // //   format,
// // // // //   parse,
// // // // //   startOfWeek,
// // // // //   getDay,
// // // // //   locales,
// // // // // });

// // // // // const events = [
// // // // //   {
// // // // //     title: 'Big Meeting',
// // // // //     allDay: true,
// // // // //     start: new Date(2024, 5, 1),
// // // // //     end: new Date(2024, 5, 1),
// // // // //   },
// // // // //   {
// // // // //     title: 'Vacation',
// // // // //     start: new Date(2024, 4, 7),
// // // // //     end: new Date(2024, 4, 12),
// // // // //   },
// // // // //   {
// // // // //     title: 'Conference',
// // // // //     start: new Date(2024, 3, 20),
// // // // //     end: new Date(2024, 3, 23),
// // // // //   },
// // // // // ];

// // // // // function Calendar() {
// // // // //   return (
// // // // //     <div className="calendar">
// // // // //       <BigCalendar
// // // // //         localizer={localizer}
// // // // //         events={events}
// // // // //         startAccessor="start"
// // // // //         endAccessor="end"
// // // // //         style={{ height: 700, margin: '20px' }}
// // // // //         views={[Views.MONTH, Views.WEEK, Views.DAY]} // Enable month, week, and day views
// // // // //       />
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // export default Calendar;
