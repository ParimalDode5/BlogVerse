import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "../Button";
import commentService from "../../Appwrite/CommentService";
import toast from "react-hot-toast";
import { formatDistanceToNow } from "date-fns";

function CommentCard({ comment, onRefresh }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedComment, setEditedComment] = useState(comment.comment);
    const [processing, setProcessing] = useState(false);

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor =
        comment && userData
            ? comment.userId === userData.$id
            : false;

    const saveComment = async () => {
        if (!editedComment.trim()) return;

        setProcessing(true);

        try {
            await commentService.updateComment(
                comment.$id,
                editedComment
            );
            toast.success("Comment updated!");
            setIsEditing(false);

            onRefresh();
        } catch (error) {
            console.error("Edit Comment:", error);
        } finally {
            setProcessing(false);
        }
    };

    const deleteComment = async () => {
        const confirmDelete = window.confirm(
            "Delete this comment?"
        );

        if (!confirmDelete) return;

        setProcessing(true);

        try {
            await commentService.deleteComment(comment.$id);
            toast.success("Comment deleted!");

            onRefresh();
        } catch (error) {
            console.error("Delete Comment:", error);
        } finally {
            setProcessing(false);
        }
    };

    const cancelEdit = () => {
        setEditedComment(comment.comment);
        setIsEditing(false);
    };

    return (
        <div className="bg-gray-50 rounded-xl shadow-md border border-gray-200 p-4 mb-4 hover:shadow-lg transition-all">

            {/* Header */}
            <div className="flex justify-between items-start">

                <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                        {comment.userName.charAt(0).toUpperCase()}
                    </div>

                    <div>
                        <h3 className="font-semibold">
                            {comment.userName}
                        </h3>

                        <p className="text-xs text-gray-500">
                            {formatDistanceToNow(
                                new Date(comment.$createdAt),
                                { addSuffix: true }
                            )}
                        </p>
                    </div>

                </div>

                {isAuthor && !isEditing && (
                    <div className="flex gap-2">

                        <Button
                            bgColor="bg-green-500"
                            onClick={() => setIsEditing(true)}
                        >
                            Edit
                        </Button>

                        <Button
                            bgColor="bg-red-500"
                            onClick={deleteComment}
                        >
                            Delete
                        </Button>

                    </div>
                )}

            </div>

            {/* Body */}

            {!isEditing ? (
                <p className="mt-4 text-gray-700 leading-relaxed">
                    {comment.comment}
                </p>
            ) : (
                <div className="mt-4">

                    <textarea
                        rows={3}
                        value={editedComment}
                        onChange={(e) =>
                            setEditedComment(e.target.value)
                        }
                        className="w-full border rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <div className="flex gap-2 mt-3">

                        <Button
                            bgColor="bg-blue-600"
                            onClick={saveComment}
                            disabled={processing}
                        >
                            Save
                        </Button>

                        <Button
                            bgColor="bg-gray-500"
                            onClick={cancelEdit}
                            disabled={processing}
                        >
                            Cancel
                        </Button>

                    </div>

                </div>
            )}

        </div>
    );
}

export default CommentCard;