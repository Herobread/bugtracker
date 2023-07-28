import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import Providers from './Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Bugtracker',
	description: 'issue tracking app',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Providers>
					<nav>
						<Link href="/">Home</Link>
						<Link href="/projects">Projects</Link>
					</nav>
					{children}
				</Providers>
			</body>
		</html>
	)
}
