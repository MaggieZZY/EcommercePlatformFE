import {UPDATE_REVIEW_STATUS} from "../actions/orderproducts.action";

export const orderProductReducer = (state=null, action) => {
    switch(action.type){
        case UPDATE_REVIEW_STATUS:
            return action.payload.data;
        default:
            return state
    }
}
