'use client'

import Link from 'next/link'
import { useState } from 'react'
import { registerUser } from './register'
import Error from '@/components/Error/Error'
import { useForm } from 'react-hook-form'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Protected from '@/components/Protected/Protected'

export interface Inputs {
	username: string
	password: string
	name: string
}

export default function Register() {
	const [error, setError] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const { status } = useSession()

	const router = useRouter()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>()

	const onSubmit = async (data: Inputs) => {
		setIsLoading(true)
		try {
			await registerUser(data)

			const { username, password } = data

			await signIn('credentials', {
				username,
				password,
				callbackUrl: `${window.location.origin}/projects`,
			})

			router.push(`/projects/`)
		} catch (error: any) {
			setError(error.message)
		}
		setIsLoading(false)
	}

	return (
		<div>
			<Protected user="only-unauthenticated" redirectTo="projects" />
			<h1>Register</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label>
					Display name
					<input
						type="text"
						{...register('name', {
							required: 'This field is required',
						})}
					/>
				</label>
				{errors.name && <Error>{errors.name.message}</Error>}

				<label>
					Username
					<input
						type="text"
						{...register('username', {
							required: 'This field is required',
						})}
					/>
				</label>
				{errors.username && <Error>{errors.username.message}</Error>}
				<label>
					Password
					<input
						type="text"
						{...register('password', {
							required: 'This field is required',
						})}
					/>
				</label>
				{errors.password && <Error>{errors.password.message}</Error>}
				<Error>{error}</Error>
				<button disabled={isLoading} type="submit">
					{isLoading ? 'Registering...' : 'Register'}
				</button>
			</form>
			<Link href={'/login'}>Login</Link>
		</div>
	)
}
