"use client";
import * as React from "react";
import stylesMain from "./page.module.css";
import { Grid } from "./lib/mui";
import Link from 'next/link';
import { cardWidth } from "./lib/constants";
import Footer2 from "./components/footer-2";
import Footer1 from "./components/footer-1";
import MenuBar from "./components/menu-bar";
import Create from "./create-poll/create";
import History from "./history/history";

export default function Index() {
  const [tab, setTab] = React.useState(0);

  const createColor = (type: string) => {
    if (type === "text") {
      return tab === 0 ? "#fff" : "#E14817";
    }
    return tab === 0 ? "#E14817" : "#fff";
  };

  const historyColor = (type: string) => {
    if (type === "text") {
      return tab === 1 ? "#fff" : "#E14817";
    }
    return tab === 1 ? "#E14817" : "#fff";
  };

  return (
    <main className={stylesMain.main} style={{backgroundColor: '#fff'}}>
      <Grid container>
        <MenuBar />
      </Grid>

      <Grid container>
        <Grid 
          style={styles.headerBox} 
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <p style={styles.title}>Hello {localStorage.getItem('name')},</p>
          <p style={styles.text}>
          Ranq a poll and invite your friends to vote or monitor trends. 
          <br />
          You decide.
          </p>
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
          style={styles.coloredBox}
          sx={{ 
            backgroundColor: createColor('background'), 
            color: createColor('text') }}
          onClick={() => setTab(0)}
          container
          justifyContent="center"
          alignItems="center"
          item
          xs={5}
        >
          <p>Create Poll</p>
        </Grid>
        
        <Grid
          style={styles.coloredBox}
          sx={{ 
            backgroundColor: historyColor('background'), 
            color: historyColor('text')
          }}
          onClick={() => setTab(1)}
          container
          justifyContent="center"
          alignItems="center"
          item
          xs={5}
        >
          <p>Poll History</p>
        </Grid>
      </Grid>

      {tab === 0 && (
        <Create />
      )}

      {tab === 1 && (
        <History />
      )}

      <Grid
        container
      >
        <Footer1 />
        <Footer2 />
      </Grid>
    </main>
  );
}

const styles = {
  card: {
    padding: "1rem",
    border: "1px solid rgba(var(--callout-border-rgb), 0.3)",
    borderRadius: "var(--border-radius)",
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
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
  spacing: {
    marginBottom: '1rem',
  },
  headerBox: {
    height: "25vh",
    width: "100%",
    backgroundColor: "#fff",
    backgroundImage: "url(/ellipse.svg)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    padding: "0 1rem",
  },
  coloredBox: {
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    height: '3rem',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    margin: '1rem',
    cursor: 'pointer',
  },
};
