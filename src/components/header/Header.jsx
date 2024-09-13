import PropTypes from 'prop-types';
import React, { useCallback, useMemo } from 'react';
import useModal from '../../hooks/useModal';
import { getDisplayMonth } from '../../utils/dateUtils';
import Modal from '../modal/Modal';
import './header.scss';

const Header = ({ weekStartDate, setWeekStartDate, setEvents }) => {
  const { isModalOpen, openModal, closeModal, dateStart } = useModal();

  const updateWeekStartDate = useCallback(
    offset => {
      setWeekStartDate(prevDate => {
        const newDate = new Date(prevDate);
        newDate.setDate(newDate.getDate() + offset);
        return newDate;
      });
    },
    [setWeekStartDate],
  );

  const handlePrevWeek = useCallback(() => updateWeekStartDate(-7), [updateWeekStartDate]);

  const handleNextWeek = useCallback(() => updateWeekStartDate(7), [updateWeekStartDate]);

  const handleToday = useCallback(() => {
    setWeekStartDate(new Date());
  }, [setWeekStartDate]);

  const handleCreateClick = useCallback(() => {
    openModal(new Date().toISOString());
  }, [openModal]);

  const displayedWeek = useMemo(() => getDisplayMonth(weekStartDate), [weekStartDate]);

  return (
    <header className="header">
      <button className="button create-event-btn" onClick={handleCreateClick}>
        <i className="fas fa-plus create-event-btn__icon" id="colored-plus"></i>
        Create
      </button>
      <div className="navigation">
        <button className="navigation__today-btn button" onClick={handleToday}>
          Today
        </button>
        <button className="icon-button navigation__nav-icon" onClick={handlePrevWeek}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="icon-button navigation__nav-icon" onClick={handleNextWeek}>
          <i className="fas fa-chevron-right"></i>
        </button>
        <span className="navigation__displayed-week">{displayedWeek}</span>
      </div>
      {isModalOpen && <Modal closeModal={closeModal} setEvents={setEvents} dateStart={dateStart} />}
    </header>
  );
};

Header.propTypes = {
  weekStartDate: PropTypes.instanceOf(Date).isRequired,
  setWeekStartDate: PropTypes.func.isRequired,
  setEvents: PropTypes.func.isRequired,
};

export default Header;
