import { useState, useCallback } from 'react'
import { ModalContent } from '../types'

export const useModal = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [modalContent, setModalContent] = useState<ModalContent | null>(null)

	const openModal = useCallback((title: string, content: unknown) => {
		setModalContent({ title, content })
		setIsOpen(true)
	}, [])

	const closeModal = useCallback(() => {
		setIsOpen(false)
		setModalContent(null)
	}, [])

	return {
		isOpen,
		modalContent,
		openModal,
		closeModal
	}
}
