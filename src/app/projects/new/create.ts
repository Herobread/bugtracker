'use server'

import { prisma } from '@/lib/prisma'
import { Inputs } from './page'
import { NextResponse } from 'next/server'
import { getSession } from 'next-auth/react'
import { getServerSession } from 'next-auth'
import { getToken } from 'next-auth/jwt'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createProject(data: Inputs) {
	const { name } = data

	const session = await getServerSession(authOptions)

	if (!session?.user) {
		throw new Error('Unauthorized')
	}

	const userId = session?.user.id

	const project = await prisma.project.create({
		data: {
			name,
			UserProject: {
				create: {
					user: {
						connect: { id: userId }, // Link the project to the user using the userId
					},
				},
			},
		},
	})

	revalidatePath('/projects/')

	return project
}
