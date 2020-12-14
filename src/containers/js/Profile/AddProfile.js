import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import '../../css/EditProfile.css'
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import {connect} from "react-redux";
import {
    addUserDetails
} from "../../../actions/userdetails.action";


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Wayfair
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


class EditProfile extends React.Component {
    constructor(props){
        super(props);
        console.log("in constructor", props.login_user);
        this.state = {
            firstName: '',
            lastName: '',
            phone: '',
            address1:'',
            address2:'',
            city:'',
            state:'',
            zip:'',
            userId: ''
        }
    }


    // static getDerivedStateFromProps(props, currentState){
    //     if(props.user_details && !currentState.initialized){
    //         console.log("props.user_details is", props.user_details);
    //         if(props.login_user){
    //             const user_id = +props.login_user.user.id;
    //             const user_detail = props.user_details.find(p => p.user_id===user_id);
    //             props.initialize(user_detail);
    //             return {
    //                 initialized: true
    //             }
    //         }
    //
    //     }
    //     return currentState;
    // }

    static getDerivedStateFromProps(props, currentState){
        if(props.login_user && props.login_user.user) {
            console.log("here", props.login_user.user.id);
            return {
                userId: props.login_user.user.id
            }
        }
    }


    updateFormControl = (event) => {

        this.setState({
            [event.target.id]: event.target.value
        });
    };

    submit = (event) => {
        event.preventDefault();
        this.props.addUserDetails(
            this.state,

            () => {
                console.log("save profile successful");
                window.location.href = "/"
            },
            () => {
                console.log("save profile login failed");
            }
        )
    }


    render(){


        return(
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className="paper">
                    <Avatar className="avatar">
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Add Profile
                    </Typography>

                    <form onSubmit={this.submit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="firstname"
                                    name="firstname"
                                    label="First name"
                                    value={this.state.firstname}
                                    onChange={this.updateFormControl}
                                    fullWidth
                                    autoComplete="fname"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="lastname"
                                    name="lastname"
                                    label="Last name"
                                    value={this.state.lastname}
                                    onChange={this.updateFormControl}
                                    fullWidth
                                    autoComplete="lname"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="phone"
                                    name="phone"
                                    label="Phone Number"
                                    value={this.state.phone}
                                    onChange={this.updateFormControl}
                                    fullWidth
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    id="address1"
                                    name="address1"
                                    label="Address line 1"
                                    value={this.state.address1}
                                    onChange={this.updateFormControl}
                                    fullWidth
                                    autoComplete="billing address-line1"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="address2"
                                    name="address2"
                                    label="Address line 2"
                                    value={this.state.address2}
                                    onChange={this.updateFormControl}
                                    fullWidth
                                    autoComplete="billing address-line2"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="city"
                                    name="city"
                                    label="City"
                                    value={this.state.city}
                                    onChange={this.updateFormControl}
                                    fullWidth
                                    autoComplete="billing address-level2"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="state"
                                    name="state"
                                    label="State/Province/Region"
                                    value={this.state.state}
                                    onChange={this.updateFormControl}
                                    fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="zip"
                                    name="zip"
                                    label="Zip / Postal code"
                                    value={this.state.zip}
                                    onChange={this.updateFormControl}
                                    fullWidth
                                    autoComplete="billing postal-code"
                                />
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                Save Profile
                            </Button>

                        </Grid>
                    </form>


                </div>
            </Container>
        )
    }
}

function mapStateToProps(appState){
    return {
        login_user: appState.login_user
    }
}

export default connect(mapStateToProps,{addUserDetails})(EditProfile)
