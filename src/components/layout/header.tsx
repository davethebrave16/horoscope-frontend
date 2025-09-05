import React from 'react'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '../common/language-switcher'

export const Header: React.FC = () => {
	const { t } = useTranslation()

	return (
		<header className="bg-white shadow-sm">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between">
					<div className="flex items-center">
						<h1 className="text-xl font-semibold text-gray-900">
							{t('navigation.horoscope')} Calculator
						</h1>
					</div>
					<div className="flex items-center space-x-4">
						<nav className="hidden md:flex space-x-8">
							<a
								href="#"
								className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
							>
								{t('navigation.home')}
							</a>
							<a
								href="#"
								className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
							>
								{t('navigation.about')}
							</a>
						</nav>
						<LanguageSwitcher />
					</div>
				</div>
			</div>
		</header>
	)
}
