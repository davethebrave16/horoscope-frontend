import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AppProvider } from './contexts/app-context'
import { ErrorBoundary } from './components/common/error-boundary'
import { Header } from './components/layout/header'
import { Footer } from './components/layout/footer'
import { HomePage } from './pages/Home/home-page'
import './i18n'
import './App.css'

function App() {
	return (
		<ErrorBoundary>
			<AppProvider>
				<Router>
					<div className="min-h-screen flex flex-col">
						<Header />
						<main className="flex-1">
							<Routes>
								<Route path="/" element={<HomePage />} />
							</Routes>
						</main>
						<Footer />
					</div>
				</Router>
			</AppProvider>
		</ErrorBoundary>
	)
}

export default App
