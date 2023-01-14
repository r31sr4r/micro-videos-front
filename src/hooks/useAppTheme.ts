import { useEffect, useState } from 'react';
import { darkTheme, lightTheme } from '../config/theme';
import { useLocalStorage } from './useLocalStorage';

export function useAppTheme() {
	const [theme, setTheme] = useState(lightTheme);

	const [storedThemeMode, setStoredThemeMode] = useLocalStorage<
		'dark' | 'light'
	>('themeMode', 'light');

	const toggleTheme = () => {
		const currentTheme =
			theme.palette.mode === 'light' ? darkTheme : lightTheme;
		setTheme(currentTheme);
		setStoredThemeMode(currentTheme.palette.mode);
	};

	useEffect(() => {
		const currentTheme =
			storedThemeMode === 'light' ? lightTheme : darkTheme;
		if (currentTheme) {
			setTheme(currentTheme);
		}
	}, [storedThemeMode]);

	return [theme, toggleTheme] as const;
}
