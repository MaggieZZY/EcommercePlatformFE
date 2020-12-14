import {
    ADD_USER_DETAILS,
    GET_ALL_USER_DETAILS,
    GET_USER_DETAILS,
    UPDATE_USER_DETAILS
} from "../actions/userdetails.action";


export const userdetailsReducer = (state=null, action) => {
    switch(action.type){
        case GET_USER_DETAILS:
            return action.payload.data;
        case GET_ALL_USER_DETAILS:
            return action.payload.data;
        case UPDATE_USER_DETAILS:
            return action.payload.data.result;
        case ADD_USER_DETAILS:
            return action.payload.data;
        default:
            return state;
    }
}
