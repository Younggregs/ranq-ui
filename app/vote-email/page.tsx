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

export default function VoteEmail() {
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
            <FormHeader header="Enter email to receive vote link" />
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
                <Link href="/signin">
                    Sigin
                </Link>
            </div>
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
