import CloseIssueButton from './CloseIssueButton'
import s from './Issue.module.css'

interface IssueProps {
	issue: Issue
}

export default function Issue({ issue }: IssueProps) {
	const { id, isOpen, title, openedAt } = issue

	const openedAtString = openedAt.toLocaleString('en-UK')

	return (
		<div className={s.container}>
			<pre>#{id}</pre>
			{isOpen ? <h2>{title}</h2> : <s>{title}</s>}
			<p> opened at {openedAtString}</p>
			{isOpen && <CloseIssueButton className={s.button} id={id} />}
		</div>
	)
}
