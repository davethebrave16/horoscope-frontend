import React, { useState, useCallback } from 'react'
import { FormData, InputMode } from '../types'
import { getCurrentDateTime } from '../utils'

const initialFormData: FormData = {
	date: '',
	time: '',
	latitude: '',
	longitude: '',
	city: ''
}

export const useForm = () => {
	const [formData, setFormData] = useState<FormData>(initialFormData)
	const [inputMode, setInputMode] = useState<InputMode>('city')

	const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData(prev => ({
			...prev,
			[name]: value
		}))
	}, [])

	const switchInputMode = useCallback((mode: InputMode) => {
		setInputMode(mode)
		if (mode === 'coordinates') {
			setFormData(prev => ({ ...prev, city: '' }))
		} else {
			setFormData(prev => ({ ...prev, latitude: '', longitude: '' }))
		}
	}, [])

	const fillCurrentDateTime = useCallback(() => {
		const { date, time } = getCurrentDateTime()
		setFormData(prev => ({
			...prev,
			date,
			time
		}))
	}, [])

	const updateCoordinates = useCallback((latitude: string, longitude: string) => {
		setFormData(prev => ({
			...prev,
			latitude,
			longitude
		}))
	}, [])

	const resetForm = useCallback(() => {
		setFormData(initialFormData)
		setInputMode('city')
	}, [])

	return {
		formData,
		inputMode,
		handleInputChange,
		switchInputMode,
		fillCurrentDateTime,
		updateCoordinates,
		resetForm
	}
}
