import { Prisma } from '@prisma/client'
import NextAuth from 'next-auth'

declare module 'next-auth' {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: {
			id: string
			name?: string | null
			username: string
			password: string
			email?: string | null
			emailVerified?: Date | null
			image?: string | null
			accounts: Account[]
			UserProject: UserProject[]
		}
	}
}
