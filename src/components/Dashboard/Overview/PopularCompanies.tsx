import { FC } from 'react';

// providers
import { useCandidaciesContext } from '../../../providers';

// helpers
import { getPopularCompanies } from '../../../helpers';

// packages
import {
    Link,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';

export const PopularCompanies: FC = (): JSX.Element => {
    const { allCompanies } = useCandidaciesContext();
    const popularCompanies = getPopularCompanies(allCompanies);

    return (
       <>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Popular Companies
            </Typography>
            {popularCompanies.length ? (
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Company</TableCell>
                            <TableCell>Country</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell align="right">Candidacies</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {popularCompanies.map((row, idx) => (
                            <TableRow key={idx}>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.country}</TableCell>
                                <TableCell>{row.location}</TableCell>
                                <TableCell align="right">{row.totalCandidacies}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : <Typography variant="body2" color="text.secondary" align="center">No companies yet</Typography>}
            <Link
                color="primary"
                href="#"
                sx={{ mt: 2 }}
            >
                See all companies
            </Link>
       </>
    );
};
