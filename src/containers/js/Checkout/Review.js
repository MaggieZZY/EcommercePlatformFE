import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles(theme => ({
    listItem: {
        padding: theme.spacing(1, 0),
    },
    total: {
        fontWeight: '700',
    },
    title: {
        marginTop: theme.spacing(2),
    },
}));

export default function Review(props) {

    const addresses = [props.info.address1, props.info.address2, props.info.city, props.info.state, props.info.zip];
    // const payments = [
    //     { name: 'Card type', detail: 'Credit Card/Debit Card'},
    //     { name: 'Card holder', detail: props.card.cardName },
    //     { name: 'Card number', detail: props.card.cardNumber },
    //     { name: 'Expiry date', detail: props.card.expDate },
    // ];
    const products = JSON.parse(localStorage.getItem("cartItems"));

    const classes = useStyles();
    let totalPrice = 0;

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Order summary
            </Typography>
            <List disablePadding>
                {
                    products && products.map((product,index) => {
                        totalPrice += product.price * product.count;
                        return(
                            <ListItem className={classes.listItem} key={index+product.name+product.id}>
                                <ListItemText primary={product.name} secondary={product.desc} />
                                <Typography variant="body2">{product.count} * $ {product.price}</Typography>
                            </ListItem>
                        )
                    })
                }
                <ListItem className={classes.listItem}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" className={classes.total}>
                        $ {totalPrice}
                    </Typography>
                </ListItem>
            </List>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom className={classes.title}>
                        Shipping
                    </Typography>
                    <Typography gutterBottom>{props.info.firstname} {props.info.lastname}</Typography>
                    <Typography gutterBottom>{addresses.join(', ')}</Typography>
                </Grid>
                {/*<Grid item container direction="column" xs={12} sm={6}>*/}
                {/*    <Typography variant="h6" gutterBottom className={classes.title}>*/}
                {/*        Payment details*/}
                {/*    </Typography>*/}
                {/*    <Grid container>*/}

                {/*        {payments.map(payment => (*/}
                {/*            <React.Fragment key={payment.name}>*/}
                {/*                <Grid item xs={6}>*/}
                {/*                    <Typography gutterBottom>{payment.name}</Typography>*/}
                {/*                </Grid>*/}
                {/*                <Grid item xs={6}>*/}
                {/*                    <Typography gutterBottom>{payment.detail}</Typography>*/}
                {/*                </Grid>*/}
                {/*            </React.Fragment>*/}
                {/*        ))}*/}
                {/*    </Grid>*/}
                {/*</Grid>*/}
            </Grid>
        </React.Fragment>
    );
}
