import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import likeService from "../../Appwrite/likeService";
import { FaHeart } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


function LikeButton({ postId }) {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [likeDocument, setLikeDocument] = useState(null);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);

    const userData = useSelector((state) => state.auth.userData);

    const fetchLikeData = async () => {
        try {
                const [count, likedDoc] = await Promise.all([
                    likeService.getLikeCount(postId),
                    likeService.hasUserLiked(postId, userData.$id),
                ]);

                setLikeCount(count);

                if (likedDoc) {
                    setLiked(true);
                    setLikeDocument(likedDoc);
                } else {
                    setLiked(false);
                    setLikeDocument(null);
                }
            } catch (error) {
                console.error("LikeButton:", error);
            } finally {
                setLoading(false);
        }
    };

    const toggleLike = async () => {
        if (processing) return;

        setProcessing(true);

        try {
            if (liked) {
                await likeService.unlikePost(likeDocument.$id);

                setLiked(false);
                setLikeDocument(null);
                setLikeCount((prev) => prev - 1);
            } else {
                const newLike = await likeService.likePost(postId, userData.$id);

                setLiked(true);
                setLikeDocument(newLike);
                setLikeCount((prev) => prev + 1);
            }
        } catch (error) {
            console.error("LikeButton:", error);
            // Later you can show a toast here.
        } finally {
            setProcessing(false);
        }
    };
    

    useEffect(() => {
        if (!userData) {
            setLoading(false);
            return;
        }

        fetchLikeData();
    }, [postId, userData?.$id]);


    if (loading) {
        return (
            <div className="flex items-center gap-2">
                <Skeleton circle width={16} height={15} />
                <Skeleton width={10} height={24} />
            </div>
        );
    }

    return (
        <button onClick={toggleLike} className='font-bold flex justify-center items-center gap-1.5'>
            {liked ? <FaHeart color="red"/> : <FaHeart color="gray" />} {likeCount}
        </button>
    );
}

export default LikeButton;