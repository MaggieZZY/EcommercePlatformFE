import React from 'react';
import '../../css/ProductDetail.css'
import Magnifier from "react-magnifier";
import {connect} from "react-redux";
import {getProductById} from "../../../actions/products.action";
import {getReviewsByProductId, sortReviews} from "../../../actions/review.action";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Rating from "@material-ui/lab/Rating";
import Avatar from "@material-ui/core/Avatar";
import {InputLabel} from "@material-ui/core";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";


class ProductDetail extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            total_general_score: 0,
            total_quality_score: 0,
            total_comfortness_score: 0,
            total_delivery_score: 0,
            total_count: 0,
            toSort: '',
            open: false
        }
    }

    handleClick = () => {
        this.setState({
            open: true,
        });
    };

    handleClose = () => {
        this.setState({
            open: false,
        });
    };


    componentDidMount() {

        const id = this.props.match.params.id;

        this.props.getProductById(
            id,
            () => {
                console.log('success');
                this.setState({
                    msg: 'get product detail successfully'
                })
            },
            () => {
                console.log('failure');
                this.setState({
                    msg: 'get product detail failed'
                })
            }
        )

        this.props.getReviewsByProductId(
            id,
            (res) => {
                res.data && res.data.map(review => {
                    this.setState({
                        total_general_score: this.state.total_general_score + review.generalRating,
                        total_quality_score: this.state.total_quality_score + review.quality,
                        total_comfortness_score: this.state.total_comfortness_score + review.comfortness,
                        total_delivery_score: this.state.total_delivery_score + review.delivery,
                        total_count: this.state.total_count + 1
                    })
                })

            },
            () => {}
        )

    }



    updateAddToCart = (event, product) => {
        let cartItems = JSON.parse(localStorage.getItem("cartItems"));
        if(cartItems === null){
            cartItems = [];
        }
        let productAlreadyInCart = false;
        console.log(cartItems);
        cartItems.forEach(item => {
            if(item.id === product.id){
                productAlreadyInCart = true;
                item.count++;
            }
        })
        if(!productAlreadyInCart){
            cartItems.push({...product,count: 1});
        }
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        this.handleClick(this.GrowTransition);
        this.setState({open: true});
    }


    updateToSort = (event) => {
        this.setState({
            toSort: event.target.value
        })
        this.props.sortReviews(this.props.reviews, event.target.value);
    }

    render(){
        const p = this.props.product;
        return p && (
                <Container style={{marginTop: 80, marginBottom: 80, marginLeft: 80, marginRight: 50}}>
                    <Grid container spacing={3}>

                        <Grid item xs={12} sm={6}>
                                <Magnifier src={p.image} width={500} height={400} />

                        </Grid>

                        <Grid item xs={12} sm={6}>

                            <p className="discount text-center" style={{display: p.discount===1 ? 'inherit' : 'none'}}>Sales</p>
                            <h2>{p.name}</h2>
                            <p>By {p.brand}</p>
                            <Grid item style={{display:"flex", flexDirection:"row"}}>
                                <Grid style={{display: this.props.reviews && this.props.reviews.length < 1 ? 'inherit' : 'none'}}>
                                    <Box component="fieldset" mb={3} borderColor="transparent">
                                        <Rating
                                            value={(this.state.total_general_score/this.state.total_count).toFixed(1)}
                                            readOnly
                                        />
                                    </Box>
                                    <h6 style={{marginLeft: 10}}>{this.state.total_count} customer reviews</h6>
                                </Grid>
                                <Grid style={{display: this.props.reviews && this.props.reviews.length >= 1 ? 'inherit' : 'none'}}>
                                    <Box component="fieldset" mb={3} borderColor="transparent">
                                        <Rating
                                            value={(this.state.total_general_score/this.state.total_count).toFixed(1)}
                                            readOnly
                                        />
                                    </Box>
                                    <h6 style={{marginLeft: 10}}>{this.state.total_count} customer reviews</h6>
                                </Grid>
                            </Grid>

                            <Grid item style={{display:"flex", flexDirection:"row"}}>
                                <p>Price:</p>
                                <Grid item style={{display: p.discount===0 ? 'inherit' : 'none'}}>
                                    <p style={{marginLeft: 10, color: '#3b69b3', fontSize: 30}}>$ {p.price}</p>
                                </Grid>
                                <Grid item style={{display:p.discount===1 ? 'inherit' : 'none', flexDirection:"row"}}>
                                    <p style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid', color:'#807d7d', fontSize: 20}}>$ {p.originalPrice}</p>
                                    <p style={{marginLeft: 10, color: '#3b69b3', fontSize: 30}}>now $ {p.price}</p>
                                </Grid>
                            </Grid>


                            <p>Material: {p.material}</p>


                            <Button
                                variant="contained"
                                color="primary"
                                endIcon={<AddShoppingCartIcon />}
                                onClick={event => {this.updateAddToCart(event, p); /*this.handleClick(event, this.GrowTransition)*/}}
                            >
                                Add to Cart
                            </Button>
                            <Snackbar
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={this.state.open}
                                onClose={this.handleClose}
                                ContentProps={{
                                    'aria-describedby': 'message-id',
                                }}
                                message={<span id="message-id">Add to Cart Successfully!</span>}
                            />
                            <AddShoppingCartIcon style={{marginLeft:10}}/>

                        </Grid>
                    </Grid>

                    <Grid container style={{marginTop: 100}}>
                        <Grid item>
                            <h4>Description</h4>
                        </Grid>
                        <Grid item style={{marginTop: 20, marginRight: 150}}>
                            <h6>{p.description}</h6>
                        </Grid>
                    </Grid>


                    <Grid container style={{marginTop: 100, marginBottom: 100}} direction="column">
                        <Grid item>
                            <h4>Customer Reviews</h4>
                        </Grid>

                        <Grid item style={{display: this.props.reviews && this.props.reviews.length < 1 ? 'inherit' : 'none'}}>
                            <h6>No customers has rate this product yet</h6>
                        </Grid>

                        <Grid item style={{display: this.props.reviews && this.props.reviews.length >= 1 ? 'inherit' : 'none'}} direction="column">

                            <Grid>
                                <h6>{this.state.total_count} customer ratings</h6>
                            </Grid>
                            <Grid container style={{display:"flex", flexDirection:"row", marginTop:20}}>
                                <Grid item xs={6} style={{display:"flex", flexDirection:"row"}}>
                                    <Box component="fieldset" mb={3} borderColor="transparent">
                                        <Rating
                                            value={(this.state.total_general_score/this.state.total_count).toFixed(1) }
                                            readOnly
                                        />
                                    </Box>
                                    <h6 style={{marginLeft: 10}}>{(this.state.total_general_score/this.state.total_count).toFixed(1)} out of 5</h6>
                                </Grid>

                                <Grid item xs={6}>
                                    <Grid style={{display:"flex", flexDirection:"row"}}>
                                        <h6>Quality: </h6>
                                        <Box component="fieldset" mb={3} borderColor="transparent">
                                            <Rating
                                                value={(this.state.total_quality_score/this.state.total_count).toFixed(1)}
                                                readOnly
                                            />
                                        </Box>
                                        <h6 style={{marginLeft: 10}}>{(this.state.total_quality_score/this.state.total_count).toFixed(1)}</h6>
                                    </Grid>

                                    <Grid style={{display:"flex", flexDirection:"row"}}>
                                        <h6>Comfortness: </h6>
                                        <Box component="fieldset" mb={3} borderColor="transparent">
                                            <Rating
                                                value={(this.state.total_comfortness_score/this.state.total_count).toFixed(1)}
                                                readOnly
                                            />
                                        </Box>
                                        <h6 style={{marginLeft: 10}}>{(this.state.total_comfortness_score/this.state.total_count).toFixed(1)}</h6>
                                    </Grid>

                                    <Grid style={{display:"flex", flexDirection:"row"}}>
                                        <h6>Delivery: </h6>
                                        <Box component="fieldset" mb={3} borderColor="transparent">
                                            <Rating
                                                value={(this.state.total_delivery_score/this.state.total_count).toFixed(1)}
                                                readOnly
                                            />
                                        </Box>
                                        <h6 style={{marginLeft: 10}}>{(this.state.total_delivery_score/this.state.total_count).toFixed(1)}</h6>
                                    </Grid>

                                </Grid>
                            </Grid>

                            <Grid>
                                <FormControl className="MuiFormControl" style={{margin: "5px"}}>
                                    <InputLabel htmlFor="age-customized-select">Sort by Rating</InputLabel>
                                    <Select value={this.state.toSort}
                                            onChange={this.updateToSort}
                                            input={<Input name="age" id="age-customized-select" />}
                                            style={{width:"200px"}}>
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value="lowest">
                                            Lowest to Highest
                                        </MenuItem>
                                        <MenuItem value="highest">
                                            Highest to Lowest
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Grid>
                        {
                            this.props.reviews && this.props.reviews.map((review, index) => {
                                return (
                                    <Grid key={index+review.generalComment+review.id} style={{marginTop: 80, marginBottom: 80}}>
                                        <Grid style={{display:"flex", flexDirection:"row"}}>
                                            <Avatar alt="Remy Sharp" src="https://eecs.ceas.uc.edu/DDEL/images/default_display_picture.png/@@images/image.png" style={{marginBottom: 10}} />
                                            <h6 style={{marginLeft: 10}}>{review.username}</h6>
                                        </Grid>
                                        <Grid style={{display:"flex", flexDirection:"row"}}>
                                            <Box component="fieldset" mb={3} borderColor="transparent">
                                                <Rating
                                                    value={review.generalRating}
                                                    readOnly
                                                />
                                            </Box>
                                            <h6 style={{marginLeft: 10}}>{review.summary}</h6>
                                        </Grid>
                                        <h6>
                                            {review.reviewDate.substring(0,10)}
                                        </h6>

                                        <Grid item style={{marginRight: 150}}>
                                            {review.generalComment}
                                        </Grid>
                                    </Grid>

                                )
                            })
                        }
                        </Grid>
                    </Grid>

                </Container>

        );
    }
}


function mapStateToProps(appState){
    return {
        product: appState.products,
        reviews: appState.reviews
    }
}


export default connect(mapStateToProps, {getProductById, getReviewsByProductId, sortReviews})(ProductDetail);
