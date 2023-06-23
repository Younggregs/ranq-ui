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
import { useMutation, cacheExchange, fetchExchange } from "urql";
import { CREATE_VOTER } from "../utils/mutations";
import { useRouter, useSearchParams } from "next/navigation";

export default function Vote() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [emailSent, setEmailSent] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const searchParams = useSearchParams()
  const token = searchParams?.get('id')

  const [verifyEmailResult, verifyEmail] = useMutation(CREATE_VOTER);

  const submit = async () => {
    setIsLoading(true);
    const data = {
      token,
      email,
    };
    verifyEmail(data).then((result) => {
      setIsLoading(false);
      if (result.error) {
        console.error("Oh no!", result.error);
      }
      setEmailSent(true);
    });
    
  };

  const mute = () => {
    return email.length > 0;
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
            <Grid>
              <FormHeader header="Enter Your Email" />
            </Grid>

            <TextField
              sx={{ m: 1, width: cardWidth }}
              id="email"
              label="Email"
              variant="filled"
              onChange={(e) => setEmail(e.target.value)}
            />
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
      </Grid>
      <div>
        <p>Terms and Conditions apply</p>
      </div>
    </main>
  );
}
