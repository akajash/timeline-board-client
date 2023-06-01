import * as api from '../api'
import {FETCH_ALL, CREATE, UPDATE, DELETE} from '../constants/actionTypes'



export const fetchWorkflows = (page) => async(dispatch) => {
    try{
        if(page == undefined) page = 1
        const {data} = await api.fetchWorkflow(page);
        dispatch({type: FETCH_ALL, payload: data.data})
        dispatch({type: 'SET_PAGE', payload : {totalPages: data.pages, page: data.page}})
    }catch(error){
        console.log(error)
    }
}

export const createWorkflow = (workflow) => async(dispatch) => {
    try{
        const {data} = await api.createWorkflow(workflow)
        dispatch({type: CREATE, payload: data})
    }catch(error){
        console.log(error)
    }
}

export const updateWorkflow = (id,workflow) => async(dispatch) => {
    try{
        const {data} = await api.updateWorkflow(id,workflow);
        dispatch({type: UPDATE, payload: data})
    }catch(error){
        console.log(error)
    }
}

export const deleteWorkflow = (id) => async(dispatch) => {
    try{
        await api.deleteWorkflow(id)

        dispatch({ type: DELETE, payload: id})
        
    } catch (error){
        console.log(error);
    }


}
