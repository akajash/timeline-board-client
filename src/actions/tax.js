import * as api from '../api'
import {FETCH_ALL, CREATE, UPDATE, DELETE} from '../constants/actionTypes'



export const fetchTax = (page) => async(dispatch) => {
    try{
        const {data} = await api.fetchTax(page);
        dispatch({type: FETCH_ALL, payload: data.data})
        dispatch({type: 'SET_PAGE', payload : {totalPages: data.pages, page: data.page}})
    }catch(error){
        console.log(error)
    }
}

export const createTax = (ref) => async(dispatch) => {
    try{
        const {data} = await api.createTax(ref)
        dispatch({type: CREATE, payload: data})
    }catch(error){
        console.log(error)
    }
}

export const updateTax = (id,ref) => async(dispatch) => {
    try{
        const {data} = await api.updateTax(id,ref);
        dispatch({type: UPDATE, payload: data})
    }catch(error){
        console.log(error)
    }
}

export const deleteTax = (id) => async(dispatch) => {
    try{
        await api.deleteTax(id)

        dispatch({ type: DELETE, payload: id})
        
    } catch (error){
        console.log(error);
    }


}
