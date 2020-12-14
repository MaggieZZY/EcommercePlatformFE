import {CHECK_ACCOUNT_EXIST, CHECK_LOGIN, LOGIN, LOGOUT, SIGNUP} from "../actions/auth.action";

export const authReducer = (state=null, action) => {
    switch(action.type){
        case LOGIN:
            return action.payload.data;

        case LOGOUT:
            console.log('logout', action);
            return action.payload.data;

        case SIGNUP:
            console.log("action is", action);
            return action.payload.data;

        case CHECK_LOGIN:
            /*if(action.payload.data.success) {
                return action.payload.data.user;
            }
            else{
                return state;
            }*/
            return action.payload.data;

        case CHECK_ACCOUNT_EXIST:
            return action.payload.data;

        default:
            return state;
    }

}
