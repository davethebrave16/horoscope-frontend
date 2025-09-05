import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from './button'

export const LanguageSwitcher: React.FC = () => {
	const { i18n } = useTranslation()

	const handleLanguageChange = (language: string) => {
		i18n.changeLanguage(language)
	}

	return (
		<div className="flex items-center space-x-2">
			<Button
				variant={i18n.language === 'en' ? 'primary' : 'outline'}
				size="sm"
				onClick={() => handleLanguageChange('en')}
				className="px-3 py-1 text-sm"
			>
				EN
			</Button>
			<Button
				variant={i18n.language === 'it' ? 'primary' : 'outline'}
				size="sm"
				onClick={() => handleLanguageChange('it')}
				className="px-3 py-1 text-sm"
			>
				IT
			</Button>
		</div>
	)
}
