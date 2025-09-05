import { useState, useCallback } from 'react'
import { MonthMoonPhasesFormData, MonthMoonPhasesResponse, AppError } from '../types'
import { fetchMonthMoonPhases } from '../services/api/month-moon-phases-api'

export const useMonthMoonPhases = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<AppError | null>(null)
	const [data, setData] = useState<MonthMoonPhasesResponse | null>(null)

	const clearError = useCallback(() => {
		setError(null)
	}, [])

	const calculateMonthMoonPhases = useCallback(async (formData: MonthMoonPhasesFormData) => {
		setLoading(true)
		setError(null)
		setData(null)

		try {
			const result = await fetchMonthMoonPhases(formData)
			setData(result)
			return result
		} catch (err) {
			const error: AppError = {
				code: 'MONTH_MOON_PHASES_ERROR',
				message: err instanceof Error ? err.message : 'An error occurred while calculating month moon phases',
				timestamp: new Date().toISOString()
			}
			setError(error)
			throw error
		} finally {
			setLoading(false)
		}
	}, [])

	return {
		loading,
		error,
		data,
		clearError,
		calculateMonthMoonPhases
	}
}
