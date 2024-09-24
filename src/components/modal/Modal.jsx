import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { createEvent } from '../../gateway/eventsGateway';
import { validEvent } from '../../utils/validation';
import EventForm from './EventForm';
import './modal.scss';

const Modal = ({ dateStart, closeModal, setEvents, events }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
  });

  const [btnDisabled, setBtnDisabled] = useState(true);

  useEffect(() => {
    if (dateStart) {
      const date = new Date(dateStart);
      const dateString = date.toISOString().split('T')[0];
      const timeString = date.toTimeString().split(' ')[0];

      const [hours] = timeString.substring(0, 5).split(':');
      const endTimeDate = new Date(date);
      endTimeDate.setHours(Number(hours) + 1);

      setFormData({
        ...formData,
        date: dateString,
        startTime: timeString.substring(0, 5),
        endTime: endTimeDate.toTimeString().substring(0, 5),
      });
    }
  }, [dateStart]);

  useEffect(() => {
    const isFormFilled = Object.values(formData).every(value => value.trim() !== '');
    setBtnDisabled(!isFormFilled);
  }, [formData]);

  const onCreate = async newEvent => {
    if (!validEvent(newEvent, events)) return;

    try {
      await createEvent(newEvent);
      setEvents(prevEvents => [...prevEvents, newEvent]);
      closeModal();
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();

    const newEvent = {
      id: (parseInt(_.last(events).id) + 1).toString(),
      title: formData.title,
      description: formData.description,
      dateFrom: new Date(`${formData.date}T${formData.startTime}`),
      dateTo: new Date(`${formData.date}T${formData.endTime}`),
    };

    if (!validEvent(newEvent)) {
      return;
    }

    onCreate(newEvent);
    closeModal();
  };

  return (
    <div className="modal overlay">
      <div className="modal__content">
        <div className="create-event">
          <button
            onClick={e => {
              e.stopPropagation();
              closeModal();
            }}
            className="create-event__close-btn"
          >
            +
          </button>
          <EventForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            btnDisabled={btnDisabled}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  setEvents: PropTypes.func.isRequired,
  dateStart: PropTypes.string.isRequired,
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
};
