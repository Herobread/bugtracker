interface Issue {
	id: string
	title: string
	isOpen: boolean
	openedAt: Date
	project?: Project | null
	projectId?: string | null
}
