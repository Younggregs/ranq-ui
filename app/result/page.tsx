"use client";
import * as React from "react";
import stylesMain from "../page.module.css";
import {
  Grid,
  List,
  ListItemIcon,
  ListItem,
  ListItemText,
} from "../lib/mui";
import { Folder, ContactPage, VisibilityOff, HowToVote } from "../lib/mui-icon";
import Title from "../components/title";
import FormHeader from "../components/form-header";
import ActivityIndicator from "../components/activity-indicator";
import { useSearchParams } from 'next/navigation'
import { cardWidth } from "../lib/constants";
import ResultCard from "../components/result-card";
import { useQuery } from 'urql';
import { FETCH_POLL_BY_ID }from "../utils/queries";

export default function Result() {   
    const searchParams = useSearchParams()
    const id = searchParams?.get('token')

    const [res] = useQuery({query: FETCH_POLL_BY_ID, variables: {id}});

    const { data, fetching, error } = res;

  return (
    <main className={stylesMain.main}>
      <Title />

      {fetching ? (
          <Grid
            justifyContent="center"
            alignItems="center"
          >
            <ActivityIndicator />
          </Grid>
      ): (

      <Grid
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
        <Grid>
            <FormHeader header="Your Poll" />
        </Grid>
        <ResultCard token={id || ""}/>    
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
            <h4>{data?.pollById.title}</h4>
            {data?.pollById.description}
        </Grid>
        <Grid
             container
             direction="column"
             sx={{ m: 2, width: cardWidth }}
             style={styles.card}
        >
            <h4>Contestants ({data?.pollById.contestants?.length})</h4>
            <List>
                {data?.pollById.contestants?.map((c: any) => ( 
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
            {data?.pollById.type?.toUpperCase()}
        </Grid>
        {data?.pollById.type.toLowerCase() === 'private' && (
            <Grid
                    container
                    direction="column"
                    sx={{ m: 2, width: cardWidth }}
                    style={styles.card}
            >
                <h4>Voters ({data?.pollById.voters?.length})</h4>
                <List>
                    {data?.pollById.voters?.map((c: any) => ( 
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
            <p>{data?.pollById.duration}</p>
        </Grid>
      </Grid>
      </Grid>
      )}

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