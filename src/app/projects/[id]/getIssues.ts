'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getIssues(projectId: string) {
	const issues = await prisma.issue.findMany({
		where: {
			projectId,
		},
		orderBy: {
			openedAt: 'desc',
		},
	})

	return issues as Issue[]
}
