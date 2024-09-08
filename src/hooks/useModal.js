import { useState } from 'react'

const useModal = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [dateStart, setDateStart] = useState(null)

	const openModal = dateFrom => {
		setDateStart(dateFrom ? new Date(dateFrom).toISOString() : null)
		setIsModalOpen(true)
	}

	const closeModal = () => {
		console.log('Closing modal from button click...')
		setIsModalOpen(false)
	}

	return {
		dateStart,
		isModalOpen,
		openModal,
		closeModal,
	}
}

export default useModal
