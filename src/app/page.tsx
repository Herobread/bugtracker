'use client'

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import SignOutButton from './SignOutButton'

export default function Home() {
	const { data } = useSession()

	return (
		<main>
			<SignOutButton />
			<pre>{JSON.stringify(data)}</pre>
			<Link href={'/login'}>Login</Link>
			<Link href={'/register'}>Register</Link>
		</main>
	)
}
