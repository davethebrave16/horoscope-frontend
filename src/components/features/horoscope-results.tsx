import React from 'react'
import { useTranslation } from 'react-i18next'
import { HoroscopeResponse, AspectsResponse, MoonPhaseResponse } from '../../types'
import { translatePlanet, translateSign, translateCard, translateAspect, translateAngle, translateMoonPhase } from '../../utils/translations'

interface HoroscopeResultsProps {
	content: HoroscopeResponse | AspectsResponse | MoonPhaseResponse
	title: string
}

export const HoroscopeResults: React.FC<HoroscopeResultsProps> = ({ content, title }) => {
	const { t } = useTranslation()

	const renderHoroscopeData = (data: HoroscopeResponse) => (
		<div className="space-y-8">
			<div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
				<h4 className="mb-4 text-xl font-bold text-green-800 flex items-center">
					<span className="mr-2">📅</span>
					{t('horoscope.birthData')}
				</h4>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
					<div className="bg-white rounded-xl p-4 shadow-sm">
						<p className="text-sm font-semibold text-gray-600 mb-1">{t('horoscope.date')}</p>
						<p className="text-lg font-bold text-gray-900">{data.birth_data.date.day}/{data.birth_data.date.month}/{data.birth_data.date.year}</p>
					</div>
					<div className="bg-white rounded-xl p-4 shadow-sm">
						<p className="text-sm font-semibold text-gray-600 mb-1">{t('horoscope.time')}</p>
						<p className="text-lg font-bold text-gray-900">{data.birth_data.time.hour}:{data.birth_data.time.minute.toString().padStart(2, '0')}:{data.birth_data.time.second.toString().padStart(2, '0')}</p>
					</div>
					<div className="bg-white rounded-xl p-4 shadow-sm">
						<p className="text-sm font-semibold text-gray-600 mb-1">{t('horoscope.location')}</p>
						<p className="text-lg font-bold text-gray-900">{data.birth_data.location.latitude}°N, {data.birth_data.location.longitude}°E</p>
					</div>
				</div>
			</div>
			
			<div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-2xl p-6">
				<h4 className="mb-4 text-xl font-bold text-purple-800 flex items-center">
					<span className="mr-2">🌟</span>
					{t('horoscope.planetaryPositions')}
				</h4>
				<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
					{Object.entries(data.horoscope.planets).map(([planet, data]) => (
						<div key={planet} className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-purple-400">
							<div className="flex justify-between items-center">
								<strong className="text-gray-900 font-bold">{translatePlanet(planet, t)}</strong>
								<span className="text-sm text-gray-500">{data.degree_in_sign.toFixed(2)}°</span>
							</div>
							<p className="text-purple-600 font-semibold mt-1">{translateSign(data.sign, t)}</p>
						</div>
					))}
				</div>
			</div>

			<div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-6">
				<h4 className="mb-4 text-xl font-bold text-blue-800 flex items-center">
					<span className="mr-2">🏠</span>
					{t('horoscope.houses')}
				</h4>
				<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
					{Object.entries(data.horoscope.houses).map(([house, data]) => (
						<div key={house} className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-blue-400">
							<div className="flex justify-between items-center">
								<strong className="text-gray-900 font-bold">{translateAngle(house, t)}</strong>
								<span className="text-sm text-gray-500">{data.degree_in_sign.toFixed(2)}°</span>
							</div>
							<p className="text-blue-600 font-semibold mt-1">{translateSign(data.sign, t)}</p>
						</div>
					))}
				</div>
			</div>

			{/* Lenormand Card Information */}
			<div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-2xl p-6">
				<h4 className="mb-4 text-xl font-bold text-amber-800 flex items-center">
					<span className="mr-2">🃏</span>
					{t('horoscope.lenormandCard')}
				</h4>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
					<div className="bg-white rounded-xl p-4 shadow-sm">
						<p className="text-sm font-semibold text-gray-600 mb-1">{t('horoscope.card')}</p>
						<p className="text-2xl font-bold text-amber-600">{translateCard(data.lenormand_card.card, t)}</p>
					</div>
					<div className="bg-white rounded-xl p-4 shadow-sm">
						<p className="text-sm font-semibold text-gray-600 mb-1">{t('horoscope.moonSign')}</p>
						<p className="text-lg font-bold text-amber-600">{translateSign(data.lenormand_card.moon_sign, t)}</p>
					</div>
					<div className="bg-white rounded-xl p-4 shadow-sm">
						<p className="text-sm font-semibold text-gray-600 mb-1">{t('horoscope.moonDecan')}</p>
						<p className="text-2xl font-bold text-amber-600">{data.lenormand_card.moon_decan}</p>
					</div>
				</div>
			</div>
		</div>
	)

	const renderAspectsData = (data: AspectsResponse) => (
		<div className="space-y-8">
			<div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-6">
				<h4 className="mb-4 text-xl font-bold text-yellow-800 flex items-center">
					<span className="mr-2">📊</span>
					{t('aspects.summary')}
				</h4>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<div className="bg-white rounded-xl p-4 shadow-sm">
						<p className="text-sm font-semibold text-gray-600 mb-1">{t('aspects.totalAspects')}</p>
						<p className="text-2xl font-bold text-yellow-600">{data.aspect_count}</p>
					</div>
					<div className="bg-white rounded-xl p-4 shadow-sm">
						<p className="text-sm font-semibold text-gray-600 mb-1">{t('aspects.orbUsed')}</p>
						<p className="text-2xl font-bold text-yellow-600">{data.orb_used}°</p>
					</div>
				</div>
			</div>
			
			<div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-2xl p-6">
				<h4 className="mb-4 text-xl font-bold text-indigo-800 flex items-center">
					<span className="mr-2">🔮</span>
					{t('aspects.planetaryAspects')}
				</h4>
				<div className="space-y-3">
					{data.aspects.map((aspect, index) => (
						<div key={index} className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-indigo-400">
							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-3">
									<strong className="text-gray-900 font-bold text-lg">{translatePlanet(aspect.planet1, t)}</strong>
									<span className="text-gray-400">-</span>
									<strong className="text-gray-900 font-bold text-lg">{translatePlanet(aspect.planet2, t)}</strong>
								</div>
								<div className="flex items-center space-x-3">
									<span className={`rounded-full px-3 py-1 text-sm font-bold ${
										aspect.aspect.toLowerCase() === 'conjunction' ? 'bg-blue-100 text-blue-800' :
										aspect.aspect.toLowerCase() === 'opposition' ? 'bg-red-100 text-red-800' :
										aspect.aspect.toLowerCase() === 'trine' ? 'bg-green-100 text-green-800' :
										aspect.aspect.toLowerCase() === 'square' ? 'bg-yellow-100 text-yellow-800' :
										'bg-gray-100 text-gray-800'
									}`}>
										{translateAspect(aspect.aspect, t)}
									</span>
									<span className="text-sm font-semibold text-gray-600">{aspect.degrees.toFixed(2)}°</span>
									<span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">±{aspect.orb.toFixed(2)}°</span>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)

	const renderMoonPhaseData = (data: MoonPhaseResponse) => (
		<div className="space-y-8">
			{/* Request Data */}
			<div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
				<h4 className="mb-4 text-xl font-bold text-green-800 flex items-center">
					<span className="mr-2">📅</span>
					{t('horoscope.birthData')}
				</h4>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
					<div className="bg-white rounded-xl p-4 shadow-sm">
						<p className="text-sm font-semibold text-gray-600 mb-1">{t('horoscope.date')}</p>
						<p className="text-lg font-bold text-gray-900">{data.request_data.date.day}/{data.request_data.date.month}/{data.request_data.date.year}</p>
					</div>
					<div className="bg-white rounded-xl p-4 shadow-sm">
						<p className="text-sm font-semibold text-gray-600 mb-1">{t('horoscope.time')}</p>
						<p className="text-lg font-bold text-gray-900">{data.request_data.time.hour}:{data.request_data.time.minute.toString().padStart(2, '0')}:{data.request_data.time.second.toString().padStart(2, '0')}</p>
					</div>
					<div className="bg-white rounded-xl p-4 shadow-sm">
						<p className="text-sm font-semibold text-gray-600 mb-1">{t('moonPhase.julianDate')}</p>
						<p className="text-lg font-bold text-gray-900">{data.moon_phase.julian_date.toFixed(6)}</p>
					</div>
				</div>
			</div>

			{/* Moon Phase Information */}
			<div className="bg-gradient-to-r from-slate-50 to-gray-50 border border-slate-200 rounded-2xl p-6">
				<h4 className="mb-4 text-xl font-bold text-slate-800 flex items-center">
					<span className="mr-2">🌙</span>
					{t('moonPhase.moonPhase')}
				</h4>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-slate-400">
						<p className="text-sm font-semibold text-gray-600 mb-2">{t('moonPhase.phaseName')}</p>
						<p className="text-xl font-bold text-slate-700 italic">
							{translateMoonPhase(data.moon_phase.phase_name, data.moon_phase.fraction_of_cycle, t)}
						</p>
					</div>
					<div className="bg-white rounded-xl p-4 shadow-sm">
						<p className="text-sm font-semibold text-gray-600 mb-1">{t('moonPhase.ageDays')}</p>
						<p className="text-lg font-bold text-slate-600">{data.moon_phase.age_days.toFixed(2)}</p>
					</div>
					<div className="bg-white rounded-xl p-4 shadow-sm">
						<p className="text-sm font-semibold text-gray-600 mb-1">{t('moonPhase.fractionOfCycle')}</p>
						<p className="text-lg font-bold text-slate-600">{(data.moon_phase.fraction_of_cycle * 100).toFixed(1)}%</p>
					</div>
					<div className="bg-white rounded-xl p-4 shadow-sm">
						<p className="text-sm font-semibold text-gray-600 mb-1">{t('moonPhase.illuminatedFraction')}</p>
						<p className="text-lg font-bold text-slate-600">{(data.moon_phase.illuminated_fraction * 100).toFixed(1)}%</p>
					</div>
				</div>
			</div>
		</div>
	)

	return (
		<div>
			{title === t('horoscope.title') && renderHoroscopeData(content as HoroscopeResponse)}
			{title === t('aspects.title') && renderAspectsData(content as AspectsResponse)}
			{title === t('moonPhase.title') && renderMoonPhaseData(content as MoonPhaseResponse)}
		</div>
	)
}
