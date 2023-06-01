import {FETCH_ALL, CREATE, UPDATE, DELETE} from "../constants/actionTypes"


export default (designation = [],action) => {
    switch (action.type) {
        case FETCH_ALL:
            console.log(action.payload)
            return action.payload
        
        case CREATE:
            return [...designation,action.payload]


        case UPDATE:
            return designation.map((des) => des._id === action.payload._id ? action.payload : des)
                       

        case DELETE:
            return designation.filter((des) => des._id !== action.payload)

        default:
            return designation;
    }
}