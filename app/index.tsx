"use client";
import * as React from "react";
import stylesMain from "./page.module.css";
import {
  Grid, Menu,
} from "./lib/mui";
import { Visibility, VisibilityOff } from "./lib/mui-icon";
import Link from 'next/link'
import Title from "./components/title";
import { cardWidth } from "./lib/constants";
import Footer2 from "./components/footer-2";
import Footer1 from "./components/footer-1";
import MenuBar from "./components/menu-bar";

export default function Index() {

  return (
    <main className={stylesMain.main}>
      <Grid container>
        <MenuBar />
      </Grid>

      <Grid
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{ m: 2, width: cardWidth }}
        >
            <p>Hello {localStorage.getItem('name') || ""},</p>
        </Grid>
        <Link href="/create-poll">
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ m:3, width: cardWidth }}
            style={styles.card}
          >
              <h2>
                  Create Poll
              </h2>
          </Grid>
        </Link>
        <Link href="/history">
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ m: 3, width: cardWidth }}
            style={styles.card}
          >
              <h2>
                  History
              </h2>
          </Grid>
        </Link>
      </Grid>
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
  }
};
