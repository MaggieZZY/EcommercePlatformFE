import React from 'react';
import {connect} from "react-redux";
import MenuItem from "@material-ui/core/MenuItem";
import {Link} from "react-router-dom";
import {checkLogin} from "../../actions/auth.action";
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

class IsAdmin extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        !this.props.login_user && this.props.checkLogin();
    }


    render(){
        return this.props.login_user && this.props.login_user.user && this.props.login_user.user.profiles.some(role => role.type==="ROLE_ADMIN") ? (
            <Link to="/manageorders">
                <StyledMenuItem>
                    <ListItemIcon>
                        <SupervisorAccountIcon fontSize="small" />
                    </ListItemIcon>
                <ListItemText primary="Manage Orders" />
                </StyledMenuItem>
            </Link>

        ): null ;
    }
}


function mapStateToProps(appState){
    return {
        login_user: appState.login_user
    }

}


export default connect(mapStateToProps, {checkLogin})(IsAdmin);
