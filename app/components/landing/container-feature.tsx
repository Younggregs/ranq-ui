import { Grid } from "@/app/lib/mui"
import CustomButton from "../button"
import { East } from "@/app/lib/mui-icon"
import Icon from "../icons"

export default function ContainerFeature() {
    return(
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={styles.containerTitle}
        >
            <Grid
                container
                alignItems="center"
                style={styles.spacing}
            >
                <Grid style={styles.line} />
                <p style={styles.title}>FEATURES</p>
            </Grid>

            <Grid>
                <p style={styles.title2}>
                Open. Fair. Confidential.
                </p>
                <p style={styles.text}>
                Ranq is a free poll maker that lets you generate shareable polls in seconds.
                </p>
            </Grid>

            <Grid
                container
                direction="row"
                alignItems="center"
                style={styles.spacing}
            >
                <Icon name="tickCircle"/>
                <p style={styles.text}>
                One Person, One Vote
                </p>
            </Grid>

            <Grid
                container
                direction="row"
                alignItems="center"
                style={styles.spacing}
            >
                <Icon name="tickCircle"/>
                <p style={styles.text}>
                Popular or Ranked Voting Styles
                </p>
            </Grid>

            <Grid
                container
                direction="row"
                alignItems="center"
                style={styles.spacing}
            >
                <Icon name="tickCircle"/>
                <p style={styles.text}>
                Public or Invite-Only Access
                </p>
            </Grid>

            <Grid
                container
                direction="row"
                alignItems="center"
                style={styles.spacing}
            >
                <Icon name="tickCircle"/>
                <p style={styles.text}>
                Live Analytics
                </p>
            </Grid>

      </Grid>
    )
}

const styles = {
    card: {
        padding: "1rem",
        border: "1px solid rgba(var(--callout-border-rgb), 0.3)",
        borderRadius: "var(--border-radius)",
    }, 
    containerTitle: {
        backgroundColor: '#F8F8F8',
        minHeight: '30rem',
        color: '#fff',
        padding: '0 1rem',
    }, 
    title: {
        fontSize: '1rem',
        color: '#E14817',
        margin: '0',
        padding: '10px',
    },
    title2: {
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#000',
        margin: '10px',
        padding: '10px',
    },
    text: {
        fontSize: '1rem',
        fontWeight: 'normal',
        margin: '0',
        padding: '0',
        color: '#35414B'
    },
    spacing: {
        margin: 20,
    },
    line: {
        width: '50px',
        height: '2px',
        backgroundColor: '#000',
    }
}