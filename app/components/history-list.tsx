import { Grid } from "../lib/mui"
import Link from 'next/link';
import Icon from "./icons";
import Countdown from "./countdown";
import CustomButton from "./button";
import { East } from "@mui/icons-material";

export default function HistoryList ({data, is_public=false}: {data: any[], is_public: boolean}) {
    const link = is_public ? '/' : '/poll/'
    return (
        <Grid
            container
            direction="column"
        >
            {data.map((item: any) => (
                <Grid 
                    key={item?.node.id}
                    style={styles.container}
                >
                    <p style={styles.title}>{item?.node.title}</p>
                    <p style={styles.text}>{item?.node.description}</p>
                    <br/>
                    <p style={styles.text}>Poll token(code): 
                        <b> {item?.node.token}</b>
                    </p>
                    <Grid
                        container
                        direction="column"
                        style={styles.spacing}
                    >
                    <Grid
                        style={styles.coloredBox}
                        container
                        item
                        xs={5}
                    >
                        {item?.node.status.toLowerCase() === 'ongoing' ? (
                        <Countdown
                            createdAt={item?.node.createdAt}
                            duration={item?.node.duration}
                            durationS={item?.node.durationS}
                        />
                        ) : (
                            <Grid
                                container
                                direction="row"
                            >
                                <Icon name="clock" size={20}/>
                                <p style={{color: "#000", marginLeft: 5}}>
                                    Poll closed
                                </p>
                            </Grid>
                        )}
                    </Grid>
                    
                    <Grid
                        style={styles.coloredBox}
                        container
                        item
                        xs={5}
                    >
                        <Grid
                            container
                            direction="row"
                            >
                                <Icon name="persons" size={20}/>
                                <p style={{color: "#000", marginLeft: 5}}>{item?.node.contestants.length} Contestants</p>
                            </Grid>
                    </Grid>
                </Grid>

                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Link href={link + item?.node.token}>
                        <CustomButton 
                            border="1px solid #E14817"
                            title="View poll" 
                            textColor="#E14817"
                            width="10rem"
                            Icon={<East style={{color: '#E14817'}} />}
                        />
                    </Link>
                </Grid>

            </Grid>
            ))}
        </Grid>
        )
}

const styles = {
    container: {
        backgroundColor: "#fff",
        border: "1px solid rgba(var(--callout-border-rgb), 0.3)",
        borderRadius: "1rem",
        padding: "1rem",
        minHeight: "10rem",
        margin: '3px',
        marginTop: '1rem',
        marginBottom: '1rem',
        width: '22rem'
    },
    title: {
        fontSize: '1.5rem',
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
    coloredBox: {
        height: '5rem',
        color: "#E14817",
        fontSize: '1rem',
        width: '10rem',
        margin: '1rem',
    },
    spacing: {
        marginTop: '2rem',
    }
}