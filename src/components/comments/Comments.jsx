import React, { useEffect, useState } from 'react'
import CommentList from './CommentList'
import CommentCard from './CommentCard'
import CommentForm from './CommentForm'
import commentService from "../../Appwrite/CommentService";
import { useSelector } from 'react-redux';
import { FaRegComment } from "react-icons/fa";

function Comments({postId}) {

    const [comments, setComments] = useState([]);

    const userData = useSelector(state => state.auth.userData);


    const fetchComments = async() => {
        try {
            const PostComments = await commentService.getComments(postId);
        
            if(PostComments) {
                setComments(PostComments?.documents || []);
            }
        
        }
        catch(error) {
            console.error("CommentCard : ",error);
        }
    }

    useEffect(() => {
        fetchComments();
    }, [postId])
    
    return (
    <div className='border-t-2 mt-4 pt-3'>
        <div className='text-3xl font-semiboldbold'>Comments</div>
        { userData && (
                <CommentForm
                    postId={postId}
                    userId={userData.$id}
                    userName={userData.name}
                    onCommentAdded={fetchComments}
                />
            )
        }
        
        <CommentList
            comments={comments}
            onRefresh={fetchComments}
        />
    </div>
    )
}


export default Comments