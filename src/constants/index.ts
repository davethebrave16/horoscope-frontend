export const API_ENDPOINTS = {
	POSITION: process.env.REACT_APP_API_POSITION || '',
	ASPECTS: process.env.REACT_APP_API_ASPECTS || '',
	PHASE: process.env.REACT_APP_API_PHASE || '',
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
} as const

export const ERROR_MESSAGES = {
	REQUIRED_FIELDS: 'Please fill in all required fields',
	CITY_NOT_FOUND: 'City not found',
	INVALID_COORDINATES: 'Please enter valid coordinates',
	API_ERROR: 'An error occurred while processing your request',
	NETWORK_ERROR: 'Network error. Please check your connection.',
} as const
