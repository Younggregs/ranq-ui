import { Grid } from "@/app/lib/mui"
import CustomButton from "../button"
import { East } from "@/app/lib/mui-icon"
import Icon from "../icons"

export default function ContainerHowTo() {
    return(
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={styles.containerTitle}
        >
            <Grid
                style={styles.spacing}
            >
                <p style={styles.title}>How it works</p>
            </Grid>

            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                style={styles.spacing}
            >
                <Icon name="step1" size={50}/>
                <p style={styles.title2}>Create</p>
                <p style={styles.text}>
                Sign up to generate a new popular or ranked poll in seconds
                </p>
            </Grid>

            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                style={styles.spacing}
            >
                <Icon name="step2" size={50}/>
                <p style={styles.title2}>Poll</p>
                <p style={styles.text}>
                Ranq up to 20 options and monitor insights in real-time
                </p>
            </Grid>

            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                style={styles.spacing}
            >
                <Icon name="step3" size={50}/>
                <p style={styles.title2}>Share</p>
                <p style={styles.text}>
                Spread the word to everyone, or curate a closed circle of voters
                </p>
            </Grid>

            <CustomButton 
                color="#E14817" 
                border="1px solid #E14817"
                title="Create Poll" 
                Icon={false}
            />

      </Grid>
    )
}

const styles = {
    containerTitle: {
        backgroundColor: '#fff',
        minHeight: '30rem',
        color: '#fff',
        padding: '0 1rem',
    }, 
    title: {
        fontSize: '2rem',
        color: '#35414B',
    },
    title2:{
        fontSize: '1.5rem',
        color: '#35414B',
    },
    text: {
        fontSize: '1rem',
        fontWeight: 'normal',
        color: '#35414B'
    },
    spacing: {
        margin: '1rem',
    }
}