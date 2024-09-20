import React, { useCallback, useEffect, useMemo, useState } from 'react';

// Components
import Calendar from './components/calendar/Calendar.jsx';
import Header from './components/header/Header.jsx';

// Utils
import { generateWeekRange, getWeekStartDate } from '../src/utils/dateUtils.js';

// Gateways
import { fetchEvent } from './gateway/eventsGateway.js';

// Styles
import './common.scss';

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Завантаження тижневих дат
  const weekDates = useMemo(() => {
    return generateWeekRange(getWeekStartDate(weekStartDate));
  }, [weekStartDate]);

  const memoizedSetWeekStartDate = useCallback(date => {
    setWeekStartDate(date);
  }, []);

  const memoizedSetEvents = useCallback(newEvents => {
    setEvents(newEvents);
  }, []);

  // Завантаження подій лише один раз
  useEffect(() => {
    const loadEvents = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const fetchedEvents = await fetchEvent();

        const transformedEvents = fetchedEvents.map(event => ({
          ...event,
          startTime: new Date(event.dateFrom).toLocaleTimeString(),
          endTime: new Date(event.dateTo).toLocaleTimeString(),
        }));

        setEvents(transformedEvents);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Не вдалося завантажити події. Спробуйте пізніше.');
      } finally {
        setIsLoading(false);
      }
    };

    loadEvents(); // Завантаження подій лише один раз при завантаженні
  }, []);

  return (
    <>
      <Header
        weekStartDate={weekStartDate}
        setWeekStartDate={memoizedSetWeekStartDate}
        setEvents={memoizedSetEvents}
      />
      {isLoading && <div className="loader">Завантаження подій...</div>}
      {error && <div className="error">{error}</div>}
      <Calendar weekDates={weekDates} events={events} setEvents={memoizedSetEvents} />
    </>
  );
};

export default App;
