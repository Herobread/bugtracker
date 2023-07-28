import s from './Error.module.css'

interface ErrorProps {
	children: React.ReactNode
}

export default function Error({ children }: ErrorProps) {
	return <div className={s.red}>{children}</div>
}
