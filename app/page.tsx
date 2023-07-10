"use client";
import * as React from "react";
import Landing from "./landing";
import styles from './page.module.css'
import Index from "./index";
import { useMutation, cacheExchange, fetchExchange } from 'urql';
import { VERIFY_TOKEN } from './utils/mutations';
import ActivityIndicator from "./components/activity-indicator";
import { Grid } from "./lib/mui";
import user from "./lib/user-details";
import { useRouter, useSearchParams } from 'next/navigation'

export default function Home() {
  const [verifyTokenResult, verifyToken] = useMutation(VERIFY_TOKEN);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const router = useRouter();


  React.useEffect(() => {
    router.push(`/pitch2win`)
    const verify = async () => {
        setIsLoading(true);
        const token = user().token;
        verifyToken({token}).then(result => {
          setIsLoading(false);
          if (result.error) {
            console.error('Oh no!', result.error);
            setIsLoggedIn(false);
          }else{
            setIsLoggedIn(true);
          }
        });
    }
    verify()
  }, [verifyToken, router])

  
  return (
    <>
      {isLoading ? (
        <main className={styles.main}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ m: 2, width: "100%", height: "100vh" }}
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
