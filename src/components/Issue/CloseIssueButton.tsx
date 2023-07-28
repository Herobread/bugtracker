'use client'

import { useState } from 'react'
import { updateIssue } from './updateIssue'

interface CloseIssueButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	id: string
}

export default function CloseIssueButton({
	id,
	...props
}: CloseIssueButtonProps) {
	const [isLoading, setIsLoading] = useState(false)

	const closeIssue = async (id: string) => {
		setIsLoading(true)
		await updateIssue(id, { isOpen: false })
		setIsLoading(false)
	}

	return (
		<button
			disabled={isLoading}
			onClick={() => {
				closeIssue(id)
			}}
			{...props}
		>
			{isLoading ? 'Closing...' : `Close ${id}`}
		</button>
	)
}
