import Protected from '@/components/Protected/Protected'

export default function ProjectsLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<Protected user="only-authenticated" redirectTo="login" />
			{children}
		</>
	)
}

ProjectsLayout.requireAuth = true
