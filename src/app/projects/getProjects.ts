import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

export default async function getProjects() {
	const session = await getServerSession(authOptions)

	if (!session || !session.user || !session.user.id) {
		// User not authenticated or missing user ID
		return []
	}

	const userId = session.user.id

	try {
		const projects = await prisma.project.findMany({
			where: {
				UserProject: {
					some: {
						userId: userId,
					},
				},
			},
		})

		return projects
	} catch (error) {
		throw new Error('There was an error loading projects, try again later')
		return []
	}
}
