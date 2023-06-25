import Image from 'next/image'
import stylesMain from './page.module.css'
import Title from "./components/title";
import { cardWidth } from './lib/constants';
import { Grid } from './lib/mui';
import Link from 'next/link';

export default function Landing() {
  return (
    <main className={stylesMain.main}>
      <Title />

      <Grid
        justifyContent="center"
        alignItems="center"
      >
          <h3>Welcome to Rank!</h3>
          <p>Rank contestants officially and just for fun...</p>
      </Grid>

      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{ m: 2, width: cardWidth }}
      >
        <Link href="/signin">
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ m:2, width: cardWidth }}
            style={styles.card}
          >
              <h2>
                  Signin
              </h2>
          </Grid>
        </Link>
      </Grid>
    </main>
  )
}


const styles = {
  card: {
    padding: "1rem",
    border: "1px solid rgba(var(--callout-border-rgb), 0.3)",
    borderRadius: "var(--border-radius)",
  }
};