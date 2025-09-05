import React from 'react'
import { useTranslation } from 'react-i18next'
import { cn } from '../../utils'

interface YearSelectorProps {
	value: string
	onChange: (year: string) => void
	className?: string
	label?: string
	error?: string
	helperText?: string
}

export const YearSelector: React.FC<YearSelectorProps> = ({
	value,
	onChange,
	className,
	label,
	error,
	helperText
}) => {
	const { t } = useTranslation()
	const currentYear = new Date().getFullYear()
	const inputId = `year-selector-${Math.random().toString(36).substr(2, 9)}`

	const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		onChange(e.target.value)
	}

	const handlePreviousYear = () => {
		const currentValue = parseInt(value) || currentYear
		const newYear = Math.max(1900, currentValue - 1)
		onChange(newYear.toString())
	}

	const handleNextYear = () => {
		const currentValue = parseInt(value) || currentYear
		const newYear = Math.min(2100, currentValue + 1)
		onChange(newYear.toString())
	}

	const handleCurrentYear = () => {
		onChange(currentYear.toString())
	}

	// Generate year options (current year ± 20 years)
	const yearOptions = []
	for (let year = currentYear - 20; year <= currentYear + 20; year++) {
		yearOptions.push(year)
	}

	return (
		<div className={cn('space-y-2', className)}>
			{label && (
				<label
					htmlFor={inputId}
					className="block text-sm font-semibold text-gray-700 mb-2"
				>
					{label}
				</label>
			)}
			
			<div className="flex items-center space-x-2">
				{/* Previous Year Button */}
				<button
					type="button"
					onClick={handlePreviousYear}
					disabled={parseInt(value) <= 1900}
					className="flex-shrink-0 w-10 h-12 flex items-center justify-center bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed rounded-lg border border-gray-300 transition-colors duration-200"
					title={t('previousYear')}
				>
					<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
					</svg>
				</button>

				{/* Year Select Dropdown */}
				<select
					id={inputId}
					value={value}
					onChange={handleYearChange}
					className={cn(
						'flex-1 h-12 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 bg-white text-center',
						error && 'border-red-400 focus:ring-red-500 focus:border-red-500'
					)}
				>
					<option value="">{t('chooseYear')}</option>
					{yearOptions.map((year) => (
						<option key={year} value={year}>
							{year}
						</option>
					))}
				</select>

				{/* Next Year Button */}
				<button
					type="button"
					onClick={handleNextYear}
					disabled={parseInt(value) >= 2100}
					className="flex-shrink-0 w-10 h-12 flex items-center justify-center bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed rounded-lg border border-gray-300 transition-colors duration-200"
					title={t('nextYear')}
				>
					<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
					</svg>
				</button>
			</div>

			{/* Quick Actions */}
			<div className="flex justify-center space-x-2">
				<button
					type="button"
					onClick={handleCurrentYear}
					className="px-3 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-full border border-indigo-200 transition-colors duration-200"
				>
					{t('currentYear')} ({currentYear})
				</button>
			</div>

			{error && (
				<p className="text-sm text-red-600 font-medium">{error}</p>
			)}
			{helperText && !error && (
				<p className="text-sm text-gray-500">{helperText}</p>
			)}
		</div>
	)
}
