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
import { RESET_PASSWORD }from "../utils/mutations";


export default function ResetPassword() {
  const router = useRouter()
  const [showPassword, setShowPassword] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [errors, setErrors] = React.useState('')
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const searchParams = useSearchParams()

  const token = searchParams?.get('token')
  console.log('token', token)

  const [res] = useQuery({query: VERIFY_EMAIL_TOKEN, variables: {token, type: 'forgot_password_email'}});

  const { data, fetching, error } = res;
  console.log('data: ', data, error)

  const [resetPasswordResult, resetPassword] = useMutation(RESET_PASSWORD);

  const submit = () => {
    console.log("submit");
    setIsLoading(true);
    setErrors('')
    const data = {
        password,
        token
    }
    
    resetPassword(data).then(result => {
      setIsLoading(false);
      const res = result?.data?.resetPassword as any
      if (result.error) {
        console.error('Oh no!', result.error);
      }else if(!res?.success){
        setErrors(res?.errors.message)
      }
      else{
        router.push('/login')
      }
    });
   
    
  }

  const mute = () => {
    return password && true
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
            <FormHeader header="Reset Password" />
        </Grid>
        <FormControl sx={{ m: 1, width: cardWidth }} variant="filled">
          <InputLabel htmlFor="filled-adornment-password">New Password</InputLabel>
          <FilledInput
            id="filled-adornment-password"
            type={showPassword ? "text" : "password"}
            onChange = {(e) => setPassword(e.target.value)}
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
