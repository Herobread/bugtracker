'use client'

import { useForm } from 'react-hook-form'
import Error from '@/components/Error/Error'
import { useState } from 'react'
import { createProject } from './create'
import { useRouter } from 'next/navigation'

export interface Inputs {
	name: string
}

export default function Page() {
	const router = useRouter()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>()

	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState('')

	const onSubmit = async (data: Inputs) => {
		setIsLoading(true)
		try {
			const project = await createProject(data)
			router.push(`/projects/${project.id}`)
		} catch (error: any) {
			setError(error.message)
			setIsLoading(false)
		}
	}

	return (
		<>
			<h1>New project</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label>
					Project name
					<input
						type="text"
						{...register('name', {
							required: 'This field is required',
						})}
					/>
				</label>
				{errors.name && <Error>{errors.name.message}</Error>}
				{error && <Error>{error}</Error>}
				<button disabled={isLoading} type="submit">
					{isLoading ? 'Creating...' : 'Create'}
				</button>
			</form>
		</>
	)
}
