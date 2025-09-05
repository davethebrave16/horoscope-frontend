import React from 'react'
import { useTranslation } from 'react-i18next'
import { YearSelector } from './year-selector'
import { MONTH_OPTIONS } from '../../constants'
import { translateMonth } from '../../utils/translations'

interface YearMonthSelectorProps {
	year: string
	month: string
	onYearChange: (year: string) => void
	onMonthChange: (month: string) => void
	yearLabel?: string
	monthLabel?: string
}

export const YearMonthSelector: React.FC<YearMonthSelectorProps> = ({
	year,
	month,
	onYearChange,
	onMonthChange,
	yearLabel,
	monthLabel
}) => {
	const { t } = useTranslation()

	return (
		<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
			<YearSelector
				label={yearLabel || t('year')}
				value={year}
				onChange={onYearChange}
			/>
			
			<div>
				<label className="block text-sm font-semibold text-gray-700 mb-2">
					{monthLabel || t('month')}
				</label>
				<select
					value={month}
					onChange={(e) => onMonthChange(e.target.value)}
					className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 bg-white"
					required
				>
					<option value="">{t('chooseMonth')}</option>
					{MONTH_OPTIONS.map((option) => (
						<option key={option.value} value={option.value}>
							{translateMonth(option.value, t)}
						</option>
					))}
				</select>
			</div>
		</div>
	)
}
