import React from 'react'
import { useTranslation } from 'react-i18next'
import { TransitResponse } from '../../types'
import { translatePlanet, translateSign, translateMonth, translateAngle } from '../../utils/translations'

interface TransitResultsProps {
	content: TransitResponse
	title: string
}

export const TransitResults: React.FC<TransitResultsProps> = ({ content }) => {
	const { t } = useTranslation()

	const formatDateTime = (dateTimeString: string) => {
		const date = new Date(dateTimeString)
		return date.toLocaleString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			hour12: false
		})
	}

	const getAngleIcon = (angle: string) => {
		switch (angle) {
			case 'Ascendant':
				return '⬆️'
			case 'Descendant':
				return '⬇️'
			case 'Midheaven':
				return '🔝'
			case 'Imum Coeli':
				return '🔻'
			default:
				return '📍'
		}
	}

	const getSignColor = (sign: string) => {
		const signColors: Record<string, string> = {
			'Ariete': 'from-red-50 to-red-100 border-red-200 text-red-800',
			'Toro': 'from-green-50 to-green-100 border-green-200 text-green-800',
			'Gemelli': 'from-yellow-50 to-yellow-100 border-yellow-200 text-yellow-800',
			'Cancro': 'from-blue-50 to-blue-100 border-blue-200 text-blue-800',
			'Leone': 'from-orange-50 to-orange-100 border-orange-200 text-orange-800',
			'Vergine': 'from-emerald-50 to-emerald-100 border-emerald-200 text-emerald-800',
			'Bilancia': 'from-pink-50 to-pink-100 border-pink-200 text-pink-800',
			'Scorpione': 'from-purple-50 to-purple-100 border-purple-200 text-purple-800',
			'Sagittario': 'from-indigo-50 to-indigo-100 border-indigo-200 text-indigo-800',
			'Capricorno': 'from-gray-50 to-gray-100 border-gray-200 text-gray-800',
			'Acquario': 'from-cyan-50 to-cyan-100 border-cyan-200 text-cyan-800',
			'Pesci': 'from-violet-50 to-violet-100 border-violet-200 text-violet-800'
		}
		return signColors[sign] || 'from-gray-50 to-gray-100 border-gray-200 text-gray-800'
	}

	return (
		<div className="space-y-8">
			{/* Summary Section */}
			<div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-2xl p-6">
				<h4 className="mb-4 text-xl font-bold text-orange-800 flex items-center">
					<span className="mr-2">📊</span>
					{t('transits.title')} Summary
				</h4>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
					<div className="bg-white rounded-xl p-4 shadow-sm">
						<p className="text-sm font-semibold text-gray-600 mb-1">{t('transits.planet')}</p>
						<p className="text-2xl font-bold text-orange-600">{translatePlanet(content.parameters.planet, t)}</p>
					</div>
					<div className="bg-white rounded-xl p-4 shadow-sm">
						<p className="text-sm font-semibold text-gray-600 mb-1">{t('totalTransits')}</p>
						<p className="text-2xl font-bold text-orange-600">{content.total_transits}</p>
					</div>
					<div className="bg-white rounded-xl p-4 shadow-sm">
						<p className="text-sm font-semibold text-gray-600 mb-1">{t('period')}</p>
						<p className="text-lg font-bold text-orange-600">
							{translateMonth(content.parameters.month.toString(), t)}/{content.parameters.year}
						</p>
					</div>
				</div>
			</div>

			{/* Location Information */}
			<div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-6">
				<h4 className="mb-4 text-xl font-bold text-blue-800 flex items-center">
					<span className="mr-2">📍</span>
					{t('forms.location')} Information
				</h4>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<div className="bg-white rounded-xl p-4 shadow-sm">
						<p className="text-sm font-semibold text-gray-600 mb-1">{t('forms.coordinates')}</p>
						<p className="text-lg font-bold text-blue-600">
							{content.parameters.location.latitude.toFixed(4)}°N, {content.parameters.location.longitude.toFixed(4)}°E
						</p>
					</div>
					<div className="bg-white rounded-xl p-4 shadow-sm">
						<p className="text-sm font-semibold text-gray-600 mb-1">{t('timezoneOffset')}</p>
						<p className="text-lg font-bold text-blue-600">
							{content.parameters.location.timezone_offset_hours}h
						</p>
					</div>
				</div>
			</div>

			{/* Transit Events */}
			<div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-2xl p-6">
				<h4 className="mb-4 text-xl font-bold text-purple-800 flex items-center">
					<span className="mr-2">🪐</span>
					{t('transits.title')} Events
				</h4>
				<div className="space-y-3 max-h-96 overflow-y-auto">
					{content.transits.map((transit, index) => (
						<div key={index} className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-purple-400">
							<div className="flex items-center justify-between mb-2">
								<div className="flex items-center space-x-3">
									<span className="text-2xl">{getAngleIcon(transit.angle)}</span>
									<div>
										<strong className="text-gray-900 font-bold text-lg">{translateAngle(transit.angle, t)}</strong>
										<p className="text-sm text-gray-600">{formatDateTime(transit.datetime_local)}</p>
									</div>
								</div>
								<div className="text-right">
									<p className="text-sm font-semibold text-gray-600">{t('degree')}</p>
									<p className="text-lg font-bold text-purple-600">{transit.degree_in_sign.toFixed(2)}°</p>
								</div>
							</div>
							<div className="flex items-center justify-between">
								<div className={`px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r ${getSignColor(transit.sign)}`}>
									{translateSign(transit.sign, t)}
								</div>
								<div className="flex items-center space-x-4 text-sm text-gray-600">
									<span>{t('moonPhase.decan')}: {transit.decan}</span>
									<span>{t('longitude')}: {transit.longitude.toFixed(2)}°</span>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
