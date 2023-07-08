import { Grid } from '@mui/material'

export default function Title() {
    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            direction="column"  
            sx={styles.container}
        >
            <p style={styles.subTitle}>POLL LIST</p>
            <p style={styles.title}>Participate in any poll of your choice</p>
            <p style={styles.text}>
                Use our free poll maker to find out what is popular, and what is not. 
            </p>
        </Grid>
        )

}

const styles = {
    container: {
        backgroundColor: '#fff',
        padding: '2rem',
        textAlign: 'center',
    },
    title: {
        fontSize: '4rem',
        fontWeight: 'bold',
        color: '#000',
        margin: '0',
        padding: '0',
    },
    subTitle: {
        fontSize: '1rem',
        color: '#000',
        margin: '0',
        padding: '0',
    },
    text: {
        fontSize: '1rem',
        fontWeight: 'normal',
        margin: '0',
        padding: '0',
        color: '#000'
    },
}