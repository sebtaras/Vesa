import { createContext, ReactNode, useEffect, useState } from "react";
import { Theme, ThemeType, dayTheme, nightTheme } from "../util/themes";

interface Props {
	children: ReactNode;
}

interface IThemeContext {
	theme: Theme;
	toggleTheme: () => void;
}

const initialState: IThemeContext = {
	theme: dayTheme,
	toggleTheme: () => {},
};

export const themeContext = createContext<IThemeContext>(initialState);

export const ThemeProvider = ({ children }: Props) => {
	const [theme, setTheme] = useState(dayTheme);

	const toggleTheme = () => {
		setTheme(theme.type === ThemeType.DAY ? dayTheme : nightTheme);
	};

	useEffect(() => {});

	return (
		<themeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</themeContext.Provider>
	);
};
