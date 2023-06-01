import React from 'react';
import moment from 'moment';
import {useDispatch} from 'react-redux'
import {deletePost,likePost} from '../../../actions/posts'




const Post = ({ post ,setCurrentId}) => {

    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('profile'))

    const Likes = () => {
        if(post.likes.length > 0){
            return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
            ? (
                <>{post.likes.length > 2 ? `You and ${post.likes.length} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}
                </>
            )
            : (
                <>{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}
                </>
            )
        }

        return <>&nbsp; Like</>
    }

    return(
        <div>
            <img src={post.selectedFile}/>
            <h3>{post.title}</h3>
            <p>{post.name}</p>
            <p>{moment(post.createdAt).fromNow()}</p>
            {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator && (
            <button onClick={() => setCurrentId(post._id)}>Update</button>
            ))}
            {/* <div>
                <h5>{post.tags.map((tag) => { `#${tag}`})}</h5>
            </div> */}
            <p>{post.message}</p>
            <button disabled={!user?.result?._id} onClick={() => dispatch(likePost(post._id))}><Likes/></button>
            {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator && (
                <button onClick={() => dispatch(deletePost(post._id))}>Delete</button>
            ))}
            

        </div>
    )
}

export default Post