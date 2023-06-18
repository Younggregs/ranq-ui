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

export default function VerifyEmail() {
    const [email, setEmail] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const submit = () => {
        console.log("submit");
        setIsLoading(true);
        const data = {
            email,
        }
        console.log('data', data)
        setIsLoading(false);
      }
    
      const mute = () => {
        return email && true
      }

  return (
    <main className={stylesMain.main}>
      <Title />

      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid>
            <FormHeader header="Verifying your email..." />
        </Grid>
        <ActivityIndicator />
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
