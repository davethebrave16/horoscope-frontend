import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const formatDate = (date: Date): string => {
	return date.toISOString().split('T')[0]
}

export const formatTime = (date: Date): string => {
	return date.toTimeString().split(' ')[0].substring(0, 5)
}

export const getCurrentDateTime = () => {
	const now = new Date()
	return {
		date: formatDate(now),
		time: formatTime(now)
	}
}

export const parseTimeString = (timeString: string) => {
	const [hours, minutes] = timeString.split(':')
	return {
		hours: parseInt(hours, 10),
		minutes: parseInt(minutes, 10),
		seconds: 0
	}
}

export const createAppError = (message: string, code: string = 'APP_ERROR') => ({
	code,
	message,
	timestamp: new Date().toISOString()
})

export const delay = (ms: number): Promise<void> => {
	return new Promise(resolve => setTimeout(resolve, ms))
}
