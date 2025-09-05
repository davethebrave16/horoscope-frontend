import React from 'react'
import { Button } from '../common/button'
import { Input } from '../common/input'
import { LocationInput } from '../common/location-input'
import { FormData, InputMode } from '../../types'

interface HoroscopeFormProps {
	formData: FormData
	inputMode: InputMode
	loading: boolean
	onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	onSwitchInputMode: (mode: InputMode) => void
	onFillCurrentDateTime: () => void
	onSearchCity: () => void
	onCalculatePosition: () => void
	onCalculateAspects: () => void
	onCalculateMoonPhase: () => void
}

export const HoroscopeForm: React.FC<HoroscopeFormProps> = ({
	formData,
	inputMode,
	loading,
	onInputChange,
	onSwitchInputMode,
	onFillCurrentDateTime,
	onSearchCity,
	onCalculatePosition,
	onCalculateAspects,
	onCalculateMoonPhase
}) => {
	return (
		<div className="space-y-8">
			{/* Input Data Section */}
			<div className="space-y-6">
				<div className="text-center">
					<h2 className="text-2xl font-bold text-gray-800 mb-2">Birth Information</h2>
					<div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
				</div>
				
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
					<Input
						label="Date of Birth"
						type="date"
						name="date"
						value={formData.date}
						onChange={onInputChange}
						required
					/>
					
					<Input
						label="Time of Birth"
						type="time"
						name="time"
						value={formData.time}
						onChange={onInputChange}
						required
					/>
				</div>

				<div className="flex justify-center">
					<Button
						variant="outline"
						onClick={onFillCurrentDateTime}
						className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0 px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
					>
						📅 Use Current Date & Time
					</Button>
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

			{/* Calculations Section */}
			<div className="space-y-6">
				<div className="text-center">
					<h2 className="text-2xl font-bold text-gray-800 mb-2">Astrological Calculations</h2>
					<div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
				</div>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
					<Button
						onClick={onCalculatePosition}
						loading={loading}
						disabled={loading}
						className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:transform-none"
					>
						🌟 Calculate Position
					</Button>
					<Button
						onClick={onCalculateAspects}
						loading={loading}
						disabled={loading}
						className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white border-0 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:transform-none"
					>
						🔮 Calculate Aspects
					</Button>
					<Button
						onClick={onCalculateMoonPhase}
						loading={loading}
						disabled={loading}
						className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white border-0 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:transform-none"
					>
						🌙 Calculate Moon Phase
					</Button>
				</div>
			</div>
		</div>
	)
}
