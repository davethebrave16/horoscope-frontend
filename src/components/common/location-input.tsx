import React from 'react'
import { Button } from './button'
import { Input } from './input'
import { InputMode } from '../../types'

interface LocationInputProps {
	inputMode: InputMode
	latitude: string
	longitude: string
	city: string
	loading: boolean
	onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	onSwitchInputMode: (mode: InputMode) => void
	onSearchCity: () => void
}

export const LocationInput: React.FC<LocationInputProps> = ({
	inputMode,
	latitude,
	longitude,
	city,
	loading,
	onInputChange,
	onSwitchInputMode,
	onSearchCity
}) => {
	return (
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
								value={city}
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
					{latitude && longitude && (
						<div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
							<div className="flex items-center space-x-2">
								<div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
								<p className="text-green-800 font-semibold">
									✅ Found: {latitude}°N, {longitude}°E
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
						value={latitude}
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
						value={longitude}
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
	)
}
