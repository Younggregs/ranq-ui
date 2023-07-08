"use client";
import * as React from "react";
import stylesMain from '../page.module.css'
import { Grid, TextField } from '../lib/mui';
import Footer2 from "../components/footer-2";
import Footer1 from "../components/footer-1";
import MenuBar from "../components/menu-bar";
import Title from "../components/polls/title";
import { useQuery } from 'urql';
import { FETCH_PUBLIC_POLLS } from "../utils/queries";
import HistoryList from "../components/history-list";
import { cardWidth } from "../lib/constants";
import ActivityIndicator from "../components/activity-indicator";

export default function Polls() {
    const [search, setSearch] = React.useState(''); 
    const [res] = useQuery({query: FETCH_PUBLIC_POLLS, variables: {search} });
    const { data, fetching, error } = res;

  return (
    <main className={stylesMain.main} style={{backgroundColor: '#fff'}}>
      <Grid container>
        <MenuBar />
      </Grid>

      <Title />

      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
      >
        <TextField 
          sx={{ m: 1, width: cardWidth }} 
          id="search" 
          label="Search" 
          variant="outlined" 
          helperText="Search by poll token(code), title or description"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Grid>

      <Grid>
        {fetching && !search && (
          <ActivityIndicator />
        )}

        {!fetching && data && (
          <Grid
            container
          >
            <HistoryList data={data?.publicPolls?.edges || []} is_public={true}/>
          </Grid>
        )}

        {!fetching && !data && (
          <Grid
            container
            direction="column"
            sx={{ m: 2, width: "40ch" }}
            style={styles.card}
          >
            <h2>No polls created yet</h2>
          </Grid>
        )}
        
      </Grid>

      <Grid
        container
      >
        <Footer1 />
        <Footer2 />
      </Grid>
    </main>
  )
}


const styles = {
  card: {
    padding: "1rem",
    border: "1px solid rgba(var(--callout-border-rgb), 0.3)",
    borderRadius: "var(--border-radius)",
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
  },
};