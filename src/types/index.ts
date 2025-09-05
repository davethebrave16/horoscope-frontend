export interface BirthData {
	date: {
		day: number
		month: number
		year: number
	}
	time: {
		hour: number
		minute: number
		second: number
	}
	location: {
		latitude: number
		longitude: number
	}
}

export interface PlanetData {
	sign: string
	degree_in_sign: number
}

export interface HouseData {
	sign: string
	degree_in_sign: number
}

export interface HoroscopeData {
	planets: Record<string, PlanetData>
	houses: Record<string, HouseData>
}

export interface AspectData {
	planet1: string
	planet2: string
	aspect: string
	degrees: number
	orb: number
}

export interface AspectsResponse {
	aspect_count: number
	orb_used: number
	aspects: AspectData[]
}

export interface MoonPosition {
	sign: string
	decan: string
	degree_in_sign: number
	absolute_longitude: number
}

export interface ReferencePoints {
	ascendant_longitude: number
	descendant_longitude: number
}

export interface MoonPhaseData {
	phase_name: string
	age_days: number
	fraction_of_cycle: number
	illuminated_fraction: number
	julian_date: number
}

export interface MoonPhaseRequestData {
	date: {
		year: number
		month: number
		day: number
	}
	time: {
		hour: number
		minute: number
		second: number
	}
}

export interface MoonPhaseResponse {
	success: boolean
	moon_phase: MoonPhaseData
	request_data: MoonPhaseRequestData
}

export interface HoroscopeResponse {
	success: boolean
	birth_data: BirthData
	horoscope: HoroscopeData
	lenormand_card: LenormandCard
}

export interface GeocodingResult {
	latitude: number
	longitude: number
	displayName: string
	city: string
	country: string
}

export interface FormData {
	date: string
	time: string
	latitude: string
	longitude: string
	city: string
}

export interface TimeData {
	hours: number
	minutes: number
	seconds: number
}

export interface AppError {
	code: string
	message: string
	details?: any
	timestamp: string
}

export type InputMode = 'city' | 'coordinates'

export interface ModalContent {
	title: string
	content: any
}

export interface TransitData {
	planet: string
	angle: string
	datetime_local: string
	longitude: number
	sign: string
	degree_in_sign: number
	decan: number
}

export interface TransitParameters {
	year: number
	month: number
	location: {
		latitude: number
		longitude: number
		timezone_offset_hours: number
	}
	planet: string
	step_minutes: number
}

export interface LenormandCard {
	card: string
	moon_sign: string
	moon_decan: number
}

export interface TransitResponse {
	success: boolean
	transits: TransitData[]
	parameters: TransitParameters
	total_transits: number
}

export interface TransitFormData {
	year: string
	month: string
	planet: string
	latitude: string
	longitude: string
	city: string
}

export type PlanetOption = 'Sun' | 'Moon' | 'Mercury' | 'Venus' | 'Mars' | 'Jupiter' | 'Saturn' | 'Uranus' | 'Neptune' | 'Pluto'
