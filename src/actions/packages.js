import * as api from '../api'
import {FETCH_ALL, CREATE, UPDATE, DELETE} from '../constants/actionTypes'



export const fetchPackages = (page) => async(dispatch) => {
    try{
        const {data} = await api.fetchPackages(page);
        dispatch({type: FETCH_ALL, payload: data.data})
        dispatch({type: 'SET_PAGE', payload : {totalPages: data.pages, page: data.page}})
    }catch(error){
        console.log(error)
    }
}

// export const fetchAllPackages = () => async(dispatch) => {
//     try{
//         const {data} = await api.fetchAllPackages();
//         dispatch({type: FETCH_ALL, payload: data.data})
//     }catch(error){
//         console.log(error)
//     }
// }

export const createPackage = (payload) => async(dispatch) => {
    try{
        const {data} = await api.createPackage(payload)
        dispatch({type: CREATE, payload: data})
    }catch(error){
        console.log(error)
    }
}

export const updatePackage = (id,payload) => async(dispatch) => {
    try{
        const {data} = await api.updatePackage(id,payload);
        dispatch({type: UPDATE, payload: data})
    }catch(error){
        console.log(error)
    }
}

export const deletePackage = (id) => async(dispatch) => {
    try{
        await api.deletePackage(id)

        dispatch({ type: DELETE, payload: id})
        
    } catch (error){
        console.log(error);
    }


}
