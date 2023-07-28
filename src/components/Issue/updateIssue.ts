'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

interface IssueUpdate {
	title?: string
	isOpen?: boolean
	projectId?: string | null
}

export async function updateIssue(id: string, data: IssueUpdate) {
	const issue = await prisma.issue.update({
		data,
		where: {
			id,
		},
	})

	revalidatePath('projects')
}
