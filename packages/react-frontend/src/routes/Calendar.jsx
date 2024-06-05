import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, addMonths, subMonths, isSameMonth, isSameDay } from 'date-fns';
import '../../Calendar.css'; 

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [view, setView] = useState('month');
    const [events, setEvents] = useState([]); // Placeholder for events

    // Functions to navigate to previous and next dates
    const prev = () => {
        setCurrentDate(prevDate => {
            if (view === 'month') {
                return subMonths(prevDate, 1);
            } else if (view === 'week' || view === 'day') {
                return addDays(prevDate, -7);
            }
        });
    };

    const next = () => {
        setCurrentDate(prevDate => {
            if (view === 'month') {
                return addMonths(prevDate, 1);
            } else if (view === 'week' || view === 'day') {
                return addDays(prevDate, 7);
            }
        });
    };
    // Function to change the view (month, week, day)
    const changeView = (newView) => {
        setView(newView);
    };

    // Function to handle clicks on day cells
    const handleDayClick = (date) => {
        console.log('Clicked on:', format(date, 'yyyy-MM-dd'));
        // Implement logic for displaying events/tasks for the clicked day
    };

    // Function to render the header (navigation buttons and view buttons)
    const renderHeader = () => {
        return (
            <div className="header">
                <button className="navButton" onClick={prev}>{'<'}</button>
                <span className="title">{format(currentDate, 'MMMM yyyy')}</span>
                <button className="navButton" onClick={next}>{'>'}</button>
                <button className={`viewButton ${view === 'month' ? 'active' : ''}`} onClick={() => changeView('month')}>Month</button>
                <button className={`viewButton ${view === 'week' ? 'active' : ''}`} onClick={() => changeView('week')}>Week</button>
                <button className={`viewButton ${view === 'day' ? 'active' : ''}`} onClick={() => changeView('day')}>Day</button>
            </div>
        );
    };

    // Function to render the days of the calendar
    const renderDays = () => {
        const days = [];
        let startDate, endDate;

        if (view === 'month') {
            startDate = startOfWeek(startOfMonth(currentDate));
            endDate = endOfWeek(endOfMonth(currentDate));
        } else if (view === 'week') {
            startDate = startOfWeek(currentDate);
            endDate = endOfWeek(currentDate);
        }

        while (startDate <= endDate) {
            days.push(
                <div key={startDate} className={`day ${isSameMonth(startDate, currentDate) ? '' : 'disabled'}`} onClick={() => handleDayClick(startDate)}>
                    {format(startDate, 'd')}
                </div>
            );
            startDate = addDays(startDate, 1);
        }

        return <div className="days">{days}</div>;
    };

    // Render the component
    return (
        <div className="calendar">
            {renderHeader()}
            {renderDays()}
            {/* Placeholder for event/task display */}
        </div>
    );
};

export default Calendar;
