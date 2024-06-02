import Paper from '@mui/material/Paper';
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { FetchResponse } from '../../../types/types';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';

type LoginCardProps = {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
    onEmailChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    onPasswordChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    emailError: boolean,
    emailValue: string,
    passwordError: boolean,
    passwordValue: string,
    fetchResult: FetchResponse
}

const LoginCard = (props: LoginCardProps) => {
    return (
        <Paper
        elevation={5}
        sx={{
            color: 'white',
            height: '100%',
            borderRadius: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}
    >
        <Avatar
        src='/logo.png'
        />
        <Typography
            component='h1'
            variant='h5'
            sx={{
                color: 'black'
            }}
        >
            Login
        </Typography>
        <Box
            noValidate
            component='form'
            onSubmit={props.handleSubmit}
            mt={1}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '65%'
            }}
        >
            <TextField
                required
                margin='normal'
                autoFocus
                fullWidth
                id='email'
                autoComplete='email'
                label='Email'
                onChange={(event) => props.onEmailChange(event)}
                error={props.emailError}
                value={props.emailValue}
            />
            <TextField
                required
                margin='normal'
                fullWidth
                id='password'
                label='Password'
                autoComplete='current-password'
                type='password'
                onChange={(event) => props.onPasswordChange(event)}
                error={props.passwordError}
                value={props.passwordValue}
            />
            <Button
                type='submit'
                variant='contained'
                fullWidth
                sx={{
                    mt: 2,
                    borderRadius: 2
                }}
            >
                Login
            </Button>
        </Box>
        <Box
            p={2}
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
        >
            <Collapse
                in={!!props.fetchResult?.error?.message}
            >
                <Alert
                    severity='error'
                >
                    {
                        props.fetchResult?.error?.message
                    }
                </Alert>
            </Collapse>
            {
                props.fetchResult?.loading && <CircularProgress />
            }
        </Box>
    </Paper>
    )
}

export default LoginCard;