"use client";
import * as React from "react";
import { cardWidth } from "../lib/constants";
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "../lib/mui";
import ResultTable from "./result-table";

export default function Result({data}: {data: any}) { 
    const [type, setType] = React.useState('');

    const techniques = [
        {value: 'popularVote', label: 'Popular Vote'},
        {value: 'rankRaiseBar', label: 'Rank 1 Technique'},
    ]

    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            style={styles.card}
        >
            <Grid>
                <p>Results are ready</p>
            </Grid>
            <TextField
                id="outlined-select-currency"
                select
                label="Select Result Type"
                defaultValue=""
                helperText="Please select result type"
                onChange={(e) => setType(e.target.value)}
                style={styles.textField}
                >
                {techniques.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
                </TextField>
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
    },
   linkCard: {
      border: "1px solid rgba(var(--callout-border-rgb), 0.3)",
      marginTop: 5,
   }, 
   linkField: {
      padding: 2,
   }, 
   textField: {
        margin: '1rem',
        width: '20rem',
   }
  };