import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {connect} from "react-redux";
import {checkAccountExist, signup} from "../../actions/auth.action";
import Snackbar from "@material-ui/core/Snackbar";
import Fade from '@material-ui/core/Fade';
import Grow from "@material-ui/core/Grow";
import {withStyles} from "@material-ui/core";

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

const styles = {
    '@global': {
        body: {
            backgroundImage: `url(https://images.unsplash.com/photo-1515339760107-1952b7a08454?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80) !important`,
            backgroundSize: "cover"
        }
    }

};

class SignUp extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            open: false,
            Transition: Fade
        }

    }

    handleClick = Transition => () => {
        this.setState({
            open: true,
            Transition,
        });
    };

    handleClose = () => {
        this.setState({
            open: false,
        });
    };

    GrowTransition(props) {
        return <Grow {...props} />;
    }


    updateFormControl = (event) => {
        console.log(event);
        if (event.target.id === 'username') {
            this.setState({
                username: event.target.value
            }, () => {
                this.props.checkAccountExist(
                    this.state.username,
                    ()=>{
                        this.handleClick(this.GrowTransition);
                        this.setState({open: true});
                    },
                    ()=>{}
                )
            });

        }

        if (event.target.id === 'password') {
            this.setState({
                password: event.target.value
            })
        }
    }

    submit = (event) => {
        event.preventDefault();
        this.props.signup(
            this.state,
            () => {
                console.log("Save user successful");
                this.props.history.push('/login');
            },
            () => {
                console.log("Save user failed");
            }
        )
    }

    render(){
        return (
            <div>{/* style={{
                backgroundImage: `url(https://images.unsplash.com/photo-1468476775582-6bede20f356f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1966&q=80)`,
                backgroundSize: "cover"}}*/}
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div style={{marginTop: 80, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <Avatar style={{margin: 10, backgroundColor: "green"}}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <ValidatorForm style={{width: '100%', marginTop: 30}} onSubmit={this.submit}>
                            <Grid container spacing={2}>

                                <Grid item xs={12}>
                                    <TextValidator
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="username"
                                        label="Email"
                                        name="username"
                                        autoComplete="username"
                                        autoFocus
                                        value={this.state.username}
                                        onChange={this.updateFormControl}
                                        validators={['required', 'isEmail']}
                                        errorMessages={['this field is required', 'email is not valid']}
                                    />
                                </Grid>
                                <Snackbar
                                    open={this.state.open}
                                    onClose={this.handleClose}
                                    TransitionComponent={this.state.Transition}
                                    ContentProps={{
                                        'aria-describedby': 'message-id',
                                    }}
                                    message={<span id="message-id">Account Already Exists</span>}
                                />
                                <Grid item xs={12}>
                                    <TextValidator
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        value={this.state.password}
                                        onChange={this.updateFormControl}
                                        validators={['required']}
                                        errorMessages={['this field is required']}

                                    />
                                </Grid>

                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                style={{marginTop: 30,marginBottom: 30}}
                            >
                                Sign Up
                            </Button>
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <Link href="/login" variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </ValidatorForm>
                    </div>
                    <Box mt={5}>
                        <Copyright />
                    </Box>
                </Container>
            </div>

        );
    }


}

export default connect(null, {signup, checkAccountExist})(withStyles(styles)(SignUp));

