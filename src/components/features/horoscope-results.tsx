import React from 'react'
import { HoroscopeResponse, AspectsResponse, MoonPhaseResponse } from '../../types'

interface HoroscopeResultsProps {
	content: HoroscopeResponse | AspectsResponse | MoonPhaseResponse
	title: string
}

export const HoroscopeResults: React.FC<HoroscopeResultsProps> = ({ content, title }) => {
	const renderHoroscopeData = (data: HoroscopeResponse) => (
		<div className="space-y-6">
			<div className="rounded-lg bg-gray-50 p-4">
				<h4 className="mb-3 text-lg font-semibold text-gray-900">Birth Information</h4>
				<div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
					<p><strong>Date:</strong> {data.birth_data.date.day}/{data.birth_data.date.month}/{data.birth_data.date.year}</p>
					<p><strong>Time:</strong> {data.birth_data.time.hour}:{data.birth_data.time.minute.toString().padStart(2, '0')}:{data.birth_data.time.second.toString().padStart(2, '0')}</p>
					<p><strong>Location:</strong> {data.birth_data.location.latitude}°N, {data.birth_data.location.longitude}°E</p>
				</div>
			</div>
			
			<div className="rounded-lg bg-gray-50 p-4">
				<h4 className="mb-3 text-lg font-semibold text-gray-900">Planets</h4>
				<div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
					{Object.entries(data.horoscope.planets).map(([planet, data]) => (
						<div key={planet} className="rounded bg-white p-2 shadow-sm">
							<strong className="text-gray-900">{planet}:</strong>
							<span className="ml-1 text-gray-700">{data.sign} ({data.degree_in_sign.toFixed(2)}°)</span>
						</div>
					))}
				</div>
			</div>

			<div className="rounded-lg bg-gray-50 p-4">
				<h4 className="mb-3 text-lg font-semibold text-gray-900">Houses</h4>
				<div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
					{Object.entries(data.horoscope.houses).map(([house, data]) => (
						<div key={house} className="rounded bg-white p-2 shadow-sm">
							<strong className="text-gray-900">{house}:</strong>
							<span className="ml-1 text-gray-700">{data.sign} ({data.degree_in_sign.toFixed(2)}°)</span>
						</div>
					))}
				</div>
			</div>
		</div>
	)

	const renderAspectsData = (data: AspectsResponse) => (
		<div className="space-y-6">
			<div className="rounded-lg bg-gray-50 p-4">
				<h4 className="mb-3 text-lg font-semibold text-gray-900">Summary</h4>
				<div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
					<p><strong>Total Aspects:</strong> {data.aspect_count}</p>
					<p><strong>Orb Used:</strong> {data.orb_used}°</p>
				</div>
			</div>
			
			<div className="rounded-lg bg-gray-50 p-4">
				<h4 className="mb-3 text-lg font-semibold text-gray-900">Aspects</h4>
				<div className="space-y-2">
					{data.aspects.map((aspect, index) => (
						<div key={index} className="rounded bg-white p-3 shadow-sm">
							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-2">
									<strong className="text-gray-900">{aspect.planet1}</strong>
									<span className="text-gray-500">-</span>
									<strong className="text-gray-900">{aspect.planet2}</strong>
								</div>
								<div className="flex items-center space-x-3">
									<span className={`rounded px-2 py-1 text-xs font-medium ${
										aspect.aspect.toLowerCase() === 'conjunction' ? 'bg-blue-100 text-blue-800' :
										aspect.aspect.toLowerCase() === 'opposition' ? 'bg-red-100 text-red-800' :
										aspect.aspect.toLowerCase() === 'trine' ? 'bg-green-100 text-green-800' :
										aspect.aspect.toLowerCase() === 'square' ? 'bg-yellow-100 text-yellow-800' :
										'bg-gray-100 text-gray-800'
									}`}>
										{aspect.aspect}
									</span>
									<span className="text-sm text-gray-600">{aspect.degrees.toFixed(2)}°</span>
									<span className="text-xs text-gray-500">±{aspect.orb.toFixed(2)}°</span>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)

	const renderMoonPhaseData = (data: MoonPhaseResponse) => (
		<div className="space-y-6">
			<div className="rounded-lg bg-gray-50 p-4">
				<h4 className="mb-3 text-lg font-semibold text-gray-900">Phase Description</h4>
				<p className="text-gray-700">{data.moon_phase}</p>
			</div>
			
			<div className="rounded-lg bg-gray-50 p-4">
				<h4 className="mb-3 text-lg font-semibold text-gray-900">Moon Position</h4>
				<div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
					<p><strong>Sign:</strong> {data.moon_position.sign}</p>
					<p><strong>Decan:</strong> {data.moon_position.decan}</p>
					<p><strong>Degree in Sign:</strong> {data.moon_position.degree_in_sign.toFixed(2)}°</p>
					<p><strong>Absolute Longitude:</strong> {data.moon_position.absolute_longitude.toFixed(2)}°</p>
				</div>
			</div>

			<div className="rounded-lg bg-gray-50 p-4">
				<h4 className="mb-3 text-lg font-semibold text-gray-900">Reference Points</h4>
				<div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
					<p><strong>Ascendant Longitude:</strong> {data.reference_points.ascendant_longitude.toFixed(2)}°</p>
					<p><strong>Descendant Longitude:</strong> {data.reference_points.descendant_longitude.toFixed(2)}°</p>
				</div>
			</div>
		</div>
	)

	return (
		<div>
			{title === 'Horoscope Data' && renderHoroscopeData(content as HoroscopeResponse)}
			{title === 'Aspects Data' && renderAspectsData(content as AspectsResponse)}
			{title === 'Moon Phase Data' && renderMoonPhaseData(content as MoonPhaseResponse)}
		</div>
	)
}
