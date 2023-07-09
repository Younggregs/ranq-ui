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
import { East, KeyboardArrowRight } from "../lib/mui-icon";
import ActivityIndicator from "../components/activity-indicator";
import { cardWidth } from "../lib/constants";
import LinkCard from "../components/link-card";
import ResultCard from "../components/result-card";
import { useQuery } from 'urql';
import { FETCH_POLL_BY_ID }from "../utils/queries";
import Footer2 from "../components/footer-2";
import MenuBar from "../components/menu-bar";
import ResultHeader from "../components/rank/result-header";
import bgColor from "../lib/random-color";
import CustomButton from "../components/button";
import Link from "next/link";

export default function Poll({ params }: { params: { token: string } }) {   
    const id = params.token
    const [res] = useQuery({query: FETCH_POLL_BY_ID, variables: {id}});
    const { data, fetching, error } = res;

  return (
    <main className={stylesMain.main}>
      <Grid container>
        <MenuBar />
      </Grid>

      <Grid
        style={styles.titleContainer}
      >
        <Grid 
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          style={styles.titleCard}
        >
            <p style={styles.title2}>Poll</p>
            <KeyboardArrowRight />
            <p style={styles.text}>{data?.pollById.title}</p>
        </Grid>
      </Grid>

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
        container
      >
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
        <ResultHeader data={data}/>
        
        <Grid container style={styles.resultCard}>
        {data?.pollById.status.toLowerCase() === 'ongoing' ? (
          <Grid
            container
            direction="column"
            style={styles.card}
          >
            
            <h4 style={{ textAlign: 'center'}}>Poll is Ongoing</h4>
            <Grid
              container
              direction="column"
              sx={{ m: 2, width: cardWidth }}
              style={styles.card}
            >
              <h4>
                Contestants ({data?.pollById.contestants?.length})
              </h4>
              <List>
                  {data?.pollById.contestants?.map((c: any) => ( 
                    <ListItem key={c}>
                      <ListItemIcon>
                          <Grid 
                            style={{ 
                                  height: '10px', 
                                  width: '10px',
                                  borderRadius: '50%',
                                  backgroundColor: bgColor(),
                                }} 
                          />
                      </ListItemIcon>
                      <ListItemText
                          primary={c.toUpperCase()}
                      />
                    </ListItem>
                  ))}
              </List>
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
                            <Grid 
                              style={{ 
                                    height: '10px', 
                                    width: '10px',
                                    borderRadius: '50%',
                                    backgroundColor: bgColor(),
                                  }} 
                            />
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
          justifyContent="center"
          alignItems="center"
          container
        >
          {data?.pollById.voted ? (
            <CustomButton 
                border="1px solid #E14817"
                title="You have voted! 😁"
                textColor="#E14817"
            />
          ): (
            <Link href={`/rank/${data?.pollById.token}`}>
                <CustomButton 
                    color="#E14817" 
                    border="1px solid #fff"
                    title="Vote Now" 
                    Icon={<East />}
                />
            </Link>
          )}
        </Grid>

            <Grid
              container
              direction="column"
              alignContent="center"
              justifyContent="center"
            >
            <LinkCard 
                type={data?.pollById.type} 
                token={data?.pollById.token} 
                title={data?.pollById.title} 
            />
            </Grid>

            </Grid>
          ): (
              <ResultCard data={data?.pollById?.resultSet[0] || "[]"}/>
          )}
          </Grid>
        
      </Grid>
      </Grid>
      )}

      <Grid
        container
      >
        <Footer2 />
      </Grid>
    </main>
  );
}


const styles = {
  input: {
    backgroundColor: "#fff",
  },
  card: {
    padding: "1rem",
  },
 linkCard: {
    border: "1px solid rgba(var(--callout-border-rgb), 0.3)",
    marginTop: 5,
 }, 
 linkField: {
    padding: 2,
 },
 titleCard: {
  padding: '2rem',
  backgroundColor: '#fff',
  },
  titleContainer: {
    backgroundColor: '#D4D4D8',
    minHeight: '5vh',
    width: '100%',
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
  resultCard: {
    backgroundColor: "#fff",
    minHeight: '40vh',
    width: '100%',
    padding: '1rem',
    marginTop: '1rem',
    marginBottom: '1rem',
    borderRadius: '1rem',
   }
};