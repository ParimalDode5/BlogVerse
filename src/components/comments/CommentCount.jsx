import React, { useEffect, useState } from 'react'
import commentService from '../../Appwrite/CommentService';
import { FaRegComment } from "react-icons/fa";


function CommentCount({postId}) {

    const [count, setCount] = useState([]);

    const CountComment = async() => {
        try {
            const response = await commentService.getComments(postId);

            if(response) {
                setCount(response.documents)
            }

        }
        catch(error) {
            console.error("Comment Count : ",error);
        }
    }

    useEffect(() => {
        CountComment();

    }, [postId])


    return (

        <div className='font-bold flex items-center justify-center'>
            <FaRegComment />
            {count.length > 0 ? (
                <span className='ml-1'>{count.length}</span>
            ) : (
                <span className='ml-1'>0</span>
            )}
        </div>
    )
}


export default CommentCount