import * as api from '../api'
import {FETCH_ALL, CREATE, UPDATE, DELETE} from '../constants/actionTypes'



export const fetchReferences = (page) => async(dispatch) => {
    try{
        const {data} = await api.fetchReferences(page);
        dispatch({type: FETCH_ALL, payload: data.data})
        dispatch({type: 'SET_PAGE', payload : {totalPages: data.pages, page: data.page}})
    }catch(error){
        console.log(error)
    }
}

export const createReference = (ref) => async(dispatch) => {
    try{
        const {data} = await api.createReference(ref)
        dispatch({type: CREATE, payload: data})
    }catch(error){
        console.log(error)
    }
}

export const updateReference = (id,ref) => async(dispatch) => {
    try{
        const {data} = await api.updateReference(id,ref);
        dispatch({type: UPDATE, payload: data})
    }catch(error){
        console.log(error)
    }
}

export const deleteReference = (id) => async(dispatch) => {
    try{
        await api.deleteReference(id)

        dispatch({ type: DELETE, payload: id})
        
    } catch (error){
        console.log(error);
    }


}
