import PropTypes from 'prop-types';
import React from 'react';

const EventForm = ({ formData, handleChange, handleSubmit, btnDisabled }) => (
  <form className="event-form" onSubmit={handleSubmit}>
    <input
      type="text"
      name="title"
      placeholder="Title"
      className="event-form__field"
      value={formData.title}
      onChange={handleChange}
    />
    <div className="event-form__time">
      <input
        type="date"
        name="date"
        className="event-form__field"
        value={formData.date}
        onChange={handleChange}
      />
      <input
        type="time"
        name="startTime"
        className="event-form__field"
        value={formData.startTime}
        onChange={handleChange}
      />
      <span>-</span>
      <input
        type="time"
        name="endTime"
        className="event-form__field"
        value={formData.endTime}
        onChange={handleChange}
      />
    </div>
    <textarea
      name="description"
      placeholder="Description"
      className="event-form__field"
      value={formData.description}
      onChange={handleChange}
    />
    <button type="submit" className="event-form__submit-btn" disabled={btnDisabled}>
      Create
    </button>
  </form>
);

EventForm.propTypes = {
  formData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  btnDisabled: PropTypes.bool.isRequired,
};

export default EventForm;
