export const API_ENDPOINTS = {
	POSITION: process.env.REACT_APP_API_POSITION || '',
	ASPECTS: process.env.REACT_APP_API_ASPECTS || '',
	PHASE: process.env.REACT_APP_API_PHASE || '',
	TRANSIT: process.env.REACT_APP_API_TRANSIT || '',
	MONTH_PHASE: process.env.REACT_APP_API_MONTH_PHASE || '',
} as const

export const GEOCODING_CONFIG = {
	BASE_URL: 'https://nominatim.openstreetmap.org',
	USER_AGENT: 'HoroscopeCalculator/1.0',
} as const

export const DEFAULT_TIMEZONE_OFFSET = 1.0

export const INPUT_MODES = {
	CITY: 'city' as const,
	COORDINATES: 'coordinates' as const,
} as const

export const MODAL_TITLES = {
	HOROSCOPE: 'Horoscope Data',
	ASPECTS: 'Aspects Data',
	MOON_PHASE: 'Moon Phase Data',
	TRANSIT: 'Planet Transit Data',
} as const

export const ERROR_MESSAGES = {
	REQUIRED_FIELDS: 'Please fill in all required fields',
	CITY_NOT_FOUND: 'City not found',
	INVALID_COORDINATES: 'Please enter valid coordinates',
	API_ERROR: 'An error occurred while processing your request',
	NETWORK_ERROR: 'Network error. Please check your connection.',
} as const

export const PLANET_OPTIONS = [
	{ value: 'Sun', label: 'Sun' },
	{ value: 'Moon', label: 'Moon' },
	{ value: 'Mercury', label: 'Mercury' },
	{ value: 'Venus', label: 'Venus' },
	{ value: 'Mars', label: 'Mars' },
	{ value: 'Jupiter', label: 'Jupiter' },
	{ value: 'Saturn', label: 'Saturn' },
	{ value: 'Uranus', label: 'Uranus' },
	{ value: 'Neptune', label: 'Neptune' },
	{ value: 'Pluto', label: 'Pluto' },
] as const

export const MONTH_OPTIONS = [
	{ value: '1', label: 'January' },
	{ value: '2', label: 'February' },
	{ value: '3', label: 'March' },
	{ value: '4', label: 'April' },
	{ value: '5', label: 'May' },
	{ value: '6', label: 'June' },
	{ value: '7', label: 'July' },
	{ value: '8', label: 'August' },
	{ value: '9', label: 'September' },
	{ value: '10', label: 'October' },
	{ value: '11', label: 'November' },
	{ value: '12', label: 'December' },
] as const
