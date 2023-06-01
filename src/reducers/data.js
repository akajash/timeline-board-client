import {FETCH_ALL, CREATE, UPDATE, DELETE} from "../constants/actionTypes"


export default (data = [],action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload
        
        case CREATE:
            return [...data,action.payload]

        case UPDATE:
            return data.map((d) => d._id === action.payload._id ? action.payload : d)
                       

        case DELETE:
            return data.filter((d) => d._id !== action.payload)

        default:
            return data;
    }
}