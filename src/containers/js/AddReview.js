import React from 'react';
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Rating from "@material-ui/lab/Rating";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {addReview} from "../../actions/review.action";

class AddReview extends React.Component {

    constructor(props){
        super(props);
        const date = new Date().toISOString();

        this.state = {
            reviewDate: date,
            generalRating: 0,
            quality: 0,
            comfortness: 0,
            delivery: 0,
            summary: '',
            generalComment: '',
            userId: '',
            username: '',
            productId: ''
        }
    }

    static getDerivedStateFromProps(props, currentState){
        if(props.login_user && props.login_user.user){
            return {
                userId: props.login_user.user.id,
                username: props.login_user.user.username,
                productId: props.match.params.productId,
            }
        }
    }


    updateRating = (event, newValue) => {
        this.setState({
            [event.target.name]: newValue
        })
    }

    updateComment = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    submitReview = (event) => {
        console.log("state is", this.state);
        event.preventDefault();
        this.props.addReview(
            this.state,
            () => {
                window.location.href = "/vieworders"
            },
            () => {}
        )
    }


    render(){
        return(
            <Container component="main" maxWidth="xs" style={{marginTop: 80, marginBottom: 80, display:'flex', justifyContent:'center'}}>
                <Card width={600}>

                    <Box component="fieldset" mb={3} borderColor="transparent" style={{marginTop: 50, marginBottom:30, marginLeft:50, marginRight:50}}>
                        <Typography component="legend">General Rating</Typography>
                        <Rating
                            id="generalRating"
                            name="generalRating"
                            value={this.state.generalRating}
                            precision={1}
                            icon={<FavoriteIcon color="#ff6d75" fontSize="inherit" />}
                            onChange={(event, newValue) => this.updateRating(event, newValue)}
                        />
                    </Box>

                    <Box component="fieldset" mb={3} borderColor="transparent" style={{marginTop: 30, marginBottom:50, marginLeft:50, marginRight:50}}>
                        <Typography component="legend">Quality</Typography>
                        <Rating
                            id="quality"
                            name="quality"
                            value={this.state.quality}
                            precision={1}
                            emptyIcon={<StarBorderIcon fontSize="inherit" />}
                            onChange={(event, newValue) => this.updateRating(event, newValue)}
                        />
                    </Box>

                    <Box component="fieldset" mb={3} borderColor="transparent" style={{marginTop: 30, marginBottom:50, marginLeft:50, marginRight:50}}>
                        <Typography component="legend">Comfortness</Typography>
                        <Rating
                            id="comfortness"
                            name="comfortness"
                            value={this.state.comfortness}
                            onChange={(event, newValue) => this.updateRating(event, newValue)}
                        />
                    </Box>

                    <Box component="fieldset" mb={3} borderColor="transparent" style={{marginTop: 30, marginBottom:50, marginLeft:50, marginRight:50}}>
                        <Typography component="legend">Delivery</Typography>
                        <Rating
                            id="delivery"
                            name="delivery"
                            value={this.state.delivery}
                            onChange={(event, newValue) => this.updateRating(event, newValue)}
                        />
                    </Box>

                    <TextField
                        id="summary"
                        label="Summary"
                        style={{marginTop: 10, marginBottom: 30, marginLeft: 50, marginRight: 50}}
                        placeholder="Placeholder"
                        helperText="Full width!"
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(event) => this.updateComment(event)}
                    />

                    <TextField
                        id="generalComment"
                        label="General Comment"
                        multiline
                        rows="4"
                        defaultValue="Comment"
                        style={{marginTop: 10, marginBottom: 30, marginLeft: 50, marginRight: 50}}
                        margin="normal"
                        variant="outlined"
                        value={this.state.generalComment}
                        onChange={(event) => this.updateComment(event)}
                    />

                    <Link to="/vieworders">
                        {/* eslint-disable-next-line react/jsx-no-undef */}
                        <Button
                            variant="contained"
                            color="primary"
                            style={{margin:"3px"}}
                            onClick={this.submitReview}
                        >
                            Submit Review
                        </Button>
                    </Link>

                </Card>

            </Container>
        )

    }

}

function mapStateToProps(appState){
    return {
        login_user: appState.login_user
    }
}

export default connect(mapStateToProps, {addReview})(AddReview);

