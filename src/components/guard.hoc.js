import React from "react";
import {connect} from "react-redux";
import {checkLogin} from "../actions/auth.action";

export default function(ExistingComponent) {
    class WrapperHOCComponent extends React.Component{
        constructor(props){
            super(props);
            this.state = {
                initialized: false
            };
        }

        componentDidMount() {
            !this.props.login_user && this.props.checkLogin();
        }

        static getDerivedStateFromProps(props, currentState){

            if(props.login_user === null && !currentState.initialized){
                return {
                    initialized: false
                }
            }
            else if (props.login_user.success === false){
                // redirect user away, similar router.navigate
                props.history.push('/login');
            }
            return currentState;

        }

        render(){
            return <ExistingComponent {...this.props} />
        }
    }

    function mapStateToProps(appState){
        return {
            login_user: appState.login_user
        }
    }


    return connect(mapStateToProps, {checkLogin})(WrapperHOCComponent)
}
