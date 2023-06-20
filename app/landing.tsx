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
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
          <h3>Welcome to Rank!</h3>
          <p>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</p>
      </Grid>

      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Link href="/login">
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ m:3, width: cardWidth }}
            style={styles.card}
          >
              <h2>
                  Login
              </h2>
          </Grid>
        </Link>
        <Link href="/signup">
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ m: 3, width: cardWidth }}
            style={styles.card}
          >
              <h2>
                  Signup
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