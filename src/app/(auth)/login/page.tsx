'use client'

import Link from 'next/link'
import { useState } from 'react'
import Error from '@/components/Error/Error'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'

export interface Inputs {
	password: string
	username: string
}

export default function Register() {
	const [error, setError] = useState('')

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>()

	const onSubmit = async (data: Inputs) => {
		// console.log(data)
		try {
			const { username, password } = data

			await signIn('credentials', {
				username,
				password,
				callbackUrl: `${window.location.origin}/projects`,
			})
		} catch (error: any) {
			setError(error.message)
		}
	}

	return (
		<div>
			<h1>Login</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
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
				<button type="submit">Login</button>
			</form>
			<Link href={'/register'}>Register</Link>
		</div>
	)
}
