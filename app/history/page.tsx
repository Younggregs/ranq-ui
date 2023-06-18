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
import { cardWidth } from "../lib/constants";
import HistoryTable from "../components/history-table";

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
export default function History() {   
    const [pollStatus, setPollStatus] = React.useState('ongoing');
    const [isLoading, setIsLoading] = React.useState(false);

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
            <FormHeader header="History (12)" />
        </Grid>
        <Grid
            container
            direction="column"
            sx={{ m: 2, width: "40ch" }}
            style={styles.card}
        >
            <HistoryTable />
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