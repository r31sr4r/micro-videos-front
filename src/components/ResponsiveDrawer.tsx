import {
	Divider,
	List,
	ListItem,
	Toolbar,
	Typography,
	Box,
	Drawer,
} from '@mui/material';
import React from 'react';

const drawerWidth = 240;

type Props = {
	open: boolean;
	onClose: () => void;
};

export default function ResponsiveDrawer({ open, onClose }: Props) {
	const routes = [
		{
			path: '/',
			name: 'Categories',
		},
		{
			path: '/cast-members',
			name: 'Cast Members',
		},
        {
            path: '/genres',
            name: 'Genres',
        },
        {
            path: '/videos',
            name: 'Videos',
        },
	];

	const drawer = (
		<div>
			<Toolbar>
				<Typography variant="h6" noWrap component="div">
					Responsive drawer
				</Typography>
				<Divider />
				<List>
					{routes.map((route) => (
						<ListItem disablePadding key={route.name}>
							<Typography>{route.name}</Typography>
						</ListItem>
					))}
				</List>
			</Toolbar>
		</div>
	);

	return (
		<Box
			component="nav"
			sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
		>
			<Drawer
				variant="temporary"
				open={open}
				onClose={onClose}
				ModalProps={{
					keepMounted: true, // Better open performance on mobile.
				}}
				sx={{
					display: { xs: 'block', sm: 'none' },
					'& .MuiDrawer-paper': {
						boxSizing: 'border-box',
						width: drawerWidth,
					},
				}}
			>
				{drawer}
			</Drawer>

			<Drawer
				variant="permanent"
				sx={{
					display: { xs: 'none', sm: 'block' },
					'& .MuiDrawer-paper': {
						boxSizing: 'border-box',
						width: drawerWidth,
					},
				}}
				open
			>
				{drawer}
			</Drawer>
		</Box>
	);
}
