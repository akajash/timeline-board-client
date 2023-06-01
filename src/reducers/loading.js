import {LOADING, VARIABLE} from "../constants/actionTypes"


export default (data=false,action) => {
    switch (action.type) {
        case LOADING:
            return action.payload

        case VARIABLE:
            return action.payload

        default:
            return data;
    }
}