import React from 'react';
import {connect} from "react-redux";
import {getOrdersByUserId, sortOrders} from "../../../actions/orders.action";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import {Link} from "react-router-dom";
import {checkLogin} from "../../../actions/auth.action";
import {InputLabel} from "@material-ui/core";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";



class ViewOrders extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            toSort: ''
        }
    }

    static getDerivedStateFromProps(props, currentState){
        if(props.login_user && props.login_user.user){
            !Array.isArray(props.orders) && props.getOrdersByUserId(props.login_user.user.id, ()=>{}, ()=>{});
        }
    }
    // we don't need to use getDerivedStateFromProps here, we can directly use this.props.login_user.user.id to get user id to get user id from guard component

    updateToSort = (event) => {
        this.setState({
            toSort: event.target.value
        })
        this.props.sortOrders(this.props.orders, event.target.value);
    }

    render(){
        return(
            <Container style={{flexGrow: 1}} style={{marginTop: 40, marginBottom: 80}}>
                <Grid style={{marginLeft: 35}}>
                    <h4>My Orders</h4>
                </Grid>
                <FormControl className="MuiFormControl" style={{marginLeft: 35}}>
                    <InputLabel htmlFor="age-customized-select">Sort</InputLabel>
                    <Select value={this.state.toSort}
                            onChange={this.updateToSort}
                            input={<Input name="age" id="age-customized-select" />}
                            style={{width:"200px"}}>
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="recent">
                            View Most Recent
                        </MenuItem>
                        <MenuItem value="old">
                            View Earliest
                        </MenuItem>
                    </Select>
                </FormControl>
                {
                    this.props.orders && Array.isArray(this.props.orders) && this.props.orders.map((order,index) => {

                        return(
                            <div key={index}>

                                <Container style={{marginTop: 80}}>
                                    <Paper style={{paddingTop: 50, paddingBottom:50, paddingLeft:80, paddingRight:80}}>
                                        <Grid container spacing={4} style={{marginBottom: 20}}>
                                            <Grid item xs={12} sm={6}>
                                                <Grid item xs={12} sm={6} component="h6">
                                                    <b>Your Order Id: {order.id}</b>
                                                </Grid>
                                                <Grid item xs={12} component="h6">
                                                    Purchase Date: {order.purchaseDate.substring(0,10)}
                                                </Grid>
                                                <Grid item xs={12} component="h6">
                                                    Deliver to: {order.firstname}, {order.lastname}
                                                </Grid>
                                                <Grid item xs={12} component="h6">
                                                    Delivery Address: {order.address1}, {order.address2}
                                                </Grid>
                                            </Grid>

                                            <Grid item xs={12} sm={6} >
                                                <Grid
                                                    container
                                                    direction="row"
                                                    justify="flex-end"
                                                    alignItems="center"
                                                >
                                                    <Link to={`/trackorders/id/${order.id}`}>
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            style={{margin:"3px"}}
                                                        >
                                                            Track Your Order
                                                        </Button>
                                                    </Link>

                                                </Grid>
                                            </Grid>

                                        </Grid>


                                        {
                                            order.purchases.map(productOrder => {
                                                return(
                                                    <Grid
                                                        container
                                                        spacing={4}
                                                        direction="row"
                                                        justify="flex-end"
                                                        alignItems="center"
                                                    >
                                                        <Grid item xs={12} sm={6}>
                                                            <Typography color="textSecondary" gutterBottom>
                                                                <Link to={`/products/id/${productOrder.product.id}`}>
                                                                    <img src={productOrder.product.image} width={300} height={200} alt=""/>
                                                                </Link>
                                                            </Typography>
                                                        </Grid>


                                                        <Grid item xs={12} sm={6}>
                                                            <Grid
                                                                container
                                                                direction="row"
                                                                justify="flex-end"
                                                                alignItems="center"
                                                            >
                                                                <Grid item xs={12} component="h4" style={{textAlign:'right'}}>
                                                                    <b> {productOrder.product.name} </b>
                                                                </Grid>
                                                                <Grid item xs={12} component="h6" style={{textAlign:'right'}}>
                                                                    <b> {productOrder.product.brand} </b>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                );
                                            })
                                        }
                                    </Paper>
                                </Container>
                            </div>
                        );
                    })

                }
            </Container>
        )
    }
}

function mapStateToProps(appState){
    return {
        login_user: appState.login_user,
        // user_id: (appState.login_user && appState.login_user.user) ? appState.login_user.user.id : null,
        orders: appState.orders
    }
}


export default connect(mapStateToProps, {getOrdersByUserId, checkLogin, sortOrders})(ViewOrders);
