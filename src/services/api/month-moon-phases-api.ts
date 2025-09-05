import { API_ENDPOINTS } from '../../constants'
import { MonthMoonPhasesResponse, MonthMoonPhasesFormData, AppError } from '../../types'

const createAppError = (message: string, code: string = 'API_ERROR'): AppError => ({
	code,
	message,
	timestamp: new Date().toISOString()
})

const handleApiResponse = async (response: Response, errorMessage: string) => {
	if (!response.ok) {
		throw createAppError(`${errorMessage}: ${response.status}`, 'HTTP_ERROR')
	}

	const data = await response.json()
	
	if (!data.success) {
		throw createAppError('API returned unsuccessful response', 'API_ERROR')
	}

	return data
}

export const fetchMonthMoonPhases = async (formData: MonthMoonPhasesFormData): Promise<MonthMoonPhasesResponse> => {
	const { year, month } = formData

	if (!year || !month) {
		throw createAppError('Year and month are required', 'VALIDATION_ERROR')
	}

	if (!API_ENDPOINTS.MONTH_PHASE) {
		throw createAppError('Month phases API endpoint not configured', 'CONFIG_ERROR')
	}

	try {
		const requestBody = {
			year: parseInt(year),
			month: parseInt(month)
		}

		const response = await fetch(API_ENDPOINTS.MONTH_PHASE, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`
			},
			body: JSON.stringify(requestBody)
		})

		return await handleApiResponse(response, 'Failed to fetch month moon phases')
	} catch (error) {
		console.error('Month Moon Phases API Error:', error)
		if (error instanceof Error) {
			throw createAppError(error.message, 'MONTH_MOON_PHASES_API_ERROR')
		}
		throw createAppError('Unknown error occurred', 'UNKNOWN_ERROR')
	}
}
