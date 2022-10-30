import React from 'react';
import {
	Box,
	Button,
	FormControl,
	Grid,
	TextField,
	Switch,
	FormControlLabel,
	FormGroup,
	FormLabel,
	RadioGroup,
	Radio,
} from '@mui/material';
import { CastMember } from '../../../types/CastMembers';
import { Link } from 'react-router-dom';

type Props = {
	castMember: CastMember;
	isdisabled?: boolean;
	isLoading?: boolean;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function CastMemberForm({
	castMember,
	isdisabled,
	isLoading,
	handleSubmit: onSubmit,
	handleChange,
}: Props) {
	return (
		<Box p={2}>
			<form onSubmit={onSubmit}>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<FormControl fullWidth>
							<TextField
								required
								name="name"
								label="Name"
								value={castMember.name}
								disabled={isdisabled}
								onChange={handleChange}
							/>
						</FormControl>
					</Grid>

					<Grid item xs={12}>
						<FormGroup>
							<FormLabel component="legend">Type</FormLabel>
							<RadioGroup
								aria-labelledby="type of cast member"
								defaultValue="Director"
								name="type"
								value={castMember.type}
								onChange={handleChange}
							>
								<FormControlLabel
									value="1"
									control={<Radio />}
									label="Director"
								/>
								<FormControlLabel
									value="2"
									control={<Radio />}
									label="Actor"
								/>
							</RadioGroup>
						</FormGroup>
					</Grid>

					<Grid item xs={12}>
						<Box display="flex" gap={2}>
							<Button
								variant="contained"
								component={Link}
								to="/cast-members"
							>
								Back
							</Button>

							<Button
								type="submit"
								variant="contained"
								color="secondary"
								disabled={isdisabled}
							>
								Save
							</Button>
						</Box>
					</Grid>
				</Grid>
			</form>
		</Box>
	);
}
