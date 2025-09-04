import React, { createContext, useContext, useReducer, ReactNode } from 'react'
import { AppError } from '../types'

interface AppState {
	theme: 'light' | 'dark'
	loading: boolean
	error: AppError | null
	notifications: Notification[]
}

interface Notification {
	id: string
	message: string
	type: 'success' | 'error' | 'warning' | 'info'
	timestamp: number
}

type AppAction =
	| { type: 'SET_THEME'; payload: 'light' | 'dark' }
	| { type: 'SET_LOADING'; payload: boolean }
	| { type: 'SET_ERROR'; payload: AppError | null }
	| { type: 'ADD_NOTIFICATION'; payload: Omit<Notification, 'id' | 'timestamp'> }
	| { type: 'REMOVE_NOTIFICATION'; payload: string }
	| { type: 'CLEAR_NOTIFICATIONS' }

const initialState: AppState = {
	theme: 'light',
	loading: false,
	error: null,
	notifications: []
}

const appReducer = (state: AppState, action: AppAction): AppState => {
	switch (action.type) {
		case 'SET_THEME':
			return { ...state, theme: action.payload }
		case 'SET_LOADING':
			return { ...state, loading: action.payload }
		case 'SET_ERROR':
			return { ...state, error: action.payload }
		case 'ADD_NOTIFICATION':
			return {
				...state,
				notifications: [
					...state.notifications,
					{
						...action.payload,
						id: Math.random().toString(36).substr(2, 9),
						timestamp: Date.now()
					}
				]
			}
		case 'REMOVE_NOTIFICATION':
			return {
				...state,
				notifications: state.notifications.filter(n => n.id !== action.payload)
			}
		case 'CLEAR_NOTIFICATIONS':
			return { ...state, notifications: [] }
		default:
			return state
	}
}

interface AppContextType {
	state: AppState
	dispatch: React.Dispatch<AppAction>
	setTheme: (theme: 'light' | 'dark') => void
	setLoading: (loading: boolean) => void
	setError: (error: AppError | null) => void
	addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void
	removeNotification: (id: string) => void
	clearNotifications: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const useAppContext = () => {
	const context = useContext(AppContext)
	if (context === undefined) {
		throw new Error('useAppContext must be used within an AppProvider')
	}
	return context
}

interface AppProviderProps {
	children: ReactNode
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
	const [state, dispatch] = useReducer(appReducer, initialState)

	const setTheme = (theme: 'light' | 'dark') => {
		dispatch({ type: 'SET_THEME', payload: theme })
	}

	const setLoading = (loading: boolean) => {
		dispatch({ type: 'SET_LOADING', payload: loading })
	}

	const setError = (error: AppError | null) => {
		dispatch({ type: 'SET_ERROR', payload: error })
	}

	const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
		dispatch({ type: 'ADD_NOTIFICATION', payload: notification })
	}

	const removeNotification = (id: string) => {
		dispatch({ type: 'REMOVE_NOTIFICATION', payload: id })
	}

	const clearNotifications = () => {
		dispatch({ type: 'CLEAR_NOTIFICATIONS' })
	}

	const value: AppContextType = {
		state,
		dispatch,
		setTheme,
		setLoading,
		setError,
		addNotification,
		removeNotification,
		clearNotifications
	}

	return (
		<AppContext.Provider value={value}>
			{children}
		</AppContext.Provider>
	)
}
