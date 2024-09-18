import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { deleteEvent, fetchEvent } from '../../gateway/eventsGateway';
import { canDeleteEvent } from '../../utils/validation';
import './event.scss';

const Event = ({ id, title, time, description, setEvents, startDay }) => {
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);
  //additional css for event
  const [eventHeight, setEventHeight] = useState('100');
  const [eventMarginTop, setEventMarginTop] = useState('0');

  useEffect(() => {
    const currentTime = moment();
    const [startTimeStr, endTimeStr] = time.split(' - ');
    const eventStartTime = moment(
      `${currentTime.format('YYYY-MM-DD')} ${startTimeStr}`,
      'YYYY-MM-DD HH:mm',
    );

    const eventEndTime = moment(
      `${currentTime.format('YYYY-MM-DD')} ${endTimeStr}`,
      'YYYY-MM-DD HH:mm',
    );

    //additional css
    const eventDurationMinutes = eventEndTime.diff(eventStartTime, 'minutes');
    const eventHeightPercentage = (eventDurationMinutes / 60) * 100;
    setEventHeight(`${eventHeightPercentage}%`);
    //margin for event
    const startMinutes = eventStartTime.minutes();
    setEventMarginTop(`${startMinutes}px`);

    // if (currentTime.isAfter(eventEndTime)) {
    //   const handleExpiredEvent = async () => {
    //     try {
    //       await deleteEvent(id);
    //       const updatedEvents = await fetchEvent();
    //       setEvents(updatedEvents);
    //     } catch (error) {
    //       console.error('Error deleting event:', error);
    //     }
    //   };
    //   handleExpiredEvent();
    // }
  }, [id, time, setEvents]);

  const handleDelete = async id => {
    if (!canDeleteEvent(time, startDay)) return;

    try {
      await deleteEvent(id);
      const updatedEvents = await fetchEvent();
      setEvents(updatedEvents);
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const onDelete = event => {
    event.stopPropagation();
    handleDelete(id);
    setShowDeleteBtn(false);
  };

  const toggleDeleteBtn = e => setShowDeleteBtn(prev => !prev);
  return (
    <div
      className="event"
      onClick={toggleDeleteBtn}
      style={{ height: eventHeight, marginTop: eventMarginTop }}
    >
      <div className="event__title">{title}</div>
      <div className="event__time">{time}</div>
      <div className="event__description">{description}</div>

      {showDeleteBtn && (
        <div className="delete-event">
          <button className="delete-event-btn" onClick={onDelete}>
            <i className="fas fa-trash"></i> Delete
          </button>
        </div>
      )}
    </div>
  );
};

Event.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  setEvents: PropTypes.func.isRequired,
};

export default Event;
