import React from "react";
import PropTypes from "prop-types";
import Hour from "../hour/Hour";

const Day = ({ dataDay, dayEvents, setEvents, month }) => {
  const hours = Array(24)
    .fill()
    .map((val, index) => index);

  return (
    <div className="calendar__day" data-day={dataDay}>
      {hours.map((hour) => {
        const hourEvents = dayEvents.filter(
          (event) => event.dateFrom.getHours() === hour
        );

        return (
          <Hour
            key={dataDay + hour}
            dataHour={hour}
            hourEvents={hourEvents}
            setEvents={setEvents}
            dataDay={dataDay}
            month={month}
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
};

export default Day;
