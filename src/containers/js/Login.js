import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {connect} from "react-redux";
import {checkLogin, login} from "../../actions/auth.action";
import Slide from "@material-ui/core/Slide";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import Snackbar from "@material-ui/core/Snackbar";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Beacon Hill
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
            backgroundImage: `url(https://images.unsplash.com/photo-1468476775582-6bede20f356f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1966&q=80)`,
            backgroundSize: "cover"

        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#63348a',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function TransitionRight(props) {
    return <Slide {...props} direction="right" />;
}



const Login = (props) => {

    const classes = useStyles();

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const handleClick =  () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const updateFormControl = (event) => {
        if (event.target.id === 'username') {
            setUsername(event.target.value);
        } else {
            setPassword(event.target.value);
        }
    }

    const submit = (event) => {
        event.preventDefault();
        props.login(
            {
                username,
                password
            },
            () => {
                console.log("login successful");
                props.checkLogin();
                window.location.href = "/";

            },
            () => {
                console.log("login failed");
                handleClick();
                setOpen(true);
            }
        )
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <ValidatorForm className={classes.form} noValidate onSubmit={submit}>
                    <TextValidator
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        value={username}
                        autoComplete="username"
                        autoFocus
                        onChange={updateFormControl}
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        open={open}
                        onClose={handleClose}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">Username or Password Incorrect</span>}
                    />
                    <TextValidator
                        required
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="password"
                        value={password}
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={updateFormControl}
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />
                    {/*<FormControlLabel*/}
                    {/*    control={<Checkbox value="remember" color="primary" />}*/}
                    {/*    label="Remember me"*/}
                    {/*/>*/}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </ValidatorForm>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}

function mapStateToProps(appState){
    return {
        login_user: appState.login_user
    }
}

export default connect(mapStateToProps, {login, checkLogin})(Login);
