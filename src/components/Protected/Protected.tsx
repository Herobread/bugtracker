'use client'

import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'

interface ProtectedProps {
	user: 'only-unauthenticated' | 'only-authenticated'
	redirectTo: string
}

export default function Protected({ user, redirectTo }: ProtectedProps) {
	const { data: session, status } = useSession()
	const isAuthenticated = !!session

	console.log(isAuthenticated)

	if (status == 'loading') {
		return
	}

	if (!isAuthenticated && user == 'only-authenticated') {
		redirect(redirectTo)
	}

	if (isAuthenticated && user == 'only-unauthenticated') {
		redirect(redirectTo)
	}

	return <></>
}
