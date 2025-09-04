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
		<div className="space-y-6">
			<div className="space-y-4">
				<h2 className="text-xl font-semibold text-gray-900">Input Data</h2>
				
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<Input
						label="Date"
						type="date"
						name="date"
						value={formData.date}
						onChange={onInputChange}
						required
					/>
					
					<Input
						label="Time"
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
					>
						📅 Fill Current Date & Time
					</Button>
				</div>
			</div>

			<div className="space-y-4">
				<div className="flex space-x-2">
					<Button
						variant={inputMode === 'city' ? 'primary' : 'outline'}
						onClick={() => onSwitchInputMode('city')}
					>
						City Name
					</Button>
					<Button
						variant={inputMode === 'coordinates' ? 'primary' : 'outline'}
						onClick={() => onSwitchInputMode('coordinates')}
					>
						Coordinates
					</Button>
				</div>

				{inputMode === 'city' ? (
					<div className="space-y-4">
						<div className="flex space-x-2">
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
								>
									Search
								</Button>
							</div>
						</div>
						{formData.latitude && formData.longitude && (
							<div className="rounded-md bg-green-50 p-3">
								<p className="text-sm text-green-800">
									<strong>Found coordinates:</strong> {formData.latitude}°N, {formData.longitude}°E
								</p>
							</div>
						)}
					</div>
				) : (
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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

			<div className="space-y-4">
				<h2 className="text-xl font-semibold text-gray-900">Calculations</h2>
				<div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
					<Button
						onClick={onCalculatePosition}
						loading={loading}
						disabled={loading}
						className="w-full"
					>
						Calculate Position
					</Button>
					<Button
						onClick={onCalculateAspects}
						loading={loading}
						disabled={loading}
						className="w-full"
					>
						Calculate Aspects
					</Button>
					<Button
						onClick={onCalculateMoonPhase}
						loading={loading}
						disabled={loading}
						className="w-full"
					>
						Calculate Moon Phase
					</Button>
				</div>
			</div>
		</div>
	)
}
