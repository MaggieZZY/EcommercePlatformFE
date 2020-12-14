import React from "react";
import {connect} from "react-redux";
import {getUserDetails} from "../../../actions/userdetails.action";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {Link} from "react-router-dom";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";


class ViewProfile extends React.Component {

    constructor(props){
        super(props);
        this.state={

        }
    }


    static getDerivedStateFromProps(props, currentState) {
        console.log(props.login_user);
        if (props.login_user && props.login_user.user && props.login_user.success === true) {
            !props.user_details && props.getUserDetails(
                props.login_user.user.id,
                (res) => {
                    console.log(res.data);
                },
                (err) => {
                    console.log(err.data);
                });

        }
    }

    render(){
        return (
            <div>
                {
                    !this.props.user_details ? (
                        <Container style={{marginTop:100}}>{/*style={{display: !this.props.user_details ? 'inherit' : 'none'}}*/}
                            <Grid>
                                <h4>Looks like you haven't created a profile</h4>
                            </Grid>
                            <Grid>
                                <Link to="/addprofile">
                                    <Button>
                                        Add Profile
                                    </Button>
                                </Link>
                            </Grid>

                        </Container>
                    ) : (
                        <Container component="main" maxWidth="xs" >{/*style={{display: this.props.user_details ? 'inherit' : 'none'}}*/}
                            <CssBaseline />
                            <div className="paper" style={{marginTop: 50, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <Avatar className="avatar" style={{margin: 10, backgroundColor: "blue"}}>
                                    <LockOutlinedIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Your Profile
                                </Typography>

                                <form style={{width: '100%', marginTop: 20}}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                id="firstname"
                                                name="firstname"
                                                label="First name"
                                                value={this.props.user_details.firstname}
                                                fullWidth
                                                autoComplete="fname"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                id="lastname"
                                                name="lastname"
                                                label="Last name"
                                                value={this.props.user_details.lastname}
                                                fullWidth
                                                autoComplete="lname"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                id="phone"
                                                name="phone"
                                                label="Phone Number"
                                                value={this.props.user_details.phone}
                                                fullWidth
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextField
                                                id="address1"
                                                name="address1"
                                                label="Address line 1"
                                                value={this.props.user_details.address1}
                                                fullWidth
                                                autoComplete="billing address-line1"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                id="address2"
                                                name="address2"
                                                label="Address line 2"
                                                value={this.props.user_details.address2}
                                                fullWidth
                                                autoComplete="billing address-line2"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                id="city"
                                                name="city"
                                                label="City"
                                                value={this.props.user_details.city}
                                                fullWidth
                                                autoComplete="billing address-level2"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                id="state"
                                                name="state"
                                                label="State/Province/Region"
                                                value={this.props.user_details.state}
                                                fullWidth />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                id="zip"
                                                name="zip"
                                                label="Zip / Postal code"
                                                value={this.props.user_details.zip}
                                                fullWidth
                                                autoComplete="billing postal-code"
                                            />
                                        </Grid>
                                        <Link to="/editprofile">
                                            <Button
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                            >
                                                Edit Profile
                                            </Button>
                                        </Link>

                                    </Grid>
                                </form>
                            </div>

                        </Container>
                    )
                }
            </div>
        );

    }

}


function mapStateToProps(appState){
    return {
        login_user: appState.login_user,
        user_details: appState.user_details
    }
}

export default connect(mapStateToProps, {getUserDetails})(ViewProfile)
