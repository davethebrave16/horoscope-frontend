import { useState, useCallback } from 'react'
import { transitApi } from '../services/api/transit-api'
import { geocodingApi } from '../services/api/geocoding-api'
import { TransitFormData, AppError, GeocodingResult } from '../types'

export const useTransit = () => {
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

	const calculateTransits = useCallback(async (
		formData: TransitFormData,
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

			// Parse year and month
			const year = parseInt(formData.year)
			const month = parseInt(formData.month)

			if (isNaN(year) || isNaN(month) || year < 1900 || year > 2100 || month < 1 || month > 12) {
				throw new Error('Invalid year or month')
			}

			const data = await transitApi.calculateTransits(
				year,
				month,
				latitude,
				longitude,
				formData.planet
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
		calculateTransits
	}
}
