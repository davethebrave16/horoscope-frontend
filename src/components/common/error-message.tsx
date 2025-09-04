import React from 'react'
import { AppError } from '../../types'

interface ErrorMessageProps {
	error: AppError | null
	onDismiss?: () => void
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error, onDismiss }) => {
	if (!error) return null

	return (
		<div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl p-6 shadow-lg">
			<div className="flex items-start">
				<div className="flex-shrink-0">
					<div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
						<svg
							className="h-6 w-6 text-red-600"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
								clipRule="evenodd"
							/>
						</svg>
					</div>
				</div>
				<div className="ml-4 flex-1">
					<h3 className="text-lg font-bold text-red-800 mb-2">
						⚠️ Error ({error.code})
					</h3>
					<div className="text-red-700">
						<p className="font-semibold">{error.message}</p>
						{error.details && (
							<pre className="mt-3 bg-white rounded-lg p-3 text-xs text-gray-600 border overflow-x-auto">
								{JSON.stringify(error.details, null, 2)}
							</pre>
						)}
					</div>
					{onDismiss && (
						<div className="mt-4">
							<button
								type="button"
								onClick={onDismiss}
								className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 shadow-md hover:shadow-lg"
							>
								✕ Dismiss
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
