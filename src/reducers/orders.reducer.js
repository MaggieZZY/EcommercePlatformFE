import {
    ADD_ORDER,
    CANCEL_ORDER,
    GET_ALL_ORDERS,
    GET_ORDER_BY_ID,
    GET_ORDERS_BY_USER_ID, SORT_ORDERS,
    UPDATE_DELIVERY_STATUS_TO_1,
    UPDATE_DELIVERY_STATUS_TO_2,
} from "../actions/orders.action";


export const orderReducer = (state=null, action) => {
    switch(action.type){
        case ADD_ORDER:
            return action.payload.data;
        case GET_ORDERS_BY_USER_ID:
            return action.payload.data;
        case GET_ORDER_BY_ID:
            return action.payload.data;
        case GET_ALL_ORDERS:
            return action.payload.data;
        case UPDATE_DELIVERY_STATUS_TO_1:
            return state ? state.map(order => {
                return order.id === action.payload.data.result.id ? action.payload.data.result : order
            }) : null;
        case UPDATE_DELIVERY_STATUS_TO_2:
            return action.payload.data.result;
        case CANCEL_ORDER:
            return state ? state.filter(order => {
                return order.id !== action.payload.data.result;
            }) : null;
        case SORT_ORDERS:
            return action.payload;
        default:
            return state;
    }
}
