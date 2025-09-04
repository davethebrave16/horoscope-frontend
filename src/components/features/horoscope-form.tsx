import React from 'react'
import { Button } from '../common/button'
import { Input } from '../common/input'
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
			<div className="space-y-6">
				<div className="text-center">
					<h2 className="text-2xl font-bold text-gray-800 mb-2">Location</h2>
					<div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
				</div>

				<div className="flex justify-center space-x-2 bg-gray-100 p-1 rounded-full">
					<Button
						variant={inputMode === 'city' ? 'primary' : 'ghost'}
						onClick={() => onSwitchInputMode('city')}
						className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
							inputMode === 'city' 
								? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg' 
								: 'text-gray-600 hover:text-gray-800'
						}`}
					>
						🏙️ City Name
					</Button>
					<Button
						variant={inputMode === 'coordinates' ? 'primary' : 'ghost'}
						onClick={() => onSwitchInputMode('coordinates')}
						className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
							inputMode === 'coordinates' 
								? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg' 
								: 'text-gray-600 hover:text-gray-800'
						}`}
					>
						📍 Coordinates
					</Button>
				</div>

				{inputMode === 'city' ? (
					<div className="space-y-4">
						<div className="flex space-x-3">
							<div className="flex-1">
								<Input
									label="City Name"
									name="city"
									value={formData.city}
									onChange={onInputChange}
									placeholder="e.g., New York, London, Tokyo"
									required
								/>
							</div>
							<div className="flex items-end">
								<Button
									variant="secondary"
									onClick={onSearchCity}
									loading={loading}
									className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white border-0 px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
								>
									🔍 Search
								</Button>
							</div>
						</div>
						{formData.latitude && formData.longitude && (
							<div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
								<div className="flex items-center space-x-2">
									<div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
									<p className="text-green-800 font-semibold">
										✅ Found: {formData.latitude}°N, {formData.longitude}°E
									</p>
								</div>
							</div>
						)}
					</div>
				) : (
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
						<Input
							label="Latitude"
							type="number"
							name="latitude"
							value={formData.latitude}
							onChange={onInputChange}
							placeholder="e.g., 40.7128"
							step="0.0001"
							min="-90"
							max="90"
							required
						/>
						<Input
							label="Longitude"
							type="number"
							name="longitude"
							value={formData.longitude}
							onChange={onInputChange}
							placeholder="e.g., -74.0060"
							step="0.0001"
							min="-180"
							max="180"
							required
						/>
					</div>
				)}
			</div>

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
