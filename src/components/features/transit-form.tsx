import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../common/button'
import { Input } from '../common/input'
import { LocationInput } from '../common/location-input'
import { TransitFormData, InputMode } from '../../types'
import { PLANET_OPTIONS, MONTH_OPTIONS } from '../../constants'

interface TransitFormProps {
	formData: TransitFormData
	inputMode: InputMode
	loading: boolean
	onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
	onSwitchInputMode: (mode: InputMode) => void
	onSearchCity: () => void
	onCalculateTransits: () => void
}

export const TransitForm: React.FC<TransitFormProps> = ({
	formData,
	inputMode,
	loading,
	onInputChange,
	onSwitchInputMode,
	onSearchCity,
	onCalculateTransits
}) => {
	const { t } = useTranslation()
	const currentYear = new Date().getFullYear()

	return (
		<div className="space-y-8">
			{/* Time Period Section */}
			<div className="space-y-6">
				<div className="text-center">
					<h2 className="text-2xl font-bold text-gray-800 mb-2">Time Period</h2>
					<div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
				</div>
				
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
					<Input
						label={t('transits.year')}
						type="number"
						name="year"
						value={formData.year}
						onChange={onInputChange}
						placeholder={currentYear.toString()}
						min="1900"
						max="2100"
						required
					/>
					
					<div>
						<label className="block text-sm font-semibold text-gray-700 mb-2">
							{t('transits.month')}
						</label>
						<select
							name="month"
							value={formData.month}
							onChange={onInputChange}
							className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 bg-white"
							required
						>
							<option value="">Choose a month...</option>
							{MONTH_OPTIONS.map((option) => (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							))}
						</select>
					</div>
				</div>
			</div>

			{/* Planet Selection Section */}
			<div className="space-y-6">
				<div className="text-center">
					<h2 className="text-2xl font-bold text-gray-800 mb-2">Planet Selection</h2>
					<div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
				</div>
				
				<div>
					<label className="block text-sm font-semibold text-gray-700 mb-2">
						{t('transits.planet')}
					</label>
					<select
						name="planet"
						value={formData.planet}
						onChange={onInputChange}
						className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 bg-white"
						required
					>
						<option value="">Choose a planet...</option>
						{PLANET_OPTIONS.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
				</div>
			</div>

			{/* Location Section */}
			<LocationInput
				inputMode={inputMode}
				latitude={formData.latitude}
				longitude={formData.longitude}
				city={formData.city}
				loading={loading}
				onInputChange={onInputChange}
				onSwitchInputMode={onSwitchInputMode}
				onSearchCity={onSearchCity}
			/>

			{/* Calculate Button */}
			<div className="space-y-6">
				<div className="text-center">
					<h2 className="text-2xl font-bold text-gray-800 mb-2">{t('transits.calculateTransits')}</h2>
					<div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
				</div>
				<div className="flex justify-center">
					<Button
						onClick={onCalculateTransits}
						loading={loading}
						disabled={loading}
						className="w-full max-w-md bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:transform-none"
					>
						🪐 {t('transits.calculateTransits')}
					</Button>
				</div>
			</div>
		</div>
	)
}
