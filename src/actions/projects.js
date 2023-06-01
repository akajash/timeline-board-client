import * as api from '../api'
import {FETCH_ALL, CREATE, UPDATE, DELETE} from '../constants/actionTypes'



export const fetchProjects = (page) => async(dispatch) => {
    try{
        if(page == undefined) page = 1
        const {data} = await api.fetchProjects(page);
        dispatch({type: FETCH_ALL, payload: data.data})
        dispatch({type: 'SET_PAGE', payload : {totalPages: data.pages, page: data.page}})
    }catch(error){
        console.log(error)
    }
}

export const createProject = (project) => async(dispatch) => {
    try{
        const {data} = await api.createProject(project)
        dispatch({type: CREATE, payload: data})
    }catch(error){
        console.log(error)
    }
}

export const updateProject = (id,project) => async(dispatch) => {
    try{
        const {data} = await api.updateProject(id,project);
        dispatch({type: UPDATE, payload: data})
    }catch(error){
        console.log(error)
    }
}

export const deleteProject = (id) => async(dispatch) => {
    try{
        await api.deleteProject(id)

        dispatch({ type: DELETE, payload: id})
        
    } catch (error){
        console.log(error);
    }


}
