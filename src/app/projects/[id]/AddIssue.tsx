'use client'

import { useForm } from 'react-hook-form'
import { createIssue } from './createIssue'
import { useState } from 'react'
import Error from '@/components/Error/Error'

interface AddIssueProps {
	projectId: string
}

interface Inputs {
	title: string
}

export default function AddIssue({ projectId }: AddIssueProps) {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')
	const { register, handleSubmit, reset } = useForm<Inputs>()

	const onSubmit = async (data: Inputs) => {
		const { title } = data

		setIsLoading(true)

		try {
			setError('')
			await createIssue({ title, projectId })
			reset()
		} catch (error: any) {
			setError(error.message)
		}

		setIsLoading(false)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<label>
				Issue title
				<input type="text" {...register('title')} />
			</label>
			{error && <Error>{error}</Error>}
			<button disabled={isLoading} type="submit">
				{isLoading ? 'Opening issue...' : 'Open issue'}
			</button>
		</form>
	)
}
