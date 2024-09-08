import moment from 'moment'

export const validEvent = (newEvent, existingEvent) => {
	const { dateFrom, dateTo } = newEvent

	// Проверка на текущий день
	const selectedDate = moment(dateFrom).startOf('day')
	const today = moment().startOf('day')

	if (!selectedDate.isSame(today)) {
		alert('The event must start and end within one day')
		return false
	}

	const start = moment(dateFrom)
	const end = moment(dateTo)

	// Проверка: время окончания должно быть позже времени начала
	if (end.isSameOrBefore(start)) {
		alert('End time must be later than start time.')
		return false
	}

	if (start.minutes() % 5 !== 0) {
		alert('Start time must be in multiples of 5 minutes')
		return false
	}

	if (end.diff(start, 'minutes') % 5 !== 0) {
		alert('Event duration must be in multiples of 5 minutes')
		return false
	}

	const eventList = Array.isArray(existingEvent) ? existingEvent : []

	// Проверка пересечения с существующими событиями
	const hasIntersection = eventList.some(event => {
		const eventStart = moment(event.dateFrom)
		const eventEnd = moment(event.dateTo)
		return start.isBefore(eventEnd) && end.isAfter(eventStart)
	})

	if (hasIntersection) {
		alert('Events are interrupted in time')
		return false
	}

	// Проверка продолжительности события
	if (end.diff(start, 'hour') > 6) {
		alert('The event cannot be longer than 6 hours')
		return false
	}

	return true
}

export const canCreateEvent = time => {
	const currentTime = moment()

	const [startTimeStr] = time.split(' - ')

	const eventStartTime = moment(
		`${currentTime.format('YYYY-MM-DD')} ${startTimeStr}`,
		'YYYY-MM-DD HH:mm'
	)

	if (currentTime.isBefore(eventStartTime)) {
		alert('You can`t create event in Past time')
		return false
	}

	return true
}

export const canDeleteEvent = time => {
	const currentTime = moment() // Текущее время

	const [startTimeStr] = time.split(' - ')

	const eventStartTime = moment(
		`${currentTime.format('YYYY-MM-DD')} ${startTimeStr}`,
		'YYYY-MM-DD HH:mm'
	)

	const differenceInMinutes = currentTime.diff(eventStartTime, 'minutes')

	//Нельзя удалить событие если оно уже началось
	if (currentTime.isAfter(eventStartTime)) {
		alert("You can't delete the event once it has started")
		return false
	}
	// Проверка, если текущее время меньше времени начала события + 15 минут
	if (differenceInMinutes >= 15) {
		alert('You cannot delete an event less than 15 minutes before it starts')
		return false
	}

	return true
}
