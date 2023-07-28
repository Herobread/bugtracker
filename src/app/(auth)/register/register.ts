'use server'

import { prisma } from '@/lib/prisma'

interface Inputs {
	username: string
	password: string
	name: string
}

export const registerUser = async (data: Inputs) => {
	const { username, name, password } = data

	if (!username || !password || !name) {
		throw new Error('Enter all fields')
	}

	const user = await prisma.user.findUnique({ where: { username } })
	const isUniqueUsername = !user

	if (!isUniqueUsername) {
		throw new Error('Username already in use')
	}

	try {
		await prisma.user.create({
			data: {
				name,
				username,
				password,
			},
		})
	} catch (error) {
		throw new Error('Something went wrong, try again later')
	}
}
