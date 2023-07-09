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
import Footer2 from "../components/footer-2";
import Logo from "../components/logo";

export default function Signup() {
  const router = useRouter()
  // const [showPassword, setShowPassword] = React.useState(false);
  const [name, setName] = React.useState("");
  const [errors, setErrors] = React.useState('')
  // const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  // const handleClickShowPassword = () => setShowPassword((show) => !show);
  // const handleMouseDownPassword = (
  //   event: React.MouseEvent<HTMLButtonElement>
  // ) => {
  //   event.preventDefault();
  // };
  const searchParams = useSearchParams()

  const token = searchParams?.get('token')
  const pollToken = searchParams?.get('poll')

  const [res] = useQuery({query: VERIFY_EMAIL_TOKEN, variables: {token, type: 'signup_email'}});

  const { data, fetching, error } = res;

  const [signupResult, signup] = useMutation(SIGNUP);
  const [loginResult, login] = useMutation(LOGIN);

  const submit = async () => {
    setIsLoading(true);
    const password = data?.verifyEmailToken.rawToken
    const email = data?.verifyEmailToken.email

    const name_ = name || data?.verifyEmailToken?.name
    const data_ = {
        name: name_,
        email,
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
        localStorage.setItem('name', name_);
        processLogin({ email: email, password})
      }
    });
    
  }

  const processLogin = async (data: any) => {
    login(data).then(result => {
      setIsLoading(false);
      if (result.error) {
        console.error('Oh no!', result.error);
      }
      localStorage.setItem('token', result.data.tokenAuth.token);
      redirectTo()
    });
  }

  const redirectTo = () => {
    if (pollToken) {
      router.push(`/rank/${pollToken}`)
    }else{
      router.push('/')
    }
  }

  const mute = () => {
    if(!data?.verifyEmailToken.isReturning){
      return name && true;
    }
    return true;
  }

  return (
    <main className={stylesMain.main} style={{backgroundColor: '#fff'}}>
      <Grid container>
        <Grid 
          style={styles.headerBox} 
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-end"
        >
          <Logo shade="dark" />
        </Grid>
      </Grid>

      <Grid>
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
          <Grid style={styles.spacing}>
              <p style={styles.title}>Sign In</p>
            </Grid>
          {!data?.verifyEmailToken.isReturning ? (
            <TextField 
              sx={{ m: 1, width: cardWidth }} 
              id="name" 
              label="Name" 
              variant="outlined" 
              onChange={(e) => setName(e.target.value)}
            />
           ) : (
            <Grid>
              <p style={styles.text}>
                Hello {data?.verifyEmailToken.name}, <br />
                Pick up right where you left off</p>
            </Grid>
           )}
          
          {/* <FormControl sx={{ m: 1, width: cardWidth }} variant="filled">
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
          </FormControl> */}
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
              sx={styles.button}
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
      <Grid
        container
      >
        <Footer2 />
      </Grid>
    </main>
  );
}

const styles = {
  input: {
    backgroundColor: "#fff",
  },
  button: {
    m: 2, 
    width: "30ch", 
    backgroundColor: "#E14817", 
    borderRadius: "10px",
    height: "3rem",
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#000',
    margin: '0',
    padding: '0',
  },
  text: {
    fontSize: '1rem',
    fontWeight: 'normal',
    margin: '0',
    padding: '0',
    color: '#000'
  },
  spacing: {
    marginBottom: '3rem',
  },
  headerBox: {
    height: "30vh",
    width: "100%",
    backgroundColor: "#fff",
    backgroundImage: "url(/ellipse.svg)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    padding: "0 1rem",
  },
  formBox: {
    backgroundColor: "#fff",
  },
};
