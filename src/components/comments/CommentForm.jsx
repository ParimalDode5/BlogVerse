import React, { useId, useState } from 'react'
import commentService from '../../Appwrite/CommentService';
import toast from 'react-hot-toast';

function CommentForm({postId, userId, userName, onCommentAdded}) {

    const [comment, setComment] = useState("");

    const handlerComment = async() => {
        if(!comment.trim()) {
            return;
        }
        
        try {
            const newComment = await commentService.createComment(postId, userId, userName, comment);

            if(newComment) {
                setComment("");
                toast.success("Comment added!");
                onCommentAdded();
            }
        }
        catch(error) {
            console.error("CommentForm :" ,error);
        }
    }

    return (
        <div className="flex gap-3 mb-6">
            {/* <label htmlFor="comment">Comment : </label> */}
            <textarea name="comment" id="comment" rows={3} 
                        placeholder='Write a Comment...'
                        value={comment} onChange={(e) => setComment(e.target.value)}
                        className="flex-1 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none">
            </textarea>

            {/* <input type="text" 
                    placeholder='Enter your Commment here'
                    value={comment} onChange={(e) => setComment(e.target.value)}
                    className='w-50'    
            /> */}
            
            <button onClick={handlerComment}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-xl transition"
                    >Post</button>
        
        </div>
    )
}

export default CommentForm