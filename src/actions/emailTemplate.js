import * as api from '../api'
import {FETCH_ALL, CREATE, UPDATE, DELETE} from '../constants/actionTypes'



export const fetchTemplate = (page) => async(dispatch) => {
    try{
        const {data} = await api.fetchTemplate(page);
        dispatch({type: FETCH_ALL, payload: data.data})
        dispatch({type: 'SET_PAGE', payload : {totalPages: data.pages, page: data.page}})
    }catch(error){
        console.log(error)
    }
}

export const createTemplate = (template) => async(dispatch) => {
    try{
        const {data} = await api.createTemplate(template)
        dispatch({type: CREATE, payload: data})
    }catch(error){
        console.log(error)
    }
}

export const updateTemplate = (id,template) => async(dispatch) => {
    try{
        const {data} = await api.updateTemplate(id,template);
        dispatch({type: UPDATE, payload: data})
    }catch(error){
        console.log(error)
    }
}

export const deleteTemplate = (id) => async(dispatch) => {
    try{
        await api.deleteTemplate(id)

        dispatch({ type: DELETE, payload: id})
        
    } catch (error){
        console.log(error);
    }


}
