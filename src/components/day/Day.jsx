import PropTypes from 'prop-types';
import React from 'react';
import Hour from '../hour/Hour';

const Day = ({ dataDay, dayEvents, setEvents, month, events }) => {
  const hours = Array(24)
    .fill()
    .map((val, index) => index);

  return (
    <div className="calendar__day" data-day={dataDay}>
      {hours.map(hour => {
        const hourEvents = dayEvents.filter(event => event.dateFrom.getHours() === hour);

        return (
          <Hour
            key={dataDay + hour}
            dataHour={hour}
            hourEvents={hourEvents}
            setEvents={setEvents}
            dataDay={dataDay}
            month={month}
            events={events}
          />
        );
      })}
    </div>
  );
};

Day.propTypes = {
  dataDay: PropTypes.number.isRequired,
  dayEvents: PropTypes.array.isRequired,
  setEvents: PropTypes.func.isRequired,
  month: PropTypes.string.isRequired,
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Day;
