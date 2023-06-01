import {FETCH_ALL, CREATE, UPDATE, DELETE} from "../constants/actionTypes"


export default (workforce = [],action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload
        
        case CREATE:
            return [...workforce,action.payload]


        case UPDATE:
            return workforce.map((employee) => employee._id === action.payload._id ? action.payload : employee)
                       

        case DELETE:
            return workforce.filter((employee) => employee._id !== action.payload)

        default:
            return workforce;
    }
}