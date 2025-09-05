import React, { useState, useCallback } from 'react'
import { TransitFormData, InputMode } from '../types'

export const useTransitForm = () => {
	const [formData, setFormData] = useState<TransitFormData>({
		year: '',
		month: '',
		planet: '',
		latitude: '',
		longitude: '',
		city: ''
	})

	const [inputMode, setInputMode] = useState<InputMode>('city')

	const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target
		setFormData(prev => ({
			...prev,
			[name]: value
		}))
	}, [])

	const switchInputMode = useCallback((mode: InputMode) => {
		setInputMode(mode)
		// Clear coordinates when switching to city mode
		if (mode === 'city') {
			setFormData(prev => ({
				...prev,
				latitude: '',
				longitude: ''
			}))
		}
		// Clear city when switching to coordinates mode
		if (mode === 'coordinates') {
			setFormData(prev => ({
				...prev,
				city: ''
			}))
		}
	}, [])

	const updateCoordinates = useCallback((latitude: string, longitude: string) => {
		setFormData(prev => ({
			...prev,
			latitude,
			longitude
		}))
	}, [])

	const fillCurrentDateTime = useCallback(() => {
		const now = new Date()
		setFormData(prev => ({
			...prev,
			year: now.getFullYear().toString(),
			month: (now.getMonth() + 1).toString()
		}))
	}, [])

	return {
		formData,
		inputMode,
		handleInputChange,
		switchInputMode,
		updateCoordinates,
		fillCurrentDateTime
	}
}
