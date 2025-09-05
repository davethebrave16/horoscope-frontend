import React from 'react'
import { useTranslation } from 'react-i18next'
import { MonthMoonPhasesResponse } from '../../types'

interface MonthMoonPhasesResultsProps {
	data: MonthMoonPhasesResponse
	title: string
}

export const MonthMoonPhasesResults: React.FC<MonthMoonPhasesResultsProps> = ({
	data,
	title
}) => {
	const { t, i18n } = useTranslation()

	const formatDate = (dateString: string) => {
		const date = new Date(dateString)
		return date.toLocaleDateString(i18n.language, {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})
	}

	const formatIlluminatedFraction = (fraction: number) => {
		return `${(fraction * 100).toFixed(1)}%`
	}

	const getPhaseEmoji = (phaseName: string) => {
		switch (phaseName) {
			case 'New Moon':
				return '🌑'
			case 'Waxing Crescent':
				return '🌒'
			case 'First Quarter':
				return '🌓'
			case 'Waxing Gibbous':
				return '🌔'
			case 'Full Moon':
				return '🌕'
			case 'Waning Gibbous':
				return '🌖'
			case 'Last Quarter':
				return '🌗'
			case 'Waning Crescent':
				return '🌘'
			default:
				return '🌙'
		}
	}

	const translatePhaseName = (phaseName: string) => {
		return t(`moonPhases.phases.${phaseName}`)
	}

	return (
		<div className="space-y-6">
			<div className="text-center">
				<h3 className="text-xl font-bold text-gray-800 mb-2">
					{title} - {data.request_data.year}/{data.request_data.month}
				</h3>
				<p className="text-gray-600">
					{t('moonPhases.totalPhases')}: {data.month_moon_phases.length}
				</p>
			</div>

			<div className="max-h-96 overflow-y-auto">
				<div className="grid gap-3">
					{data.month_moon_phases.map((phase, index) => (
						<div
							key={index}
							className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
						>
							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-3">
									<span className="text-2xl">
										{getPhaseEmoji(phase.phase_name)}
									</span>
									<div>
										<h4 className="font-semibold text-gray-800">
											{formatDate(phase.date)}
										</h4>
										<p className="text-sm text-gray-600">
											{translatePhaseName(phase.phase_name)}
										</p>
									</div>
								</div>
								<div className="text-right">
									<p className="text-sm font-medium text-gray-700">
										{t('moonPhases.age')}: {phase.age_days.toFixed(1)} {t('moonPhases.days')}
									</p>
									<p className="text-sm text-gray-600">
										{t('moonPhases.illuminated')}: {formatIlluminatedFraction(phase.illuminated_fraction)}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
