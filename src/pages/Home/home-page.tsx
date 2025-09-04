import React from 'react'
import { useForm } from '../../hooks/use-form'
import { useHoroscope } from '../../hooks/use-horoscope'
import { useModal } from '../../hooks/use-modal'
import { HoroscopeForm } from '../../components/features/horoscope-form'
import { HoroscopeResults } from '../../components/features/horoscope-results'
import { Modal } from '../../components/common/modal'
import { ErrorMessage } from '../../components/common/error-message'
import { formDataSchema } from '../../utils/validation'
import { ERROR_MESSAGES } from '../../constants'

export const HomePage: React.FC = () => {
	const {
		formData,
		inputMode,
		handleInputChange,
		switchInputMode,
		fillCurrentDateTime,
		updateCoordinates
	} = useForm()

	const {
		loading,
		error,
		clearError,
		searchCity,
		calculateHoroscope,
		calculateAspects,
		calculateMoonPhase
	} = useHoroscope()

	const { isOpen, modalContent, openModal, closeModal } = useModal()

	const handleSearchCity = async () => {
		if (!formData.city.trim()) {
			alert(ERROR_MESSAGES.REQUIRED_FIELDS)
			return
		}

		try {
			const result = await searchCity(formData.city)
			updateCoordinates(result.latitude.toString(), result.longitude.toString())
			alert(`Found: ${result.city}, ${result.country}\nCoordinates: ${result.latitude.toFixed(4)}°N, ${result.longitude.toFixed(4)}°E`)
		} catch (err) {
			// Error is handled by the hook
		}
	}

	const handleCalculate = async (calculationType: 'position' | 'aspects' | 'moonPhase') => {
		// Validate form data
		const validation = formDataSchema.safeParse(formData)
		if (!validation.success) {
			alert(ERROR_MESSAGES.REQUIRED_FIELDS)
			return
		}

		try {
			let data
			switch (calculationType) {
				case 'position':
					data = await calculateHoroscope(formData, inputMode)
					openModal('Horoscope Data', data)
					break
				case 'aspects':
					data = await calculateAspects(formData, inputMode)
					openModal('Aspects Data', data)
					break
				case 'moonPhase':
					data = await calculateMoonPhase(formData, inputMode)
					openModal('Moon Phase Data', data)
					break
			}
		} catch (err) {
			// Error is handled by the hook
		}
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
				<div className="rounded-lg bg-white p-6 shadow-sm">
					<HoroscopeForm
						formData={formData}
						inputMode={inputMode}
						loading={loading}
						onInputChange={handleInputChange}
						onSwitchInputMode={switchInputMode}
						onFillCurrentDateTime={fillCurrentDateTime}
						onSearchCity={handleSearchCity}
						onCalculatePosition={() => handleCalculate('position')}
						onCalculateAspects={() => handleCalculate('aspects')}
						onCalculateMoonPhase={() => handleCalculate('moonPhase')}
					/>

					<ErrorMessage error={error} onDismiss={clearError} />
				</div>
			</div>

			<Modal
				isOpen={isOpen}
				onClose={closeModal}
				title={modalContent?.title || ''}
			>
				{modalContent && (
					<HoroscopeResults
						content={modalContent.content}
						title={modalContent.title}
					/>
				)}
			</Modal>
		</div>
	)
}
