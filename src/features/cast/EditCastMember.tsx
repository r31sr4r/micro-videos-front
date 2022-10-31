import { Box, Paper, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CastMember } from '../../types/CastMembers';
import { initialState, useGetCastMemberQuery, useUpdateCastMemberMutation } from './castMembesSlice';
import { CastMemberForm } from './components/CastMemberForm';

export const EditCastMember = () => {
	const id = useParams().id ?? '';
	const { data: castMember, isFetching } = useGetCastMemberQuery({ id });
	const [updateCastMember, status] = useUpdateCastMemberMutation();
	const [castMemberState, setCastMemberState] = React.useState<CastMember>(initialState);

	const { enqueueSnackbar } = useSnackbar()

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();	
		await updateCastMember(castMemberState);
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setCastMemberState({ ...castMemberState, [name]: value });
	};

	const handleToogle = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = e.target;
		setCastMemberState({ ...castMemberState, [name]: checked });
	};

	useEffect(() => {
		if (castMember) {
			setCastMemberState(castMember.data);
		}
	}, [castMember])

	useEffect(() => {
		if (status.isSuccess) {
			enqueueSnackbar('Cast Member updated successfully', { variant: 'success' })
		}
		if (status.error) {
			enqueueSnackbar('Error updating castMember', { variant: 'error' })
		}
	}, [enqueueSnackbar, status.error, status.isSuccess])

	return (
		<Box>
			<Paper>
				<Box p={2}>
					<Box mb={2}>
						<Typography variant="h4">Edit Cast Member</Typography>
					</Box>
				</Box>

				<CastMemberForm
					castMember={castMemberState}
					isDisabled={status.isLoading}
					isLoading={isFetching || status.isLoading}
					handleSubmit={handleSubmit}
					handleChange={handleChange}
				/>
			</Paper>
		</Box>
	);
};
