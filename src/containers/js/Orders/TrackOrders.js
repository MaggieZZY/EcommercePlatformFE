import React from 'react';
import {connect} from "react-redux";
import {getOrderById, updateDeliveryStatusTo2} from "../../../actions/orders.action";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import {updateReviewStatus} from "../../../actions/orderproducts.action";

const deliveryMessage = ['Your order has been placed. We will update the status as your order shipped', 'Your order has been shipped', 'Your order is delivered']

class TrackOrders extends React.Component{

    componentDidMount() {
        console.log("param is", this.props.match.params);

        this.props.getOrderById(
            this.props.match.params.id,
            () => {
                console.log('success');
                this.setState({
                    msg: 'get order successfully'
                })
            },
            () => {
                console.log('failure');
                this.setState({
                    msg: 'get order failed'
                })
            }
        )
    }

    updateDeliveryStatusTo2 = (event, order) => {
        order.deliveryStatus = 2;
        event.preventDefault();
        this.props.updateDeliveryStatusTo2(
            order,
            () => {},
            () => {}
        )
    }

    updateReviewStatus = (event, orderProduct) => {
        orderProduct.reviewStatus = 1;
        event.preventDefault();
        this.props.updateReviewStatus(
            orderProduct,
            () => {
                window.location.href =`/addreview/${orderProduct.product.id}`;
            },
            () => {}
        )
    }



    render(){
        const order = this.props.orders;
        return order && !Array.isArray(order) && (
            <Container style={{marginTop: 80}}>
                <Paper style={{paddingTop: 50, paddingBottom:50, paddingLeft:80, paddingRight:80}}>
                    <Grid container style={{display:"flex", flexDirection:"row"}}>
                        <Grid item spacing={4} style={{marginBottom: 20}}>
                            <Grid item xs={12}>
                                <Grid item xs={12} component="h6" style={{marginBottom: 10}}>
                                    <b>Your Order Id: {order.id}</b>
                                </Grid>
                                <Grid item xs={12} component="h6">
                                    <b>Delivery Status: {deliveryMessage[order.deliveryStatus]}</b>
                                </Grid>
                            </Grid>

                        </Grid>

                        <Grid item style={{marginLeft: 180, display: order.deliveryStatus===1 ? 'inherit' : 'none'}}>
                            <Button
                                variant="contained"
                                color="primary"
                                style={{margin:"3px"}}
                                onClick={event => this.updateDeliveryStatusTo2(event, order)}
                            >
                                Confirm Delivery
                            </Button>
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
                                            <img src={productOrder.product.image} width={300} height={200} alt=""/>
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <Grid style={{display:"flex", flexDirection:"row"}}>
                                            <Grid item>
                                                <Grid item xs={12} component="h4" style={{textAlign:'center'}}>
                                                    <b> {productOrder.product.name} </b>
                                                </Grid>
                                                <Grid item xs={12} component="h6" style={{textAlign:'center'}}>
                                                    <b> {productOrder.product.name} </b>
                                                </Grid>
                                            </Grid>

                                            <Grid item style={{marginLeft: 180, display: order.deliveryStatus===2 && productOrder.reviewStatus===0 ? 'inherit' : 'none'}}>
                                                <Link
                                                    to={`/addreview/${productOrder.product.id}`}
                                                    style={{textAlign:'center'}}
                                                >
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        style={{margin:"3px"}}
                                                        onClick={event => this.updateReviewStatus(event, productOrder)}
                                                    >
                                                        Write Review
                                                    </Button>
                                                </Link>
                                            </Grid>
                                        </Grid>


                                    </Grid>
                                </Grid>

                            );
                        })
                    }
                </Paper>
            </Container>
        )
    }
}

function mapStateToProps(appState){
    return {
        orders: appState.orders
    }
}


export default connect(mapStateToProps, {getOrderById, updateDeliveryStatusTo2, updateReviewStatus})(TrackOrders);
