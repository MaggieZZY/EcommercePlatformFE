import React from 'react';
import {connect} from "react-redux";
import {checkLogin} from "../../actions/auth.action";
import Header from "../../components/Header";


class App extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return (
            <React.Fragment>
                <Header {...this.props}/>
                <main>
                    {this.props.children}
                </main>
            </React.Fragment>
        );
    }

}

function mapStateToProps(appState){
    return {
        login_user: appState.login_user
    }
}

export default connect(mapStateToProps, {checkLogin})(App);
