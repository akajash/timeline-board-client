import * as api from '../api'
import {FETCH_ALL, CREATE, UPDATE, DELETE} from '../constants/actionTypes'



export const fetchAssets = (page) => async(dispatch) => {
    try{
        const {data} = await api.fetchAssets(page);
        dispatch({type: FETCH_ALL, payload: data.data})
        dispatch({type: 'SET_PAGE', payload : {totalPages: data.pages, page: data.page}})
    }catch(error){
        console.log(error)
    }
}

export const createAsset = (asset) => async(dispatch) => {
    try{
        const {data} = await api.createAsset(asset)
        dispatch({type: CREATE, payload: data})
    }catch(error){
        console.log(error)
    }
}

export const updateAsset = (id,asset) => async(dispatch) => {
    try{
        const {data} = await api.updateAsset(id,asset);
        dispatch({type: UPDATE, payload: data})
    }catch(error){
        console.log(error)
    }
}

export const deleteAsset = (id) => async(dispatch) => {
    try{
        await api.deleteAsset(id)

        dispatch({ type: DELETE, payload: id})
        
    } catch (error){
        console.log(error);
    }


}
