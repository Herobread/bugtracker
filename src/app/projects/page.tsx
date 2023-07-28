import { getServerSession } from 'next-auth'
import Link from 'next/link'
import getProjects from './getProjects'

export default async function Projects() {
	const projects = await getProjects()

	return (
		<>
			<h1>Projects</h1>
			<ul>
				{projects.map((project) => {
					const { id, name } = project
					return (
						<li key={id}>
							<Link href={`/projects/${id}`}>{name}</Link>
						</li>
					)
				})}
			</ul>
			<Link href={'/projects/new'}>Create new</Link>
		</>
	)
}
