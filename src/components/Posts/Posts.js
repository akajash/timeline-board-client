import React from 'react'

import Post from './Post/Post'
import {useSelector} from 'react-redux'

const Posts = ({setCurrentId}) => {

    const posts = useSelector((state) => state.posts)
    
    return(
        !posts.length ? "Progress" : (
            <div>
                {posts.map((post) => (
                    <div key={post._id}>
                        <Post post = {post} setCurrentId = {setCurrentId} />
                    </div>
                ))}
            </div>
        )
    )
}

export default Posts