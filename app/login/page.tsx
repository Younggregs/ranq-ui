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
import { useMutation } from 'urql';
import { LOGIN }from "../utils/mutations";
import { useRouter } from 'next/navigation'

export default function Login() {
  const router = useRouter()
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const [loginResult, login] = useMutation(LOGIN);

  const submit = () => {
    setIsLoading(true);
    const data = {
        email,
        password
    }
    login(data).then(result => {
      if (result.error) {
        console.error('Oh no!', result.error);
      }
      localStorage.setItem('token', result.data.tokenAuth.token);
      router.push('/')
    });
    setIsLoading(false);
  }

  const mute = () => {
    return email && password
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
            <FormHeader header="Login" />
        </Grid>
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
            id="filled-adornment-password"
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
              sx={{ m: 2, width: "30ch" }} 
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
                <Link href="/forgot-password">
                    Forgot Password?
                </Link>
            </div>
            <div>
                <Link href="/verify-email">
                    Signup
                </Link>
            </div>
        </Grid>
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
