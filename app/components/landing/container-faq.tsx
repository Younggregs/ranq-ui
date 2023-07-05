import { Grid } from "@/app/lib/mui"
import CustomButton from "../button"
import { East, KeyboardArrowRight } from "@/app/lib/mui-icon"
import Icon from "../icons"
import Accordion from "../accordion"
import faqList from "@/app/lib/faq"

export default function ContainerFAQ() {
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
                direction="column"
                justifyContent="space-between"
                alignItems="flex-start"
                style={styles.card}
            >
                <p style={styles.cardTitle}>Ready To Setup Your Next Poll</p>
                <p style={styles.cardText}>
                    There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable.
                </p>

                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                        <CustomButton 
                            color="#E14817" 
                            border="1px solid #E14817"
                            url="/verify-email" 
                            title="Create Poll" 
                            width="15rem"
                        />
                        

                        <CustomButton 
                            border="1px solid #fff"
                            url="/verify-email" 
                            title="Rank Poll" 
                            width="15rem"
                        />
                    </Grid>
            </Grid>

            <Grid
                style={styles.spacing}
            >
                <p style={styles.title}>Frequently asked questions</p>
                <p style={styles.text}>Rank contestants officially and just for fun...</p>
            </Grid>

            {faqList.map((faq, index) => (
                <Accordion key={index} title={faq.title} message={faq.message}/>
            ))}

            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <Grid 
                    item xs={6}
                    container
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="row"
                >   
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        sx={styles.button}
                    >
                        <p style={styles.text}>Send us a message</p>
                    </Grid>
                </Grid>
            
                <Grid  
                    item xs={6}
                    container
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="row"
                >
                    <p style={styles.text}>Create Poll</p>
                    <KeyboardArrowRight style={{color: '#000'}} />
                </Grid>
            </Grid>

            

      </Grid>
    )
}

const styles = {
    card: {
        height: '43rem',
        width: '90%',
        backgroundImage: 'url(/background.svg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        marginTop: '50px',
        paddingTop: '50px',
        padding: '1rem',
        borderRadius: '25px',
    }, 
    containerTitle: {
        backgroundColor: '#fff',
        minHeight: '30rem',
        color: '#fff',
        padding: '0 1rem',
    }, 
    title: {
        fontSize: '2rem',
        fontWeight: 'bold',
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
    cardTitle: {
        fontSize: '2rem',
        color: '#fff',
        margin: '0',
        padding: '0',
    },
    cardText: {
        fontSize: '1rem',
        fontWeight: 'normal',
        margin: '0',
        padding: '0',
        color: '#fff'
    },
    spacing: {
        margin: 20,
    }, 
    button: {
        m:2, 
        width: '12rem', 
        backgroundColor: '#FAE0E1', 
        padding: '1rem',
        borderRadius: 'var(--border-radius)',
    }
}