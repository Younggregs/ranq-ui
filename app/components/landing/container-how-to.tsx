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
                <p style={styles.title}>Step one</p>
                <p style={styles.text}>
                    Create a poll, dummy text to be replaced
                    Create a poll, dummy text to be replaced
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
                <p style={styles.title}>Step two</p>
                <p style={styles.text}>
                    Create a poll, dummy text to be replaced
                    Create a poll, dummy text to be replaced
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
                <p style={styles.title}>Step three</p>
                <p style={styles.text}>
                    Create a poll, dummy text to be replaced
                    Create a poll, dummy text to be replaced
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
    text: {
        fontSize: '1rem',
        fontWeight: 'normal',
        color: '#35414B'
    },
    spacing: {
        margin: '1rem',
    }
}