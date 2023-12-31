import { Grid } from "@/app/lib/mui";
import Countdown from "../countdown";
import HowToVideo from "./how-to-video";


export default function RankHeader({data}: {data: any}) {
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
                   justifyContent="center"
                   alignItems="center"
                   item
                   xs={5}
                  >
                    <Countdown
                        createdAt={data?.pollById.createdAt}
                        duration={data?.pollById.duration}
                        durationS={data?.pollById.durationS}
                    />
                  </Grid>
                  
                  <Grid
                   style={styles.coloredBox}
                   container
                   justifyContent="center"
                   alignItems="center"
                   item
                   xs={5}
                  >
                    <p>
                      {data?.pollById.votes} Participants
                    </p>
                  </Grid>
                </Grid>
                <br />
                <p style={styles.text}>
                  <i><b>Voting Tips:</b>
                  This is a rank vote, drag and drop the contestants to rank them in order of preference, the first contestant is your most preferred, the last is your least preferred.
                  </i>
                </p>
                <p style={styles.text}>
                  <HowToVideo />
                </p>
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
      padding: '2rem',
    },
    coloredBox: {
      backgroundColor: "#fff",
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      height: '2rem',
      borderRadius: '0.5rem',
      color: "#E14817",
      fontSize: '1rem',
    },
    spacing: {
      marginTop: '2rem',
    }
  };