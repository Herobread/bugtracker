import AddIssue from './AddIssue'
import ListIssues from './ListIssues'
import { getIssues } from './getIssues'
import { getProjectInfo } from './getProjectInfo'

interface ProjectProps {
	params: { id: string }
}

export default async function Project({ params }: ProjectProps) {
	const { id } = params
	const issues = await getIssues(id)
	const project = await getProjectInfo(id)

	return (
		<div>
			<h1>{project?.name}</h1>
			<h2>Open new issue</h2>

			<pre>
				Project id:
				{id}
			</pre>
			<AddIssue projectId={id} />

			<h2>Issues</h2>
			<ListIssues issues={issues} />
		</div>
	)
}
