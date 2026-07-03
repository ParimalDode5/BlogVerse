import React, { useEffect, useState } from 'react'
import commentService from '../../Appwrite/CommentService'
import CommentCard from './CommentCard';

function CommentList({ comments, onRefresh }) {
    return (
        <div>
            {comments.length > 0 ? (
                comments.map((comment) => (
                    <CommentCard
                        key={comment.$id}
                        comment={comment}
                        onRefresh={onRefresh}
                    />
                ))
            ) : (
                <div className="text-2xl font-semibold text-center py-5">
                    No Comments Yet
                </div>
            )}
        </div>
    );
}

export default CommentList