import { z } from 'zod'

export const formDataSchema = z.object({
	date: z.string().min(1, 'Date is required'),
	time: z.string().min(1, 'Time is required'),
	latitude: z.string().optional(),
	longitude: z.string().optional(),
	city: z.string().optional()
}).refine((data) => {
	// Either city or coordinates must be provided
	return data.city?.trim() || (data.latitude && data.longitude)
}, {
	message: 'Either city name or coordinates must be provided',
	path: ['city']
})

export const coordinatesSchema = z.object({
	latitude: z.string()
		.min(1, 'Latitude is required')
		.refine((val) => {
			const num = parseFloat(val)
			return !isNaN(num) && num >= -90 && num <= 90
		}, 'Latitude must be between -90 and 90'),
	longitude: z.string()
		.min(1, 'Longitude is required')
		.refine((val) => {
			const num = parseFloat(val)
			return !isNaN(num) && num >= -180 && num <= 180
		}, 'Longitude must be between -180 and 180')
})

export const citySchema = z.object({
	city: z.string().min(1, 'City name is required')
})

export const timeDataSchema = z.object({
	hours: z.number().min(0).max(23),
	minutes: z.number().min(0).max(59),
	seconds: z.number().min(0).max(59)
})

export const transitFormDataSchema = z.object({
	year: z.string().min(1, 'Year is required')
		.refine((val) => {
			const num = parseInt(val)
			return !isNaN(num) && num >= 1900 && num <= 2100
		}, 'Year must be between 1900 and 2100'),
	month: z.string().min(1, 'Month is required')
		.refine((val) => {
			const num = parseInt(val)
			return !isNaN(num) && num >= 1 && num <= 12
		}, 'Month must be between 1 and 12'),
	planet: z.string().min(1, 'Planet is required'),
	latitude: z.string().optional(),
	longitude: z.string().optional(),
	city: z.string().optional()
}).refine((data) => {
	// Either city or coordinates must be provided
	return data.city?.trim() || (data.latitude && data.longitude)
}, {
	message: 'Either city name or coordinates must be provided',
	path: ['city']
})

export const monthMoonPhasesFormDataSchema = z.object({
	year: z.string().min(1, 'Year is required')
		.refine((val) => {
			const num = parseInt(val)
			return !isNaN(num) && num >= 1900 && num <= 2100
		}, 'Year must be between 1900 and 2100'),
	month: z.string().min(1, 'Month is required')
		.refine((val) => {
			const num = parseInt(val)
			return !isNaN(num) && num >= 1 && num <= 12
		}, 'Month must be between 1 and 12')
})

export type FormDataSchema = z.infer<typeof formDataSchema>
export type CoordinatesSchema = z.infer<typeof coordinatesSchema>
export type CitySchema = z.infer<typeof citySchema>
export type TimeDataSchema = z.infer<typeof timeDataSchema>
export type TransitFormDataSchema = z.infer<typeof transitFormDataSchema>
export type MonthMoonPhasesFormDataSchema = z.infer<typeof monthMoonPhasesFormDataSchema>
