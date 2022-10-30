import { CastMember } from '../../types/CastMembers';
import { useState, useEffect } from 'react';
import { initialState, useCreateCastMemberMutation } from './castMembesSlice';
import { useSnackbar } from 'notistack';
import { Box, Paper, Typography } from '@mui/material';
import { CastMemberForm } from './components/CastMemberForm';

export const CreateCastMember = () => {
	const [castMemberState, setCastMemberState] =
		useState<CastMember>(initialState);
	const [createCastMember, status] = useCreateCastMemberMutation();
	const { enqueueSnackbar } = useSnackbar();

    function handleChange(
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) {
        const { name, value } = event.target;
        setCastMemberState((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        await createCastMember(castMemberState);
    }

    useEffect(() => {
        if (status.isError) {
            enqueueSnackbar('Error creating cast member', {
                variant: 'error',
            });
        }
        if (status.isSuccess) {
            enqueueSnackbar('Cast member created', {
                variant: 'success',
            });
        }
    }, [status, enqueueSnackbar]);

	return (
		<Box>
			<Paper>
				<Box p={2}>
					<Box mb={2}>
						<Typography variant="h4">Create Category</Typography>
					</Box>
				</Box>
			<CastMemberForm
				castMember={castMemberState}
				isdisabled={status.isLoading}
				isLoading={status.isLoading}
				handleSubmit={handleSubmit}
				handleChange={handleChange}
			/>
			</Paper>
		</Box>
	);
};
