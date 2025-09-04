import React from 'react'

export const Header: React.FC = () => {
	return (
		<header className="bg-white shadow-sm">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between">
					<div className="flex items-center">
						<h1 className="text-xl font-semibold text-gray-900">
							Horoscope Calculator
						</h1>
					</div>
					<nav className="hidden md:flex space-x-8">
						<a
							href="#"
							className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
						>
							Home
						</a>
						<a
							href="#"
							className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
						>
							About
						</a>
					</nav>
				</div>
			</div>
		</header>
	)
}
