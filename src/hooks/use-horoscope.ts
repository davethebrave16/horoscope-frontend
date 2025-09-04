import { useState, useCallback } from 'react'
import { horoscopeApi } from '../services/api/horoscope-api'
import { geocodingApi } from '../services/api/geocoding-api'
import { FormData, AppError, GeocodingResult } from '../types'
import { parseTimeString } from '../utils'

export const useHoroscope = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<AppError | null>(null)

	const clearError = useCallback(() => {
		setError(null)
	}, [])

	const searchCity = useCallback(async (cityName: string): Promise<GeocodingResult> => {
		setLoading(true)
		setError(null)

		try {
			const result = await geocodingApi.searchCity(cityName)
			return result
		} catch (err) {
			const error = err as AppError
			setError(error)
			throw error
		} finally {
			setLoading(false)
		}
	}, [])

	const calculateHoroscope = useCallback(async (
		formData: FormData,
		inputMode: 'city' | 'coordinates'
	) => {
		setLoading(true)
		setError(null)

		try {
			let latitude = formData.latitude
			let longitude = formData.longitude

			// If in city mode and coordinates are not set, search for city
			if (inputMode === 'city' && (!latitude || !longitude)) {
				const cityResult = await geocodingApi.searchCity(formData.city)
				latitude = cityResult.latitude.toString()
				longitude = cityResult.longitude.toString()
			}

			// Parse date and time
			const dateObj = new Date(formData.date)
			const timeData = parseTimeString(formData.time)

			const data = await horoscopeApi.calculateHoroscope(
				dateObj,
				timeData,
				latitude,
				longitude
			)

			return data
		} catch (err) {
			const error = err as AppError
			setError(error)
			throw error
		} finally {
			setLoading(false)
		}
	}, [])

	const calculateAspects = useCallback(async (
		formData: FormData,
		inputMode: 'city' | 'coordinates'
	) => {
		setLoading(true)
		setError(null)

		try {
			let latitude = formData.latitude
			let longitude = formData.longitude

			// If in city mode and coordinates are not set, search for city
			if (inputMode === 'city' && (!latitude || !longitude)) {
				const cityResult = await geocodingApi.searchCity(formData.city)
				latitude = cityResult.latitude.toString()
				longitude = cityResult.longitude.toString()
			}

			// Parse date and time
			const dateObj = new Date(formData.date)
			const timeData = parseTimeString(formData.time)

			const data = await horoscopeApi.calculateAspects(
				dateObj,
				timeData,
				latitude,
				longitude
			)

			return data
		} catch (err) {
			const error = err as AppError
			setError(error)
			throw error
		} finally {
			setLoading(false)
		}
	}, [])

	const calculateMoonPhase = useCallback(async (
		formData: FormData,
		inputMode: 'city' | 'coordinates'
	) => {
		setLoading(true)
		setError(null)

		try {
			let latitude = formData.latitude
			let longitude = formData.longitude

			// If in city mode and coordinates are not set, search for city
			if (inputMode === 'city' && (!latitude || !longitude)) {
				const cityResult = await geocodingApi.searchCity(formData.city)
				latitude = cityResult.latitude.toString()
				longitude = cityResult.longitude.toString()
			}

			// Parse date and time
			const dateObj = new Date(formData.date)
			const timeData = parseTimeString(formData.time)

			const data = await horoscopeApi.calculateMoonPhase(
				dateObj,
				timeData,
				latitude,
				longitude
			)

			return data
		} catch (err) {
			const error = err as AppError
			setError(error)
			throw error
		} finally {
			setLoading(false)
		}
	}, [])

	return {
		loading,
		error,
		clearError,
		searchCity,
		calculateHoroscope,
		calculateAspects,
		calculateMoonPhase
	}
}
