import { Grid } from "@/app/lib/mui";
import Countdown from "../countdown";
import Icon from "../icons";

export default function ResultHeader({data}: {data: any}) {
    return (
        <Grid
              style={styles.titleContainer1}
            >
                <p style={styles.title}>{data?.pollById.title}</p>
                <p style={styles.text}>{data?.pollById.description}</p>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  style={styles.spacing}
                >
                  <Grid
                    style={styles.coloredBox}
                    container
                    alignItems="center"
                    justifyContent="center"
                    item
                    xs={5}
                  >
                    {data?.pollById?.status.toLowerCase() === 'ongoing' ? (
                    <Countdown
                        createdAt={data?.pollById.createdAt}
                        duration={data?.pollById.duration}
                        durationS={data?.pollById.durationS}
                    />
                    ) : (
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
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
                    alignItems="center"
                    justifyContent="center"
                    item
                    xs={5}
                  >
                     <Grid
                        container
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                        >
                            <Icon name="persons" size={20}/>
                            <p style={{color: "#000", marginLeft: 5}}>{data?.pollById.contestants.length} Contestants</p>
                        </Grid>
                  </Grid>
                </Grid>

                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                  style={styles.spacing}
                >
                    <Grid 
                        container 
                        alignItems="center"
                        justifyContent="center"
                        item xs={5}
                    >
                        <p style={styles.text}>
                            Total Votes: 
                            <b>{` ${data?.pollById.votes}`}</b>
                        </p>
                    </Grid>

                    <Grid 
                        container 
                        alignItems="center"
                        justifyContent="center"
                        item xs={5}
                    >
                        <p style={styles.text}>
                            Type: 
                            <b>{` ${data?.pollById.type?.toUpperCase()}`}</b>
                        </p>
                    </Grid>
                </Grid>
            </Grid>
    )
}

const styles = {
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#000',
      margin: '0',
      padding: '0',
    },
    title2: {
      fontSize: '1.5rem',
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
    titleCard: {
      margin: '1rem',
      padding: '1rem'
    },
    titleContainer: {
      backgroundColor: '#D4D4D8',
      minHeight: '5vh',
      width: '100%',
    },
    titleContainer1: {
      backgroundColor: '#fff',
      minHeight: '15vh',
      width: '100%',
      padding: '1rem',
    },
    coloredBox: {
      backgroundColor: "#fff",
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      minHeight: '2rem',
      borderRadius: '0.5rem',
      color: "#E14817",
      fontSize: '1rem',
      width: '100%',
      margin: '0.5rem',
    },
    spacing: {
      marginTop: '2rem',
    }
  };