import PropTypes from 'prop-types';
import React from 'react';
import { getDisplayMonth } from '../../utils/dateUtils';
import Navigation from '../navigation/Navigation';
import Sidebar from '../sidebar/Sidebar';
import Week from '../week/Week';
import './calendar.scss';

const Calendar = ({ weekDates, events, setEvents }) => {
  // Отримання місяця, який відображається, може бути розміщено безпосередньо в рендері
  const month = getDisplayMonth(weekDates[0]);

  return (
    <section className="calendar">
      <Navigation weekDates={weekDates} />
      <div className="calendar__body">
        <div className="calendar__week-container">
          <Sidebar />
          <Week weekDates={weekDates} month={month} events={events} setEvents={setEvents} />
        </div>
      </div>
    </section>
  );
};

Calendar.propTypes = {
  weekDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      startTime: PropTypes.string.isRequired,
      endTime: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
  ).isRequired,
  setEvents: PropTypes.func.isRequired,
};

export default Calendar;
