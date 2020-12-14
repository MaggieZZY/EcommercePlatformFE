import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm';
// import PaymentForm from './PaymentForm';
import Review from "./Review";
import {connect} from "react-redux";
import {addOrder} from "../../../actions/orders.action";
import {getUserDetails} from "../../../actions/userdetails.action";

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


const steps = ['Shipping address', /*'Payment details',*/ 'Review your order'];



class Checkout extends React.Component {

    getStepContent(step) {
        switch (step) {
            case 0:
                return <AddressForm {...this.state} fillInfoFormControl={this.fillInfoFormControl} updateInfoFormControl={this.updateInfoFormControl}/>;
            // case 1:
            //     return <PaymentForm {...this.state} updateCardFormControl={this.updateCardFormControl}/>;
            case 1:
                return <Review {...this.state}/>;
            default:
                throw new Error('Unknown step');
        }
    }

    constructor(props){
        super(props);

        const cartItems = JSON.parse(localStorage.getItem("cartItems"));

        let purchases = [];
        cartItems && Array.isArray(cartItems) && cartItems.forEach(item => {
            const obj = {
                qty: item.count,
                reviewStatus: 0,
                product: {
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    categoryId: item.categoryId,
                    material: item.material,
                    brand: item.brand,
                    price: item.price,
                    image: item.image,
                    originalPrice: item.originalPrice,
                    discount: item.discount,
                }
            }
            purchases.push(obj);
        })

        const date = new Date().toISOString()

        this.state = {
            steps: {
                activeStep: 0
            },
            // card: {
            //     cardName: '',
            //     cardNumber: '',
            //     expDate: '',
            //     cvv: ''
            // },
            info: {
                purchaseDate: date,
                firstname: '',
                lastname: '',
                phone: '',
                address1: '',
                address2: '',
                city: '',
                state: '',
                zip: '',
                deliveryStatus: 0,
                userId: '',
                purchases: purchases
            }
        }
    }

    static getDerivedStateFromProps(props, currentState){
        if(props.login_user && props.login_user.user && props.login_user.success === true) {
            !props.user_details && props.getUserDetails(props.login_user.user.id, () => {}, () => {});
            return {
                info: {
                    ...currentState.info,
                    userId: props.login_user.user.id
                }
            }
        }
    }


    updateInfoFormControl = (event) => {
        this.setState({
            info:{
                ...this.state.info,
                [event.target.id]: event.target.value
            }
        })
    }

    fillInfoFormControl = (event) => {
        this.setState({
            info:{
                ...this.state.info,
                firstname: this.props.user_details.firstname,
                lastname: this.props.user_details.lastname,
                phone: this.props.user_details.phone,
                address1: this.props.user_details.address1,
                address2: this.props.user_details.address2,
                city: this.props.user_details.city,
                state: this.props.user_details.state,
                zip: this.props.user_details.zip,
            }
        })
    }

    // updateCardFormControl = (event) => {
    //     this.setState({
    //         card:{
    //             ...this.state.card,
    //             [event.target.id]: event.target.value
    //         }
    //     })
    // }

    handleNext = (event) => {
        this.setState({
            steps: {
                ...this.state.steps,
                activeStep: this.state.steps.activeStep+1
            }
        })
        console.log("step is", this.state.steps.activeStep);
        if(this.state.steps.activeStep === /*2*/ 1){
            event.preventDefault();
            this.props.addOrder(
                this.state.info,
                () => {},
                () => {}
            )
            localStorage.clear();
        }
    }

    handleBack = () => {
        this.setState({
            steps: {
                ...this.state.steps,
                activeStep: this.state.steps.activeStep-1
            }
        })
    }


    render(){
        return (
            <React.Fragment>
                <CssBaseline />
                <AppBar position="absolute" color="default" style={{position: 'relative'}}>
                    <Toolbar>
                        <Typography variant="h6" color="inherit" noWrap>
                            Beacon Hill
                        </Typography>
                    </Toolbar>
                </AppBar>
                <main style={{width: 'auto',
                    marginLeft: 100,
                    marginRight: 100,
                    }}>
                    <Paper style={{ marginTop: 30,
                        marginBottom: 30,
                        padding: 20}}>
                        <Typography component="h1" variant="h4" align="center">
                            Checkout
                        </Typography>
                        <Stepper activeStep={this.state.steps.activeStep} style={{padding: 50}}>
                            {steps.map(label => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        <React.Fragment>
                            {this.state.steps.activeStep === steps.length ? (
                                <React.Fragment>
                                    <Typography variant="h5" gutterBottom>
                                        Thank you for your order.
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        Your order has been placed. You will be notified status change as your order shipped.
                                    </Typography>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    {this.getStepContent(this.state.steps.activeStep)}
                                    <div style={{display: 'flex',
                                        justifyContent: 'flex-end'}}>
                                        {this.state.steps.activeStep !== 0 && (
                                            <Button onClick={this.handleBack} style={{marginTop: 30,
                                                marginLeft: 10}}>
                                                Back
                                            </Button>
                                        )}
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={event => this.handleNext(event)}
                                            style={{marginTop: 30,
                                                marginLeft: 10}}
                                        >
                                            {this.state.steps.activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                                        </Button>
                                    </div>
                                </React.Fragment>
                            )}
                        </React.Fragment>
                    </Paper>
                    <Copyright />
                </main>
            </React.Fragment>
        );
    }
}

function mapStateToProps(appState){
    return {
        login_user: appState.login_user,
        user_details: appState.user_details
        // orders: appState.orders
    }
}


export default connect(mapStateToProps, {getUserDetails, addOrder})(Checkout);
