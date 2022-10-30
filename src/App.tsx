import { Box, ThemeProvider } from '@mui/system';
import * as React from 'react';
import { Header } from './components/Header';
import { Layout } from './components/Layout';
import { appTheme } from './config/theme';
import { Routes, Route } from 'react-router-dom';
import { CategoryList } from './features/categories/ListCategory';
import { CategoryCreate } from './features/categories/CreateCategory';
import { CategoryEdit } from './features/categories/EditCategory';
import { Typography } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { ListCastMembers } from './features/cast/ListCastMembers';
import { CreateCastMember } from './features/cast/CreateCastMember';
import { EditCastMember } from './features/cast/EditCastMember';

function App() {
	return (
		<ThemeProvider theme={appTheme}>
			<SnackbarProvider
				autoHideDuration={3000}
				maxSnack={3}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
			>
				<Box
					component="main"
					sx={{
						height: '100vh',
						backgroundColor: (theme) => theme.palette.grey[900],
					}}
				>
					<Header />
					<Layout>
						{/* <h1>Welcome to React Router!</h1> */}
						<Routes>
							<Route path="/" element={<CategoryList />} />
							<Route
								path="/categories"
								element={<CategoryList />}
							/>
							<Route
								path="/categories/create"
								element={<CategoryCreate />}
							/>
							<Route
								path="/categories/edit/:id"
								element={<CategoryEdit />}
							/>


							<Route
								path="/cast-members"
								element={<ListCastMembers />}
							/>

							<Route
								path="/cast-members/create"
								element={<CreateCastMember />}
							/>

							<Route
								path='/cast-members/edit/:id'
								element={<EditCastMember />}
							/>

							<Route
								path="*"
								element={
									<Box
										sx={{
											color: (theme) =>
												theme.palette.grey[500],
										}}
									>
										<Typography variant="h1">
											404
										</Typography>
										<Typography variant="h2">
											Page not found
										</Typography>
									</Box>
								}
							/>
						</Routes>
					</Layout>
				</Box>
			</SnackbarProvider>
		</ThemeProvider>
	);
}

export default App;
