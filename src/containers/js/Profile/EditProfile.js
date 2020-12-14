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
import {getUserDetails, updateUserDetails} from "../../../actions/userdetails.action";
import {reduxForm} from "redux-form";


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
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
            initialized: false,
            userDetail: {
                id: '',
                firstname: '',
                lastname: '',
                phone: '',
                address1:'',
                address2:'',
                city:'',
                state:'',
                zip:'',
                userId: ''
            }
        };
        (this.props.login_user && this.props.login_user.user) && this.props.getUserDetails(
            this.props.login_user.user.id,
            (res) => {
                console.log(res.data);
                this.setState({
                    userDetail: {...res.data}
                })
            },
            ()=>{}
        );
    }

    // renderField = (field) => {
    //     return(
    //         <Grid item xs={12}>
    //             <label htmlFor={field.input.name}>{field.input.name}</label>
    //             <TextField
    //                 id={field.input.name}
    //                 name={field.input.name}
    //                 // label={field.input.name}
    //                 {...field.input}
    //                 type={field.type}
    //                 className="form-control"
    //             />
    //             <p style={{color: 'red'}}>{field.meta.error}</p>
    //         </Grid>
    //     )
    // }

    componentDidMount() {
        (this.props.login_user && this.props.login_user.user) && this.props.getUserDetails(
            this.props.login_user.user.id, ()=>{}, ()=>{}
        )
    }


    // static getDerivedStateFromProps(props, currentState){
    //
    //     if(props.login_user && props.user_details && !currentState.initialized){
    //         console.log("props.user_details is", props.user_details);
    //         const user_id = +props.login_user.user.id;
    //         const user_detail = props.user_details.find(p => p.user_id===user_id);
    //         props.initialize(user_detail);
    //         return {
    //             initialized: true
    //         }
    //     }
    //     return currentState;
    // }

    static getDerivedStateFromProps(props, currentState){
        /*if(props.login_user && props.login_user.user) {
            props.getUserDetails(props.login_user.user.id, ()=>{}, ()=>{})
            console.log("user details is", props.user_details);
            if(props.user_details){
                return {
                    id: props.user_details.id,
                    userId: props.login_user.user.id,
                }
            }
        }*/
        if(props.login_user && props.login_user.user) {
            props.getUserDetails(props.login_user.user.id, () => {
            }, () => {
            })
        }
        if(props.user_details && !currentState.initialized){
            props.initialize(props.user_details);
            return {
                ...currentState,
                initialized: true
            }
        }
        return currentState;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("in update");
        if(prevProps.login_user && this.props.login_user && (prevProps.user_details !== this.props.user_details)){
            this.props.getUserDetails(
                this.props.login_user.user.id,
                (res) => {
                    console.log(res.data);
                    this.setState({
                        userDetail: {...res.data}
                    })
                },
                ()=>{}
            )
        }
    }

    // submit = (val) => {
    //     console.log(val);
    //     this.props.updateUserDetails(
    //         val,
    //         () => {},
    //         () => {}
    //     )
    // }


    updateFormControl = (event) => {
        this.setState({
            userDetail:{
                ...this.state.userDetail,
                [event.target.id]: event.target.value

            }

        });
    };

    submit = (event) => {
        event.preventDefault();
        console.log("to backend is", this.state.userDetail);
        this.setState({
            userDetail: {
                ...this.props.userDetail,
                userId: this.props.login_user.user.id
            }
        })
        this.props.updateUserDetails(
            this.state.userDetail,
            () => {
                console.log("save profile successful");
            },
            () => {
                console.log("save profile login failed");
            }
        )
    }


    render(){

        const {userDetail} = this.state;
        return(
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className="paper" style={{marginTop: 50, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Avatar className="avatar" style={{margin: 10, backgroundColor: "blue"}}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Edit Profile
                    </Typography>

                    <form onSubmit={this.submit} style={{width: '100%', marginTop: 20}}>
                        <Grid container spacing={3}>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="firstname"
                                    name="firstname"
                                    label="First name"
                                    value={userDetail.firstname}
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
                                    value={userDetail.lastname}
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
                                    value={userDetail.phone}
                                    onChange={this.updateFormControl}
                                    fullWidth
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    id="address1"
                                    name="address1"
                                    label="Address line 1"
                                    value={userDetail.address1}
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
                                    value={userDetail.address2}
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
                                    value={userDetail.city}
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
                                    value={userDetail.state}
                                    onChange={this.updateFormControl}
                                    fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="zip"
                                    name="zip"
                                    label="Zip / Postal code"
                                    value={userDetail.zip}
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
        login_user: appState.login_user,
        user_details: appState.user_details
    }
}

function validate(val){
    const errors = {};
    return errors;
}


export default connect(mapStateToProps, {getUserDetails, updateUserDetails})(reduxForm({
    form: 'EditProfileForm', // cannot change the name form
    validate
})(EditProfile));
