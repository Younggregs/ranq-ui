import { cardWidth } from "../lib/constants"
import { Grid } from "../lib/mui"

export default function FormError ({message}: {message: string}) {
    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ m: 1, width: cardWidth }}
        >
            <p style={styles.message}>{message}</p>
        </Grid>
        )

}

const styles = {
    message: {
        color: "red",
    },
};