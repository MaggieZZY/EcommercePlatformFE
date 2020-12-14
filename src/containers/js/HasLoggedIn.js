import React from 'react';
import {connect} from "react-redux";
import MenuItem from "@material-ui/core/MenuItem";
import {Link} from "react-router-dom";
import {checkLogin, logout} from "../../actions/auth.action";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import withStyles from "@material-ui/core/styles/withStyles";
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';


const StyledMenuItem = withStyles(theme => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

class HasLoggedIn extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        !this.props.login_user && this.props.checkLogin();
    }

    toLogout = (event) => {
        logout(()=>{}, ()=>{});
        window.location.href = "/login";
    }


    render(){
        return this.props.login_user && this.props.login_user.user ? (
            <Link onClick={event => this.toLogout(event)} to="/login">
                <StyledMenuItem>
                    <ListItemIcon>
                        <SupervisorAccountIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </StyledMenuItem>
            </Link>

        ):
            <Link to="/login">
                <StyledMenuItem>
                    <ListItemIcon>
                        <SupervisorAccountIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Login" />
                </StyledMenuItem>
            </Link>;

    }
}


function mapStateToProps(appState){
    return {
        login_user: appState.login_user
    }

}


export default connect(mapStateToProps, {checkLogin, logout})(HasLoggedIn);
