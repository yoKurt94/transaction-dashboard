import { useState, useReducer, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useFetch from "../../hooks/useFetch";
import { FetchResponse } from "../../types/types";
import './Login.css';
import * as Types from '../../types/types';
import * as LoginReducer from '../../features/login/utils/LoginReducer';
import LoginCard from "../../features/login/components/LoginCard";

interface LoginProps {
    didClickLogin: (token: string) => void
}

const Login = (props: LoginProps) => {

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDisplayText(current => (current + 1) % texts.length)
        }, 5000);
        return () => {
            clearInterval(intervalId);
        };
    }, [])

    const texts: string[] = [
        "Financing solutions for your business customers.",
        "Unlock a new revenue stream.",
        "Access to cash flow made easy."
    ];

    const [textFieldErrors, setTextFieldErrors] = useState({
        email: false,
        password: false,
    })
    const [fetchResult, setFetchResult] = useState<FetchResponse>({
        response: 0,
        data: null,
        error: null,
        loading: false,
    });
    const [displayText, setDisplayText] = useState<number>(0);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setTextFieldErrors({
            email: false,
            password: false
        })
        if (checkEmailAndPasswordFields()) {
            dispatch({ type: LoginReducer.ReducerActionValues.formValidation, value: true })
        }
    }

    const [loginState, dispatch] = useReducer(LoginReducer.loginReducer, LoginReducer.initialLoginState);
    const loginResponse: FetchResponse = useFetch(
        "http://localhost:3000/login",
        [loginState.isFormValidated],
        loginState.isFormValidated,
        "POST",
        { email: loginState.email, password: loginState.password },
    )

    useEffect(() => {
        setFetchResult(loginResponse)
        dispatch({ type: LoginReducer.ReducerActionValues.formValidation, value: false })
        if (fetchResult.error) {
            setFetchResult(prevState => ({
                ...prevState,
                error: null
            }))
        } else {
            if (Types.isLoginResponse(loginResponse.data)) {
                localStorage.setItem('email', loginState.email);
                localStorage.setItem("token", loginResponse.data.token)
                props.didClickLogin(loginResponse.data.token)
            }
        }
    }, [loginResponse])

    function checkEmailAndPasswordFields() {
        if (loginState.email === "" && loginState.password === "") {
            setFetchResult(prevState => ({
                ...prevState,
                error: { error: "", message: "Empty email and password field." }
            }))
            setTextFieldErrors({
                email: true,
                password: true
            })
            return false;
        } else if (loginState.email === "") {
            setFetchResult(prevState => ({
                ...prevState,
                error: { error: "", message: "Empty email field." }
            }))
            setTextFieldErrors(({
                password: false,
                email: true
            }))
            return false;
        } else if (loginState.password === "") {
            setFetchResult(prevState => ({
                ...prevState,
                error: { error: "", message: "Empty password field." }
            }))
            setTextFieldErrors(({
                email: false,
                password: true
            }))
            return false;
        } else {
            return true;
        }
    }

    return (
        <CssBaseline>
            <Grid
                item
                container
                component='main'
                sm={4}
                md={12}
                sx={{
                    backgroundColor: 'black',
                    backgroundImage: 'radial-gradient(grey 1px, black 1px)',
                    backgroundSize: '40px 40px',
                    minHeight: '100vh',
                    minWidth: '100vw'
                }}
            >
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={8}
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    p={8}
                >
                    <Typography
                        key={texts[displayText]}
                        className="roll-out"
                        variant="h3"
                        component="h1"
                        sx={{
                            color: 'white'
                        }}
                    >
                        {texts[displayText]}
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={4}
                    p={4}
                >   
                <LoginCard
                handleSubmit={handleSubmit}
                onEmailChange={(event) => dispatch({ type: LoginReducer.ReducerActionValues.email, value: event.target.value })}
                onPasswordChange={(event) => dispatch({ type: LoginReducer.ReducerActionValues.password, value: event.target.value })}
                emailError={textFieldErrors.email}
                emailValue={loginState.email}
                passwordError={textFieldErrors.password}
                passwordValue={loginState.password}
                fetchResult={fetchResult}
                />
                </Grid>
            </Grid>
        </CssBaseline>
    )
}

export default Login