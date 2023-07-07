"use client";
import * as React from "react";
import stylesMain from "../page.module.css";
import {
  TextField,
  FormControl,
  InputLabel,
  Grid,
  Button,
  Select,
  MenuItem,
} from "../lib/mui";
import Link from 'next/link'
import Title from "../components/title";
import FormHeader from "../components/form-header";
import { cardWidth } from "../lib/constants";
import Preview from "../preview/preview";

export default function Create() {
  const [preview, setPreview] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [contestants, setContestants] = React.useState("");
  const [type, setType] = React.useState("");
  const [days, setDays] = React.useState("");
  const [h, setH] = React.useState("");
  const [m, setM] = React.useState("");
  const [voters, setVoters] = React.useState("");
  const maxMandS = 60;

  const mute = () => {
    if (type === 'private') {
        return title && contestants && type && voters
    }
    return title && contestants && type
  }

  const checkValidity = (input: string, type="m-s") => {

    switch (type) {
        case 'days':
            if (parseInt(input) <= 6) {
                return true
            }   
            return false

        case 'h':
            if (parseInt(input) <= 48) {
                return true
            }   
            return false

        case 'm-s':
            if (parseInt(input) <= maxMandS) {
                return true
            }
            return false
    
        default:
            break;
    }
  }

  const calculateDurationInSeconds = () => {
    const daysInSeconds = (parseInt(days) || 0) * 24 * 60 * 60
    const hInSeconds = (parseInt(h) || 0) * 60 * 60
    const mInSeconds = (parseInt(m) || 0) * 60

    return daysInSeconds + hInSeconds + mInSeconds
  }
  
    const getData = () => {
        const data = {
            title,
            description,
            contestants,
            type,
            voters,
            duration: `${days}:${h}:${m}`,
            durationS: calculateDurationInSeconds()
        }

        return data
    }

  return (
    <>
    {preview ? (
        <Preview data={getData()} />
    ) : (
    <main className={stylesMain.main}>

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
        <Grid sx={styles.inputBox}>
            <p style={styles.label}>Poll Title</p>
            <TextField 
                sx={styles.textField} 
                id="title" 
                label="enter poll title" 
                variant="outlined" 
                onChange={(e) => setTitle(e.target.value)}
            />
        </Grid>

        <Grid sx={styles.inputBox} style={{ marginBottom: '4rem' }}>
            <p style={styles.label}>Poll Description</p>
            <TextField 
                sx={styles.textField} 
                rows={4}
                style={{height: '5rem'}}
                id="description" 
                label="enter poll description" 
                variant="outlined" 
                onChange={(e) => setDescription(e.target.value)}
                multiline
            />
        </Grid>

        <Grid sx={styles.inputBox}>
            <p style={styles.label}>Poll Type</p>
            <TextField
                id="outlined-select-currency"
                select
                label="select poll type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                sx={styles.textField}
                >
                    <MenuItem value={'public'}>Public</MenuItem>
                    <MenuItem value={'private'}>Private</MenuItem>
            </TextField>
        </Grid>

        <Grid style={styles.line} />

        {type === 'private' && (
            <Grid sx={styles.inputBox}>
                <p style={styles.label}>Enter Voters Email </p>
                <TextField 
                    sx={{ m: 1, width: cardWidth }} 
                    id="voters" 
                    label="enter emails, separated by comma" 
                    variant="outlined" 
                    onChange={(e) => setVoters(e.target.value)}
                    multiline
                    rows={2}
                />
                <Grid sx={styles.line} />
            </Grid>
        )}

        <Grid sx={styles.inputBox}>
            <p style={styles.label}>Contestants Names</p>
            <TextField 
                sx={{ m: 1, width: cardWidth }} 
                id="contestants" 
                label="enter names, separated by comma" 
                variant="outlined" 
                onChange={(e) => setContestants(e.target.value)}
                multiline
            />
        </Grid> 
        
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="space-between"
        >
            <p style={styles.label}>Set Poll Duration</p>
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >

                <TextField 
                    sx={{ m: 1, width: "8ch" }} 
                    id="day" 
                    label="Days" 
                    variant="outlined" 
                    type="number"
                    value={days}
                    InputProps={{ inputProps: { min: 0, max: 6 } }}
                    onChange={(e) => checkValidity(e.target.value, 'days') && setDays(e.target.value)}
                />

                <TextField 
                    sx={{ m: 1, width: "8ch" }} 
                    id="hour" 
                    label="Hours" 
                    variant="outlined" 
                    type="number"
                    value={h}
                    InputProps={{ inputProps: { min: 0, max: 23 } }}
                    onChange={(e) => checkValidity(e.target.value, 'h') && setH(e.target.value)}
                />

                <TextField 
                    sx={{ m: 1, width: "8ch" }} 
                    id="minute" 
                    label="Minutes" 
                    variant="outlined" 
                    type="number"
                    value={m}
                    InputProps={{ inputProps: { min: 0, max: 59 } }}
                    onChange={(e) => checkValidity(e.target.value) && setM(e.target.value)}
                />
            </Grid>
        </Grid>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{ m: 1, width: cardWidth }} 
            >
                <Button 
                    sx={styles.button} 
                    variant="contained"
                    disabled={!mute()}
                    onClick={() => setPreview(true)}
                >
                    Preview
                </Button>
            </Grid>
      </Grid>
      </Grid>
    </main>
    )}
    </>
  );
}

const styles = {
  input: {
    backgroundColor: "#fff",
  },
  textField: {
    width: cardWidth,
    borderRadius: "0.5rem",
    m: 1
  },
  label: {
    marginLeft: "0.5rem",
    fontSize: "1rem",
    fontWeight: "bold",
  },
  inputBox: {
    marginBottom: "1rem",
  },
  line: {
    width: '100%',
    height: '2px',
    backgroundColor: '#D4D4D8',
    marginTop: '1rem',
    marginBottom: '1rem'
 },
 button: {
    width: '20rem', 
    backgroundColor: '#E14817',
    borderRadius: 'var(--border-radius)',
  }
};