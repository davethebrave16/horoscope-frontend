import React from 'react'
import { cn } from '../../utils'

interface ModalProps {
	isOpen: boolean
	onClose: () => void
	title: string
	children: React.ReactNode
	className?: string
}

export const Modal: React.FC<ModalProps> = ({
	isOpen,
	onClose,
	title,
	children,
	className
}) => {
	if (!isOpen) return null

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
			onClick={onClose}
		>
			<div
				className={cn(
					'max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl transform transition-all duration-300',
					className
				)}
				onClick={(e) => e.stopPropagation()}
			>
				<div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 rounded-t-2xl">
					<div className="flex items-center justify-between">
						<h2 className="text-2xl font-bold text-white">{title}</h2>
						<button
							onClick={onClose}
							className="text-white hover:text-gray-200 transition-colors duration-200 p-2 hover:bg-white hover:bg-opacity-20 rounded-full"
						>
							<svg
								className="h-6 w-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>
				</div>
				<div className="max-h-[60vh] overflow-y-auto p-6">
					{children}
				</div>
			</div>
		</div>
	)
}
