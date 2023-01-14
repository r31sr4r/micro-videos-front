import {
	AppBar,
	Box,
	Container,
	CssBaseline,
	ThemeProvider,
} from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { useState } from 'react';
import { useAppTheme } from '../hooks/useAppTheme';
import { Header } from './Header';
import ResponsiveDrawer from './ResponsiveDrawer';

export function Layout({ children }: { children: React.ReactNode }) {
	const [mobileOpen, setMobileOpen] = useState(false);
	const [currentTheme, setCurrentTheme] = useAppTheme();

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const drawerWith = 240;

	return (
		<ThemeProvider theme={currentTheme}>
			<CssBaseline />
			<Box sx={{ display: 'flex' }}>
				<AppBar
					position="fixed"
					sx={{
						width: { sm: `calc(100% - ${drawerWith}px)` },
						ml: { sm: `${drawerWith}px` },
					}}
				>
					<Header
						toggle={setCurrentTheme}
						theme={currentTheme.palette.mode}
						handleDwawerToggle={handleDrawerToggle}
					/>
				</AppBar>
				<ResponsiveDrawer
					open={mobileOpen}
					onClose={handleDrawerToggle}
				/>
				<SnackbarProvider
					autoHideDuration={3000}
					maxSnack={3}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
				>
					<Container maxWidth="lg" sx={{ color: 'white', my: 12 }}>
						{children}
					</Container>
				</SnackbarProvider>
			</Box>
		</ThemeProvider>
	);
}
