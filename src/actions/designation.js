import * as api from '../api'
import {FETCH_ALL, CREATE, UPDATE, DELETE} from '../constants/actionTypes'



export const fetchDesignation = (page) => async(dispatch) => {
    try{
        const {data} = await api.fetchDesignation(page);
        dispatch({type: FETCH_ALL, payload: data.data})
        dispatch({type: 'SET_PAGE', payload : {totalPages: data.pages, page: data.page}})
    }catch(error){
        console.log(error)
    }
}

export const createDesignation = (designation) => async(dispatch) => {
    try{
        const {data} = await api.createDesignation(designation)
        dispatch({type: CREATE, payload: data})
    }catch(error){
        console.log(error)
    }
}

export const updateDesignation = (id,designation) => async(dispatch) => {
    try{
        const {data} = await api.updateDesignation(id,designation);
        dispatch({type: UPDATE, payload: data})
    }catch(error){
        console.log(error)
    }
}

export const deleteDesignation = (id) => async(dispatch) => {
    try{
        await api.deleteDesignation(id)

        dispatch({ type: DELETE, payload: id})
        
    } catch (error){
        console.log(error);
    }


}
