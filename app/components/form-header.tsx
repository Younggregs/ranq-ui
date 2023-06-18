import { cardWidth } from "../lib/constants"
import { Grid } from "../lib/mui"

export default function FormHeader ({header}) {
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