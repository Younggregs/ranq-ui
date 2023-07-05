import { Grid } from "@/app/lib/mui"
import CustomButton from "../button"
import { East } from "@/app/lib/mui-icon"

export default function ContainerTitle() {
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
                <p style={styles.title}>Welcome to Rank, Dummy Text and Stuff</p>
                <p style={styles.text}>Rank contestants officially and just for fun...</p>
            </Grid>

            <CustomButton 
                color="#E14817" 
                border="1px solid #E14817"
                title="Create Poll" 
                Icon={false}
            />

            <CustomButton 
                color="#0F1017" 
                border="1px solid #fff"
                title="Rank Poll" 
                Icon={<East />}
            />

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
      backgroundColor: '#0F1017',
      height: '100vh',
      color: '#fff',
      padding: '0 1rem',
      textAlign: 'center',
    }, 
    title: {
        fontSize: '3rem',
        fontWeight: 'bold',
        margin: '0',
        padding: '0',
    },
    text: {
        fontSize: '1rem',
        fontWeight: 'normal',
        margin: '0',
        padding: '0',
        color: '#CFCFD1'
    },
    spacing: {
        marginBottom: '1rem',
    }
}