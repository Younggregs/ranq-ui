"use client";
import * as React from "react";
import stylesMain from "../page.module.css";
import {
  Grid,
  Button,
  Select,
  MenuItem,
  Typography,
  List,
  ListItemIcon,
  ListItem,
  ListItemText,
} from "../lib/mui";
import { Folder, ContactPage, VisibilityOff, HowToVote } from "../lib/mui-icon";
import copy from 'copy-to-clipboard';
import Title from "../components/title";
import FormHeader from "../components/form-header";
import ActivityIndicator from "../components/activity-indicator";
import { useSearchParams } from 'next/navigation'
import timeRemaining from "../lib/time-remaining";
import { cardWidth } from "../lib/constants";
import LinkCard from "../components/link-card";
import ResultCard from "../components/result-card";

  const data = {
    title: "Best Musician 2023",
    description: "Rate by trend, quality, lyrics, rhythm and dept",
    contestants: [
        "Davido",
        "Asake",
        "Seyi Vibes",
        "Young Jonn",
        "Wande Coal"
    ],
    type: "public",
    voters: [
        "dretzam@gmail.com",
        "ret@red.com",
        "doll@gmail.com",
        "drape@gmail.com"
    ],
    duration: "1:15:15"
}
export default function Poll() {   
    const [pollStatus, setPollStatus] = React.useState('ongoing');
    const [timeLeft, setTimeLeft] = React.useState(timeRemaining());

    React.useEffect(() => {
        const timer = setTimeout(() => {
          setTimeLeft(timeRemaining());
        }, 1000);

        return () => clearTimeout(timer);
    });

    const timerComponents = [];

    Object.keys(timeLeft).forEach((interval) => {
        
        timerComponents.push(
            <span>
            {!timeLeft[interval]? (
                0
            ): (
                timeLeft[interval]
            )}
            </span>
        );
    });

  return (
    <main className={stylesMain.main}>
      <Title />

      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid>
            <FormHeader header="Your Poll" />
        </Grid>
        {pollStatus === 'ongoing' ? (
            <LinkCard type={data.type}/>
        ): (
            <ResultCard />
        )}
        
        <Grid
             container
             direction="column"
             sx={{ m: 2, width: cardWidth }}
             style={styles.card}
        >
            <h4>Votes Recorded</h4>
            <p>{10}</p>
        </Grid>
        <Grid
             container
             direction="column"
             sx={{ m: 2, width: cardWidth }}
             style={styles.card}
        >
            <h4>{data.title}</h4>
            {data.description}
        </Grid>
        <Grid
             container
             direction="column"
             sx={{ m: 2, width: cardWidth }}
             style={styles.card}
        >
            <h4>Contestants ({data.contestants?.length})</h4>
            <List>
                {data.contestants?.map((c) => ( 
                    <ListItem key={c}>
                        <ListItemIcon>
                            <ContactPage />
                        </ListItemIcon>
                        <ListItemText
                            primary={c}
                        />
                    </ListItem>
                ))}
            </List>
        </Grid>
        <Grid
             container
             direction="column"
             sx={{ m: 2, width: cardWidth }}
             style={styles.card}
        >
            <h4>Poll Type</h4>
            {data.type?.toUpperCase()}
        </Grid>
        {data.type === 'private' && (
            <Grid
                    container
                    direction="column"
                    sx={{ m: 2, width: cardWidth }}
                    style={styles.card}
            >
                <h4>Voters ({data.voters?.length})</h4>
                <List>
                    {data.voters?.map((c) => ( 
                        <ListItem key={c}>
                            <ListItemIcon>
                                <HowToVote />
                            </ListItemIcon>
                            <ListItemText
                                primary={c}
                            />
                        </ListItem>
                    ))}
                </List>
            </Grid>
        )}
        <Grid
             container
             direction="column"
             sx={{ m: 2, width: cardWidth }}
             style={styles.card}
        >
            <h4>Duration</h4>
            
            <div>
                {timerComponents.length ? timerComponents : <span>{data.duration}</span>}
            </div>
        </Grid>
      </Grid>
      <div>
        <p>Terms and Conditions apply</p>
      </div>
    </main>
  );
}

const styles = {
  input: {
    backgroundColor: "#fff",
  },
  card: {
    padding: "1rem",
    border: "1px solid rgba(var(--callout-border-rgb), 0.3)",
    borderRadius: "var(--border-radius)",
  },
 linkCard: {
    border: "1px solid rgba(var(--callout-border-rgb), 0.3)",
    marginTop: 5,
 }, 
 linkField: {
    padding: 2,
 }
};