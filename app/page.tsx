"use client";
import * as React from "react";
import Landing from "./landing";
import styles from './page.module.css'
import Index from "./index";
import { withUrqlClient } from 'next-urql';
import { useMutation, cacheExchange, fetchExchange, gql } from 'urql';
import { VERIFY_TOKEN } from './utils/mutations';
import ActivityIndicator from "./components/activity-indicator";
import { Grid } from "./lib/mui";

function Home() {
  const [verifyTokenResult, verifyToken] = useMutation(VERIFY_TOKEN);
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(true);
  
  React.useEffect(() => {
    const verify = async () => {
        setIsLoading(true);
        const token = localStorage.getItem('token')
        verifyToken({token}).then(result => {
          if (result.error) {
            console.error('Oh no!', result.error);
            setIsLoggedIn(false);
          }
          console.log('result', result);
          setIsLoggedIn(true);
        });
        setIsLoading(false);
      
    }
    verify()
  }, [])

  
  return (
    <>
      {isLoading ? (
        <main className={styles.main}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <ActivityIndicator />
          </Grid>
        </main>
      ): (
        isLoggedIn ? <Index /> : <Landing />
      )}
    </>
  )
}

export default withUrqlClient(
  ssrExchange => ({
    url: 'http://localhost:8000/graphql',
    exchanges: [cacheExchange, ssrExchange, fetchExchange],
  }),
  { ssr: true }
)(Home);
