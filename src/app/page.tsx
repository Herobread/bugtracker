'use client'

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import SignOutButton from './SignOutButton'

export default function Home() {
	const { data } = useSession()

	if (data?.user) {
		return (
			<>
				<p>Logged in as {data.user.name}</p>
				<SignOutButton />
			</>
		)
	}

	return (
		<main>
			<Link href={'/login'}>Login</Link>
			<Link href={'/register'}>Register</Link>
		</main>
	)
}
