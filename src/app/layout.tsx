import 'styles/normalize.scss';
import 'styles/modal.scss';
import 'styles/main.scss';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import StyledComponentsRegistry from './registery';
import { ThemeProvider } from 'context';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Stopwatch',
	description: 'Stopwatch application. You can add limited timers and name them. Timers saved locally. So do not delete local storage files',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta title='Stopwatch' />
				<link rel="icon" href="/favicon.svg" />
			</head>
			<body className={inter.className}>
				<StyledComponentsRegistry>
					<ThemeProvider>
						{children}
					</ThemeProvider>
				</StyledComponentsRegistry>
			</body>
		</html>
	)
}
