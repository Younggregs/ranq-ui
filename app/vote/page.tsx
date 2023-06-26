"use client";
import * as React from "react";
import styles from "../page.module.css";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  FilledInput,
  InputAdornment,
  IconButton,
  Grid,
  Button,
} from "../lib/mui";
import { Visibility, VisibilityOff } from "../lib/mui-icon";
import Link from "next/link";
import Title from "../components/title";
import FormHeader from "../components/form-header";
import ActivityIndicator from "../components/activity-indicator";
import { cardWidth } from "../lib/constants";
import { useMutation, useQuery } from "urql";
import { CREATE_VOTER } from "../utils/mutations";
import { useRouter, useSearchParams } from "next/navigation";
import { POLL_STATUS }from "../utils/queries";

export default function Vote() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [emailSent, setEmailSent] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const searchParams = useSearchParams()
  const token = searchParams?.get('id')

  const [res] = useQuery({query: POLL_STATUS, variables: {token}});
  const { data, fetching, error } = res;
  console.log('data', data)
  const [verifyEmailResult, verifyEmail] = useMutation(CREATE_VOTER);

  const submit = async () => {
    setIsLoading(true);
    const data_ = {
      token,
      email: data?.pollStatus.isLoggedIn ? data?.pollStatus.email : email,
    };
    verifyEmail(data_).then((result) => {
      setIsLoading(false);
      if (result.error) {
        console.error("Oh no!", result.error);
      }
      setEmailSent(true);
    });
    
  };

  const mute = () => {
    return email.length > 0 || data?.pollStatus.isLoggedIn;
  };

  return (
    <main className={styles.main}>
      <Title />

      <Grid justifyContent="center" alignItems="center">
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          {fetching && (
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Grid>
                <h2>Verifying Token...</h2>
              </Grid>
              <ActivityIndicator />
            </Grid>
          )}

          {!fetching && !data?.pollStatus.isValid && (
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
                <h2>Wrong Turn</h2>
                <p>This link is invalid</p>
            </Grid>
          )}

          {!fetching && data?.pollStatus.isValid && data?.pollStatus.pollStatus === 'completed' && (
            <Grid 
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
                <h2>Hello, Poll has ended.</h2>
                <p>Voting has ended on this poll</p>
                <p>Title: {data.pollStatus.title} </p>
                <p>Check the result
                  <Link href={`/result?token=${token}`}>
                    <span style={{color: '#0000ff', padding: 2}}><b>here</b></span>
                  </Link>
                </p>
            </Grid>
          )}

          {!fetching && data?.pollStatus.isValid && data?.pollStatus.pollStatus === 'ongoing' && (
            <Grid>
              {emailSent ? (
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{m:2, width: cardWidth}}
              >
                <h2>
                    Voting Link Sent!
                </h2>
                <p>
                    Voting link sent to your email inbox. <br />
                    Check your email for a link to send your vote.
                </p>
            </Grid>
          ): (
          <Grid>
            {!data?.pollStatus.isLoggedIn ? (
              <Grid>
                <Grid>
                  <FormHeader header="Enter email to receive voting link" />
                </Grid>
                <p>Poll Title: <b>{data.pollStatus.title}</b> </p>
                <TextField
                  sx={{ m: 1, width: cardWidth }}
                  id="email"
                  label="Email"
                  variant="filled"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
            ) : (
              <Grid>
                <p>Hello, {data?.pollStatus.name} </p>
                <p>Your voting link would be sent to your email: <br />
                  <b>{data?.pollStatus.email}</b>
                </p>
                <p> Poll Title: <b>{data?.pollStatus.title}</b> </p>
              </Grid>
            )}

            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              sx={{ m: 1, width: cardWidth }}
            >
              {isLoading ? (
                <ActivityIndicator />
              ) : (
                <Button
                  sx={{ m: 2, width: "30ch" }}
                  variant="contained"
                  onClick={submit}
                  disabled={!mute()}
                >
                  Continue
                </Button>
              )}
            </Grid>
          </Grid>
          )}
            </Grid>
          )}
          
        </Grid>
      </Grid>
      <div>
        <p>Terms and Conditions apply</p>
      </div>
    </main>
  );
}
