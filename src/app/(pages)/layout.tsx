
"use client";
import { Footer, Header } from "components";
import { ThemeContext } from "context";
import { useContext } from "react";
import GlobalStyle from "styles/globalStyle";
import { ThemeContextType } from "types";

export default function RootLayout({ children, }: { children: React.ReactNode }) {
	const { theme } = useContext(ThemeContext) as ThemeContextType;
	
	return (
		<>
			<GlobalStyle $theme={theme} />
			<Header />
			{children}
			<Footer />
		</>
	)
}
