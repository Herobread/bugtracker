'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

interface createIssueProps {
	title: string
	projectId: string
}

export async function createIssue({ title, projectId }: createIssueProps) {
	try {
		await prisma.issue.create({
			data: {
				title,
				projectId,
			},
		})

		revalidatePath(`/projects/${projectId}`)
	} catch (error) {
		throw new Error('something went wrong')
	}
}
