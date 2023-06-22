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
import { VERIFY_EMAIL, SIGNUP } from "../utils/mutations";
import { useRouter, useSearchParams } from "next/navigation";

export default function Signup() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [emailSent, setEmailSent] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);


  const [verifyEmailResult, verifyEmail] = useMutation(VERIFY_EMAIL);

  const submit = async () => {
    console.log("submit");
    setIsLoading(true);
    const data = {
      email,
      type: "signup_email",
    };
    verifyEmail(data).then((result) => {
      if (result.error) {
        console.error("Oh no!", result.error);
      }
      console.log("result", result);
      setEmailSent(true);
    });
    setIsLoading(false);
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
                  Email Sent!
              </h2>
              <p>
                  Verification email sent. <br />
                  Check your email for a link to continue.
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
            <Grid>
              <Link href="/login">Login</Link>
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
