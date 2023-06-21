import { cardWidth } from "../lib/constants"
import { Grid } from "../lib/mui"
import Link from 'next/link';

export default function FormHeader ({header}: {header: string}) {
    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ m: 1, width: cardWidth }}
        >
            {header}
        </Grid>
        )

}