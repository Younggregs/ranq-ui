"use client";
import * as React from "react";
import stylesMain from "../page.module.css";
import {
  Grid,
} from "../lib/mui";
import { Folder, ContactPage, VisibilityOff, HowToVote } from "../lib/mui-icon";
import copy from 'copy-to-clipboard';
import Title from "../components/title";
import FormHeader from "../components/form-header";
import ActivityIndicator from "../components/activity-indicator";
import { useSearchParams } from 'next/navigation'
import { cardWidth } from "../lib/constants";
import HistoryTable from "../components/history-table";
import { useQuery, cacheExchange, fetchExchange, } from 'urql';
import { FETCH_POLLS } from "../utils/queries";

export default function History() {   
    const [res] = useQuery({query: FETCH_POLLS});
    const { data, fetching, error } = res;

  return (
    <main className={stylesMain.main}>
      <Title />

      <Grid>
        <Grid>
            <FormHeader header={`History (${data?.polls.length || 0})`} />
        </Grid>
        {fetching && (
          <ActivityIndicator />
        )}

        {!fetching && data && (
          <Grid
            container
            direction="column"
            sx={{ m: 2, width: "40ch" }}
            style={styles.card}
          >
            <HistoryTable data={data?.polls || []}/>
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