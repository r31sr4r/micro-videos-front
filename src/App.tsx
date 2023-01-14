import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { CreateCastMember } from './features/cast/CreateCastMember';
import { EditCastMember } from './features/cast/EditCastMember';
import { ListCastMembers } from './features/cast/ListCastMembers';
import { CategoryCreate } from './features/categories/CreateCategory';
import { CategoryEdit } from './features/categories/EditCategory';
import { CategoryList } from './features/categories/ListCategory';

function App() {
	return (
		<Layout>
			{/* <h1>Welcome to React Router!</h1> */}
			<Routes>
				<Route path="/" element={<CategoryList />} />
				<Route path="/categories" element={<CategoryList />} />
				<Route path="/categories/create" element={<CategoryCreate />} />
				<Route path="/categories/edit/:id" element={<CategoryEdit />} />

				<Route path="/cast-members" element={<ListCastMembers />} />

				<Route
					path="/cast-members/create"
					element={<CreateCastMember />}
				/>

				<Route
					path="/cast-members/edit/:id"
					element={<EditCastMember />}
				/>

				<Route
					path="*"
					element={
						<Box
							sx={{
								color: (theme) => theme.palette.grey[500],
							}}
						>
							<Typography variant="h1">404</Typography>
							<Typography variant="h2">Page not found</Typography>
						</Box>
					}
				/>
			</Routes>
		</Layout>
	);
}

export default App;
