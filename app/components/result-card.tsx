"use client";
import * as React from "react";
import { cardWidth } from "../lib/constants";
import { FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "../lib/mui";
import ResultTable from "./result-table";

export default function Result({data}: {data: any}) { 
    const [type, setType] = React.useState('');

    return (
        <Grid
            container
            direction="column"
            sx={{ m: 2, width: cardWidth }}
            style={styles.card}
        >
            <div>
                <h4>Results!</h4>
                <p>Your results are ready</p>
            </div>
            <FormControl variant="filled" sx={{ m: 1, width: "25ch" }}>
                <InputLabel id="type">Select Result Type</InputLabel>
                <Select
                    labelId="type"
                    id="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                >
                    <MenuItem value={'popularVote'}>Popular Vote</MenuItem>
                    <MenuItem value={'rankRaiseBar'}>Rank 1 Technique</MenuItem>
                </Select>
            </FormControl>
            <ResultTable data={JSON.parse(data[type] || '[]')} />
        </Grid>
    )

}

const styles = {
    input: {
      backgroundColor: "#fff",
    },
    card: {
      padding: "1rem",
      border: "1px solid rgba(var(--callout-border-rgb), 0.3)",
      borderRadius: "var(--border-radius)",
    },
   linkCard: {
      border: "1px solid rgba(var(--callout-border-rgb), 0.3)",
      marginTop: 5,
   }, 
   linkField: {
      padding: 2,
   }
  };