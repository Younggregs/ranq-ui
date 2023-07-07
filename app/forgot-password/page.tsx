"use client";
import * as React from "react";
import stylesMain from "../page.module.css";
import {
  Box,
  TextField,
  Grid,
  Button,
} from "../lib/mui";
import Link from 'next/link'
import Title from "../components/title";
import FormHeader from "../components/form-header";
import ActivityIndicator from "../components/activity-indicator";
import { cardWidth } from "../lib/constants";
import { VERIFY_EMAIL } from "../utils/mutations";
import { useMutation } from "urql";

export default function ForgotPassword() {
  const [emailSent, setEmailSent] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [verifyEmailResult, verifyEmail] = useMutation(VERIFY_EMAIL);

  const submit = async () => {
    setIsLoading(true);
    const data = {
      email,
      type: "forgot_password_email",
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
        return email && true
      }

  return (
    <main className={stylesMain.main}>
      <Title />

      <Grid
        justifyContent="center"
        alignItems="center"
      >
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
                Reset password link sent. <br />
                Check your email for a link to reset password.
            </p>
        </Grid>

        ): (

        <Grid>
          <Grid>
              <FormHeader header="Forgot Password" />
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
            ): (
            <Button 
                sx={{ m: 2, width: cardWidth }} 
                variant="contained"
                onClick={submit}
                disabled={!mute()}
            >
                Continue
            </Button>
          )}
          </Grid>
          <Grid
              container
              direction="column"
              justifyContent="flex-end"
              alignItems="flex-end"
              sx={{ m: 1, width: cardWidth }} 
          >
              <div>
                  <Link href="/Login">
                      Login
                  </Link>
              </div>
              <div>
                  <Link href="/verify-email">
                      Signup
                  </Link>
              </div>
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

const styles = {
  input: {
    backgroundColor: "#fff",
  },
};
