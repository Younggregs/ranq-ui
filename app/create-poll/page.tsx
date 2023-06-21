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

export default function CreatePoll() {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [contestants, setContestants] = React.useState("");
  const [type, setType] = React.useState("");
  const [days, setDays] = React.useState("0");
  const [h, setH] = React.useState("0");
  const [m, setM] = React.useState("0");
  const [s, setS] = React.useState("0");
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
            if (parseInt(input) <= 7) {
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
        <Grid>
            <FormHeader header="Create Poll" />
        </Grid>
        <TextField 
            sx={{ m: 1, width: cardWidth }} 
            id="title" 
            label="Title" 
            variant="filled" 
            onChange={(e) => setTitle(e.target.value)}
        />
        <TextField 
            sx={{ m: 1, width: cardWidth }} 
            id="description" 
            label="Description" 
            variant="filled" 
            onChange={(e) => setDescription(e.target.value)}
            multiline
        />
        <TextField 
            sx={{ m: 1, width: cardWidth }} 
            id="contestants" 
            label="Contestants (separated by comma)" 
            variant="filled" 
            onChange={(e) => setContestants(e.target.value)}
            multiline
        />
        <FormControl variant="filled" sx={{ m: 1, width: cardWidth }}>
            <InputLabel id="type">Select Poll Type</InputLabel>
            <Select
                labelId="type"
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
            >
            <MenuItem value={'public'}>Public</MenuItem>
            <MenuItem value={'private'}>Private</MenuItem>
            </Select>
        </FormControl>
        {type === 'private' && (
            <TextField 
                sx={{ m: 1, width: cardWidth }} 
                id="voters" 
                label="Enter voter emails (separated by comma)" 
                variant="filled" 
                onChange={(e) => setVoters(e.target.value)}
                multiline
            />
        )}
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
            <p>Set Duration</p>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >

                <TextField 
                    sx={{ m: 1, width: "6ch" }} 
                    id="day" 
                    label="d" 
                    variant="filled" 
                    type="number"
                    value={days}
                    InputProps={{ inputProps: { min: 0, max: 7 } }}
                    onChange={(e) => checkValidity(e.target.value, 'days') && setDays(e.target.value)}
                />

                <TextField 
                    sx={{ m: 1, width: "6ch" }} 
                    id="hour" 
                    label="h" 
                    variant="filled" 
                    type="number"
                    value={h}
                    InputProps={{ inputProps: { min: 0, max: 23 } }}
                    onChange={(e) => checkValidity(e.target.value, 'h') && setH(e.target.value)}
                />

                <TextField 
                    sx={{ m: 1, width: "6ch" }} 
                    id="minute" 
                    label="m" 
                    variant="filled" 
                    type="number"
                    value={m}
                    InputProps={{ inputProps: { min: 0, max: 59 } }}
                    onChange={(e) => checkValidity(e.target.value) && setM(e.target.value)}
                />

                <TextField 
                    sx={{ m: 1, width: "6ch" }} 
                    id="second" 
                    label="s" 
                    variant="filled"
                    type="number"
                    value={s}
                    InputProps={{ inputProps: { min: 0, max: 59 } }}
                    onChange={(e) => checkValidity(e.target.value) && setS(e.target.value)}
                />
            </Grid>
        </Grid>
        <Link 
            href={{
                pathname: "/preview",
                query: { 
                    title,
                    description,
                    contestants,
                    type,
                    voters,
                    duration: `${days}:${h}:${m}:${s}`,
                }
            }}
        >
            <Button 
                sx={{ m: 2, width: cardWidth }} 
                variant="contained"
                disabled={!mute()}
            >
                Preview
            </Button>
        </Link>
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