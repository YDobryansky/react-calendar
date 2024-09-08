import moment from 'moment'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { deleteEvent, fetchEvent } from '../../gateway/eventsGateway'
import { canDeleteEvent } from '../../utils/validation'
import './event.scss'

const Event = ({ id, title, time, description, setEvents }) => {
	const [showDeleteBtn, setShowDeleteBtn] = useState(false)

	useEffect(() => {
		const currentTime = moment()
		const [, endTimeStr] = time.split(' - ')
		const eventEndTime = moment(
			`${currentTime.format('YYYY-MM-DD')} ${endTimeStr}`,
			'YYYY-MM-DD HH:mm'
		)

		if (currentTime.isAfter(eventEndTime)) {
			// Винесення асинхронної логіки в окрему функцію для уникнення повторення
			const handleExpiredEvent = async () => {
				try {
					await deleteEvent(id)
					const updatedEvents = await fetchEvent()
					setEvents(updatedEvents)
				} catch (error) {
					console.error('Error deleting event:', error)
				}
			}

			handleExpiredEvent()
		}
	}, [id, time, setEvents])

	const handleDelete = async () => {
		if (!canDeleteEvent(time)) return

		try {
			await deleteEvent(id)
			const updatedEvents = await fetchEvent()
			setEvents(updatedEvents)
		} catch (error) {
			console.error('Error deleting event:', error)
		}
	}

	const onDelete = event => {
		event.stopPropagation()
		handleDelete()
		setShowDeleteBtn(false)
	}

	const toggleDeleteBtn = () => setShowDeleteBtn(prev => !prev)

	return (
		<div className='event' onClick={toggleDeleteBtn}>
			{showDeleteBtn && (
				<button className='delete-event-btn' onClick={onDelete}>
					<i className='fas fa-trash'></i> Delete
				</button>
			)}
			<div className='event__title'>{title}</div>
			<div className='event__time'>{time}</div>
			<div className='event__description'>{description}</div>
		</div>
	)
}

Event.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	time: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	setEvents: PropTypes.func.isRequired,
}

export default Event
