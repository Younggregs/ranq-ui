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
import FormError from "../components/form-error"
import ActivityIndicator from "../components/activity-indicator";
import { cardWidth } from "../lib/constants";
import { useMutation, useQuery, fetchExchange, } from 'urql';
import { LOGIN, SIGNUP }from "../utils/mutations";
import { useRouter, useSearchParams } from 'next/navigation'
import { VERIFY_EMAIL_TOKEN } from "../utils/queries";

export default function Signup() {
  const router = useRouter()
  const [showPassword, setShowPassword] = React.useState(false);
  const [name, setName] = React.useState("");
  const [errors, setErrors] = React.useState('')
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const searchParams = useSearchParams()

  const token = searchParams?.get('token')
  console.log('token', token)

  const [res] = useQuery({query: VERIFY_EMAIL_TOKEN, variables: {token, type: 'signup_email'}});

  const { data, fetching, error } = res;

  const [signupResult, signup] = useMutation(SIGNUP);
  const [loginResult, login] = useMutation(LOGIN);

  const submit = async () => {
    console.log("submit");
    setIsLoading(true);
    const data_ = {
        name,
        email: data?.verifyEmailToken.email,
        password
    }
    signup(data_).then(result => {
      const res = result?.data?.signup as any
      if (result.error) {
        console.error('Oh no!', result.error);
      }else if(!res?.success){
        setErrors(res?.errors.message)
      }
      else{
        console.log('result', result);
        localStorage.setItem('name', name);
        processLogin({ email: data_.email, password})
      }
    });
    
  }

  const processLogin = async (data: any) => {
    console.log('data', data);
    login(data).then(result => {
      setIsLoading(false);
      if (result.error) {
        console.error('Oh no!', result.error);
      }
      localStorage.setItem('token', result.data.tokenAuth.token);
      router.push('/')
    });
  }

  const mute = () => {
    return name && password
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

        {fetching && (
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid>
              <h2>Verifying Token...</h2>
            </Grid>
            <ActivityIndicator />
          </Grid>
          )}

          {!fetching && !data.verifyEmailToken && (
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
              <h2>Something went wrong.</h2>
              <p>- Invalid link</p>
          </Grid>
        )}

        {!fetching && data.verifyEmailToken && (
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
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
          {errors !== '' && (
            <FormError message={errors} />
          )}
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
        </Grid>
        )}
        <Grid>
            <Link href="/login">
                Login
            </Link>
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
