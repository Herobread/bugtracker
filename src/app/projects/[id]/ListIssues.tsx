'use client'

import Issue from '@/components/Issue/Issue'

interface ListIssuesProps {
	issues: Issue[]
}

export default function ListIssues({ issues }: ListIssuesProps) {
	if (!issues.length) {
		return (
			<p>No issues found. Open new issue by filling up the form above.</p>
		)
	}
	return (
		<>
			{issues.map((issue) => {
				return <Issue key={issue.id} issue={issue} />
			})}
		</>
	)
}
