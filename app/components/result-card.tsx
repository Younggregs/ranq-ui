"use client";
import * as React from "react";
import { cardWidth } from "../lib/constants";
import { FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "../lib/mui";
import copy from "copy-to-clipboard";
import ResultTable from "./result-table";
import { POLL_RESULT }from "../utils/queries";
import { useQuery } from 'urql';

export default function Result({token}: {token: string}) { 
    const [type, setType] = React.useState('');
    const [res] = useQuery({query: POLL_RESULT, variables: {token}});
    const { data, fetching, error } = res;
    console.log('data', data)
    if(data !== undefined && data?.pollResult?.popularVote !== undefined){
        console.log('data stringified', JSON.parse(data?.pollResult?.popularVote || '[]'))
    }

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
                    <MenuItem value={'popularVote'}>Rank 1 Technique</MenuItem>
                    <MenuItem value={'popularVote'}>Popular Vote</MenuItem>
                </Select>
            </FormControl>
            {!fetching && (
                <ResultTable 
                    data={JSON.parse(data?.pollResult[type] || '[]')}
                />
            )}
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