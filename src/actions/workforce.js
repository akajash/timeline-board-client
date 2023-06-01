import * as api from '../api'
import {FETCH_ALL, CREATE, UPDATE, DELETE} from '../constants/actionTypes'

export const fetchWorkforce = (page) => async(dispatch) => {
    try{
        if(page == undefined) page = 1
        const {data} = await api.fetchWorkforce(page);
        dispatch({type: FETCH_ALL, payload: data.data})
        dispatch({type: 'SET_PAGE', payload : {totalPages: data.pages, page: data.page}})
    }catch(error){
        console.log(error)
    }
}


export const createWorkforce = (workforce) => async(dispatch) => {
    try{
        const {data} = await api.createWorkforce(workforce)
        dispatch({type: CREATE, payload: data})
    }catch(error){
        console.log(error)
    }
}

export const updateWorkforce = (id,workforce) => async(dispatch) => {
    try{
        const {data} = await api.updateWorkforce(id,workforce);
        console.log(data)
        dispatch({type: UPDATE, payload: data})
    }catch(error){
        console.log(error)
    }
}

export const deleteWorkforce = (id) => async(dispatch) => {
    try{
        await api.deleteWorkforce(id)

        dispatch({ type: DELETE, payload: id})
        
    } catch (error){
        console.log(error);
    }


}
