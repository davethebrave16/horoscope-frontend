import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../common/button'
import { YearMonthSelector } from '../common/year-month-selector'
import { MonthMoonPhasesFormData } from '../../types'

interface MonthMoonPhasesFormProps {
	formData: MonthMoonPhasesFormData
	loading: boolean
	onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
	onCalculateMonthMoonPhases: () => void
}

export const MonthMoonPhasesForm: React.FC<MonthMoonPhasesFormProps> = ({
	formData,
	loading,
	onInputChange,
	onCalculateMonthMoonPhases
}) => {
	const { t } = useTranslation()

	const handleYearChange = (year: string) => {
		onInputChange({ target: { name: 'year', value: year } } as React.ChangeEvent<HTMLInputElement>)
	}

	const handleMonthChange = (month: string) => {
		onInputChange({ target: { name: 'month', value: month } } as React.ChangeEvent<HTMLSelectElement>)
	}

	return (
		<div className="space-y-8">
			{/* Time Period Section */}
			<div className="space-y-6">
				<div className="text-center">
					<h2 className="text-2xl font-bold text-gray-800 mb-2">{t('timePeriod')}</h2>
					<div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
				</div>
				
				<YearMonthSelector
					year={formData.year}
					month={formData.month}
					onYearChange={handleYearChange}
					onMonthChange={handleMonthChange}
					yearLabel={t('moonPhases.year')}
					monthLabel={t('moonPhases.month')}
				/>
			</div>

			{/* Calculate Button */}
			<div className="space-y-6">
				<div className="text-center">
					<h2 className="text-2xl font-bold text-gray-800 mb-2">{t('moonPhases.calculateMonthPhases')}</h2>
					<div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
				</div>
				<div className="flex justify-center">
					<Button
						onClick={onCalculateMonthMoonPhases}
						loading={loading}
						disabled={loading}
						className="w-full max-w-md bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:transform-none"
					>
						🌙 {t('moonPhases.calculateMonthPhases')}
					</Button>
				</div>
			</div>
		</div>
	)
}
