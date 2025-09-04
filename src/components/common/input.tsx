import React from 'react'
import { cn } from '../../utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string
	error?: string
	helperText?: string
}

export const Input: React.FC<InputProps> = ({
	label,
	error,
	helperText,
	className,
	id,
	...props
}) => {
	const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`

	return (
		<div className="space-y-2">
			{label && (
				<label
					htmlFor={inputId}
					className="block text-sm font-semibold text-gray-700 mb-2"
				>
					{label}
				</label>
			)}
			<input
				id={inputId}
				className={cn(
					'flex h-12 w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-sm font-medium ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:border-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 shadow-sm hover:shadow-md focus:shadow-lg',
					error && 'border-red-400 focus-visible:ring-red-500 focus-visible:border-red-500',
					className
				)}
				{...props}
			/>
			{error && (
				<p className="text-sm text-red-600 font-medium">{error}</p>
			)}
			{helperText && !error && (
				<p className="text-sm text-gray-500">{helperText}</p>
			)}
		</div>
	)
}
