const baseUrl = `https://66c1e3e6f83fffcb587a863b.mockapi.io/events`

// Функція для перевірки статусу відповіді
const checkResponse = response => {
	if (!response.ok) {
		throw new Error('Internal Server Error. Operation failed')
	}
	return response
}

// Отримання списку подій з сервера
export const fetchEvent = async () => {
	const response = await fetch(baseUrl)
	checkResponse(response)
	const events = await response.json()
	return events.map(event => ({
		...event,
		dateFrom: new Date(event.dateFrom),
		dateTo: new Date(event.dateTo),
	}))
}

// Створення нової події
export const createEvent = async eventDate => {
	const response = await fetch(baseUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify(eventDate),
	})
	checkResponse(response)
}

// Видалення події
export const deleteEvent = async eventId => {
	const response = await fetch(`${baseUrl}/${eventId}`, {
		method: 'DELETE',
	})
	checkResponse(response)
}
