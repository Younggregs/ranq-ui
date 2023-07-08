"use client";
import * as React from "react";
import stylesMain from "../page.module.css";
import { Grid, TextField } from "../lib/mui";
import FormHeader from "../components/form-header";
import ActivityIndicator from "../components/activity-indicator";
import { useQuery } from 'urql';
import { FETCH_POLLS } from "../utils/queries";
import HistoryList from "../components/history-list";
import { cardWidth } from "../lib/constants";

export default function History() {  
    const [search, setSearch] = React.useState(''); 
    const [res] = useQuery({query: FETCH_POLLS, variables: {search} });
    const { data, fetching, error } = res;

  return (
    <main className={stylesMain.main}>

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
            <HistoryList data={data?.polls?.edges || []}/>
          </Grid>
        )}

        {!fetching && !data && (
          <Grid
            container
            direction="column"
            sx={{ m: 2, width: "40ch" }}
            style={styles.card}
          >
            <h2>Its empty here</h2>
            <p>You have not created any polls yet</p>
          </Grid>
        )}
        
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