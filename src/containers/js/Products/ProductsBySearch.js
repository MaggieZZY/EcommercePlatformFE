import React from 'react';
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import {Link} from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import { InputLabel } from '@material-ui/core';
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import {getAllProducts, sortProducts} from "../../../actions/products.action";
import Snackbar from "@material-ui/core/Snackbar";


class ProductsBySearch extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            products: '',
            search: '',
            material: '',
            toSort: '',
            minPrice: '',
            maxPrice: '',
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

        this.props.getAllProducts(
            () => {
                this.setState({
                    msg: 'get products successfully'
                })
            },
            () => {
                this.setState({
                    msg: 'get products failed'
                })
            }
        )
    }


    updateSearch = (event) => {
        this.setState({
            search: event.target.value
        })
    }

    updateMaterial = (event) => {
        this.setState({
            material: event.target.value
        })
    }

    updateMinPrice = (event) => {
        this.setState({
            minPrice: event.target.value
        })
    }

    updateMaxPrice = (event) => {
        this.setState({
            maxPrice: event.target.value
        })
    }

    updateToSort = (event) => {
        this.setState({
            toSort: event.target.value
        })
        this.props.sortProducts(this.props.products, event.target.value)
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


    render(){

        const background = "https://images.unsplash.com/photo-1491926626787-62db157af940?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60";
        const materials = [];
        return(
            <Container>
                <section className="jumbotron text-center" style={{backgroundImage: `url(${background})`, backgroundSize: "cover"}}>
                    <div className="container">
                        <h1 className="jumbotron-heading">Find Our Best Deals</h1>
                        <p className="lead text-muted">Up to 60% Sales Modern Furniture</p>
                        <Link to="/products/sales">
                            Check for Sales and Clearance
                        </Link>
                    </div>
                </section>

                <div>

                    <Container className="MuiContainer" maxWidth="md" style={{margin: 50}}>
                        <Grid justify="center" container>
                            <form autoComplete="off" style={{margin: 50}}>
                                <FormControl className="MuiFormControl" style={{margin: "5px"}}>
                                    <InputLabel>Product Name</InputLabel>
                                    <Input value={this.state.search}
                                           onChange={this.updateSearch}/>
                                </FormControl>

                                <FormControl className="MuiFormControl" style={{margin: "5px"}}>
                                    <InputLabel htmlFor="age-customized-select">Material</InputLabel>
                                    <Select value={this.state.material}
                                            onChange={this.updateMaterial}
                                            input={<Input name="age" id="age-customized-select" />}
                                            style={{width:"200px"}}>
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>

                                        {

                                            this.props.products && Array.isArray(this.props.products) && this.props.products.map((p,index) => {
                                                if(!(materials.includes(p.material))){
                                                    materials.push(p.material);
                                                    return(
                                                        <MenuItem key={p.material+index} value={p.material}>{p.material}</MenuItem>
                                                    )
                                                }
                                            })
                                        }
                                    </Select>
                                </FormControl>


                                <FormControl className="MuiFormControl" style={{margin: "5px"}}>
                                    <InputLabel htmlFor="age-customized-select">Sort by Price</InputLabel>
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


                                <FormControl className="MuiFormControl">
                                    <InputLabel>Price Range</InputLabel>
                                    <Input value={this.state.minPrice}
                                           onChange={this.updateMinPrice}/>
                                    <Input value={this.state.maxPrice}
                                           onChange={this.updateMaxPrice}/>
                                </FormControl>

                            </form>

                        </Grid>
                    </Container>

                </div>

                <main role="main">

                    <div className="root">

                        <Container className="MuiContainer" maxWidth="md">
                            <Grid container spacing={4}>

                                {
                                    this.props.products && Array.isArray(this.props.products) && this.props.products.map((p, index) => {

                                        if(this.props.match.params.search !== "" && p.name.indexOf(this.props.match.params.search) === -1){
                                            return null;
                                        }

                                        const {search, material, sort, minPrice, maxPrice} = this.state;
                                        if(this.state.search !== "" && p.name.indexOf(search) === -1){
                                            return null;
                                        }
                                        if(this.state.material !== "" && p.material.indexOf(material) === -1){
                                            return null;
                                        }
                                        if(this.state.minPrice !== "" && p.price < minPrice){
                                            return null;
                                        }
                                        if(this.state.maxPrice !== "" && p.price > maxPrice){
                                            return null;
                                        }


                                        return(
                                            <Grid item key={index+p.name} xs={12} sm={6} md={6}>
                                                <Card className="card">
                                                    <Link to={`/products/id/${p.id}`}>
                                                        <CardMedia
                                                            component="img"
                                                            className="MuiCardMedia"
                                                            height="300px"
                                                            image={p.image}
                                                            title={p.name}
                                                        />
                                                    </Link>
                                                    <CardContent className="MuiCardContent">
                                                        <Typography gutterBottom variant="h5" component="h2">
                                                            {p.name}
                                                        </Typography>
                                                        <Typography style={{display: p.discount===0 ? 'inherit' : 'none'}}>
                                                            $ {p.price}
                                                        </Typography>
                                                        <Typography style={{display: p.discount===1 ? 'inherit' : 'none'}}>
                                                            <Grid style={{display:"flex", flexDirection:"row"}}>
                                                                <p style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid', color:'#807d7d'}}>$ {p.originalPrice}</p>
                                                                <p style={{marginLeft: 10, color: '#3b69b3'}}>now $ {p.price}</p>
                                                            </Grid>
                                                        </Typography>
                                                    </CardContent>
                                                    <CardActions>
                                                        <Button size="small" color="primary">
                                                            <Link to={`/products/id/${p.id}`}>View</Link>
                                                        </Button>
                                                        <Button size="small" color="primary" onClick={event => this.updateAddToCart(event, p)}>
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
                                                    </CardActions>
                                                </Card>

                                            </Grid>
                                        );
                                    })

                                }

                            </Grid>
                        </Container>

                    </div>

                </main>

            </Container>

        );
    }
}

function mapStateToProps(appState){
    return {
        products: appState.products
        // products in render; products in redux store
    }
}


export default connect(mapStateToProps, {getAllProducts, sortProducts})(ProductsBySearch);
