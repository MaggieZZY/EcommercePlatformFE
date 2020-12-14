import React from 'react';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

export default class Cart extends React.Component{

    updateRemoveFromCart = (event, id) => {
        const cartItems = JSON.parse(localStorage.getItem("cartItems"));
        const filteredCartItems = cartItems.filter(item => {
            return item.id !== id;
        })
        localStorage.setItem("cartItems", JSON.stringify(filteredCartItems));
        this.forceUpdate();
    }

    render(){
        const cartItems = JSON.parse(localStorage.getItem("cartItems"));
        let totalPrice = 0;

        return(
            <Container style={{marginTop: 80}}>
                <div style={{display: (!cartItems || cartItems.length<1) ? 'inherit' : 'none'}}>
                    <div style={{marginLeft: 80}}>
                        <h2>Cart is empty</h2>
                        <Link to="/"><h4>Browse the products</h4></Link>
                    </div>

                    <img src="https://cdn.dribbble.com/users/1244867/screenshots/4346888/empty_cart_1x.jpg" alt=""/>
                </div>

                <div style={{display: (cartItems&&cartItems.length>=1) ? 'inherit' : 'none'}}>
                    <h4 style={{marginLeft: 35}}>My Shopping Cart</h4>

                    {
                        cartItems && cartItems.map((item,index) => {
                            totalPrice += (item.price * item.count);
                            return(
                                <div key={index+item.name}>
                                    <Container style={{marginTop: 80}}>
                                        <Paper style={{paddingTop: 50, paddingBottom:50, paddingLeft:80, paddingRight:80}}>
                                            <Grid
                                                container
                                                spacing={4}
                                                direction="row"
                                                justify="flex-end"
                                                alignItems="center"
                                            >
                                                <Grid item xs={12} sm={4}>
                                                    <Typography color="textSecondary" gutterBottom>
                                                        <img src={item.image} width={300} height={200} alt=""/>
                                                    </Typography>
                                                </Grid>

                                                <Grid item xs={12} sm={4}>
                                                    <Grid
                                                        container
                                                        direction="row"
                                                        justify="flex-end"
                                                        alignItems="center"
                                                    >
                                                        <Grid item xs={12} component="h4" style={{textAlign:'right'}}>
                                                            <b> {item.name} </b>
                                                        </Grid>
                                                        <Grid item xs={12} component="h6" style={{textAlign:'right'}}>
                                                            <b> {item.brand} </b>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>

                                                <Grid item xs={12} sm={4} component="h6">
                                                    <b>{item.price}</b>
                                                    <b> x </b>
                                                    <input type="text" className="form-control input-sm" value={item.count} />

                                                </Grid>
                                            </Grid>

                                            <Grid>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    style={{margin:"3px"}}
                                                    onClick={event => this.updateRemoveFromCart(event, item.id)}
                                                >
                                                    Remove
                                                </Button>
                                            </Grid>
                                        </Paper>

                                    </Container>
                                </div>

                            );
                        })
                    }


                    <Grid container
                          spacing={4}
                          direction="row"
                          justify="flex-end"
                          alignItems="center"
                          style={{paddingTop: 80, paddingBottom:50, paddingLeft:80, paddingRight:80}}
                    >
                        <Grid>
                            Total <b>$ {totalPrice}</b>
                        </Grid>
                        <div>
                            <Link to="/checkout">
                                <button type="button" className="btn btn-success btn-block">
                                    Checkout
                                </button>
                            </Link>
                        </div>
                    </Grid>


                </div>
            </Container>
        );

    }
}
