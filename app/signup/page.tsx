"use client";
import * as React from "react";
import stylesMain from "../page.module.css";
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
import Link from 'next/link'
import Title from "../components/title";
import FormHeader from "../components/form-header";
import ActivityIndicator from "../components/activity-indicator";
import { cardWidth } from "../lib/constants";
import { useMutation, cacheExchange, fetchExchange, } from 'urql';
import { LOGIN, SIGNUP }from "../utils/mutations";
import { useRouter, useSearchParams } from 'next/navigation'

export default function Signup() {
  const router = useRouter()
  const [showPassword, setShowPassword] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const [signupResult, signup] = useMutation(SIGNUP);
  const [loginResult, login] = useMutation(LOGIN);

  const submit = async () => {
    console.log("submit");
    setIsLoading(true);
    const data = {
        name,
        email,
        password
    }
    signup(data).then(result => {
      if (result.error) {
        console.error('Oh no!', result.error);
      }
      console.log('result', result);
      localStorage.setItem('name', name);
      processLogin({ email, password})
    });
    setIsLoading(false);
  }

  const processLogin = async (data: any) => {
    console.log('data', data);
    login(data).then(result => {
      if (result.error) {
        console.error('Oh no!', result.error);
      }
      localStorage.setItem('token', result.data.tokenAuth.token);
      router.push('/')
    });
  }

  const mute = () => {
    return name && email && password
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
            <FormHeader header="Signup" />
        </Grid>
        <TextField 
            sx={{ m: 1, width: cardWidth }} 
            id="name" 
            label="Name" 
            variant="filled" 
            onChange={(e) => setName(e.target.value)}
        />
        <TextField 
            sx={{ m: 1, width: cardWidth }} 
            id="email" 
            label="Email" 
            variant="filled" 
            onChange={(e) => setEmail(e.target.value)}
        />
        <FormControl sx={{ m: 1, width: cardWidth }} variant="filled">
          <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
          <FilledInput
            id="password"
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        {isLoading ? (
            <ActivityIndicator />
        ): (
        <Button 
            sx={{ m: 2, width: "30ch" }} 
            variant="contained"
            onClick={submit}
            disabled={!mute()}
        >
            Continue
        </Button>
        )}
        
        <Grid>
            <Link href="/login">
                Login
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
