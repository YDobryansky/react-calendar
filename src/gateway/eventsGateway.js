const baseUrl = `https://66c1e3e6f83fffcb587a863b.mockapi.io/events`;

// Отримання списку подій з сервера
export const fetchEvent = () => {
  return fetch(baseUrl).then(response => {
    if (!response.ok) {
      throw new Error("Internal Server Error. Can't display events");
    }

    return response.json().then(events =>
      events.map(event => ({
        ...event,
        dateFrom: new Date(event.dateFrom),
        dateTo: new Date(event.dateTo),
      })),
    );
  });
};

// Створення нової події
export const createEvent = eventDate => {
  return fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(eventDate),
  }).then(response => {
    if (!response.ok) {
      throw new Error("Internal Server Error. Can't display events");
    }
  });
};

// Видалення події
export const deleteEvent = eventId => {
  return fetch(`${baseUrl}/${eventId}`, {
    method: 'DELETE',
  }).then(response => {
    if (!response.ok) {
      throw new Error("Internal Server Error. Can't display events");
    }
  });
};
