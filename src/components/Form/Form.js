import React,{useState, useEffect} from 'react'
import FileBase from 'react-file-base64'

import {useDispatch, useSelector} from 'react-redux'

import {createPost, updatePost} from '../../actions/posts'

const Form = ({currentId,setCurrentId}) => {

    const user = JSON.parse(localStorage.getItem('profile'));
    const [postData, setPostData] = useState({
        
        title: '',
        message: '',
        tags: '',
        selectedFiles: '',
    })

    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);

    const dispatch = useDispatch()

    useEffect(() => {
        if(post) setPostData(post);
    },[post])

    const handleSubmit = (e) => {
        e.preventDefault();

        if(currentId){
            dispatch(updatePost(currentId,{...postData, name: user?.result?.name}))

        }
        else{
            dispatch(createPost({...postData, name: user?.result?.name}))
        }
        clear()
    }

    const clear = () => {
        setCurrentId(0);
        setPostData({title: '', message:'',tags: '', selectedFile: ''})
    }

    if(!user?.result?._id){
        return(
            <div>
                <h3>Please sign in to crate your own memory</h3>
            </div>
        )
    }

    return(
    <div>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <h4> Create a Post</h4>
            

            <input type="text"
             name="title" 
             label="title"
             value = {postData.title}
             onChange={(e) => setPostData({...postData, title: e.target.value})} />

            <input type="text"
             name="message" 
             label="message"
             value = {postData.message}
             onChange={(e) => setPostData({...postData, message: e.target.value})} />

            <input type="text"
             name="tags" 
             label="tags"
             value = {postData.tags}
             onChange={(e) => setPostData({...postData, tags: e.target.value})} />

            <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />

            <button type="submit">Post</button>
            <button type="button" onClick={clear}>Clear</button>
        </form>
    </div>
    )
}

export default Form