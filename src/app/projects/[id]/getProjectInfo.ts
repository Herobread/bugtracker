'use server'

import { prisma } from '@/lib/prisma'

export async function getProjectInfo(id: string) {
	const projectInfo = await prisma.project.findUnique({
		where: {
			id,
		},
	})

	return projectInfo
}
