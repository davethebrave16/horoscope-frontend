import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from '../../hooks/use-form'
import { useHoroscope } from '../../hooks/use-horoscope'
import { useTransit } from '../../hooks/use-transit'
import { useTransitForm } from '../../hooks/use-transit-form'
import { useModal } from '../../hooks/use-modal'
import { HoroscopeForm } from '../../components/features/horoscope-form'
import { HoroscopeResults } from '../../components/features/horoscope-results'
import { TransitForm } from '../../components/features/transit-form'
import { TransitResults } from '../../components/features/transit-results'
import { Modal } from '../../components/common/modal'
import { ErrorMessage } from '../../components/common/error-message'
import { formDataSchema, transitFormDataSchema } from '../../utils/validation'
import { ERROR_MESSAGES } from '../../constants'

export const HomePage: React.FC = () => {
	const { t } = useTranslation()
	const [activeTab, setActiveTab] = useState<'horoscope' | 'transit'>('horoscope')

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

	const {
		formData: transitFormData,
		inputMode: transitInputMode,
		handleInputChange: handleTransitInputChange,
		switchInputMode: switchTransitInputMode,
		updateCoordinates: updateTransitCoordinates
	} = useTransitForm()

	const {
		loading: transitLoading,
		error: transitError,
		clearError: clearTransitError,
		searchCity: searchTransitCity,
		calculateTransits
	} = useTransit()

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

	const handleTransitSearchCity = async () => {
		if (!transitFormData.city.trim()) {
			alert(ERROR_MESSAGES.REQUIRED_FIELDS)
			return
		}

		try {
			const result = await searchTransitCity(transitFormData.city)
			updateTransitCoordinates(result.latitude.toString(), result.longitude.toString())
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
					openModal(t('horoscope.title'), data)
					break
				case 'aspects':
					data = await calculateAspects(formData, inputMode)
					openModal(t('aspects.title'), data)
					break
				case 'moonPhase':
					data = await calculateMoonPhase(formData, inputMode)
					openModal(t('moonPhase.title'), data)
					break
			}
		} catch (err) {
			// Error is handled by the hook
		}
	}

	const handleCalculateTransits = async () => {
		// Validate transit form data
		const validation = transitFormDataSchema.safeParse(transitFormData)
		if (!validation.success) {
			alert(ERROR_MESSAGES.REQUIRED_FIELDS)
			return
		}

		try {
			const data = await calculateTransits(transitFormData, transitInputMode)
			openModal(t('transits.title'), data)
		} catch (err) {
			// Error is handled by the hook
		}
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
			<div className="min-h-screen flex items-center justify-center p-4">
				<div className="w-full max-w-4xl">
					<div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
						<div className="text-center mb-8">
							<h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
								{t('navigation.horoscope')} Calculator
							</h1>
							<p className="text-gray-600 text-lg">
								{t('subtitle')}
							</p>
						</div>

						{/* Tab Navigation */}
						<div className="flex justify-center space-x-2 bg-gray-100 p-1 rounded-full mb-8">
							<button
								onClick={() => setActiveTab('horoscope')}
								className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
									activeTab === 'horoscope' 
										? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg' 
										: 'text-gray-600 hover:text-gray-800'
								}`}
							>
								🌟 {t('navigation.horoscope')}
							</button>
							<button
								onClick={() => setActiveTab('transit')}
								className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
									activeTab === 'transit' 
										? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg' 
										: 'text-gray-600 hover:text-gray-800'
								}`}
							>
								🪐 {t('navigation.transits')}
							</button>
						</div>

						{/* Tab Content */}
						{activeTab === 'horoscope' && (
							<>
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
							</>
						)}

						{activeTab === 'transit' && (
							<>
								<TransitForm
									formData={transitFormData}
									inputMode={transitInputMode}
									loading={transitLoading}
									onInputChange={handleTransitInputChange}
									onSwitchInputMode={switchTransitInputMode}
									onSearchCity={handleTransitSearchCity}
									onCalculateTransits={handleCalculateTransits}
								/>
								<ErrorMessage error={transitError} onDismiss={clearTransitError} />
							</>
						)}
					</div>
				</div>
			</div>

			<Modal
				isOpen={isOpen}
				onClose={closeModal}
				title={modalContent?.title || ''}
			>
				{modalContent && (
					<>
						{modalContent.title === t('transits.title') ? (
							<TransitResults
								content={modalContent.content}
								title={modalContent.title}
							/>
						) : (
							<HoroscopeResults
								content={modalContent.content}
								title={modalContent.title}
							/>
						)}
					</>
				)}
			</Modal>
		</div>
	)
}
