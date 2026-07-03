import React, { useEffect, useState } from "react";
import appwriteService from "../../Appwrite/config";
import bookmarkService from "../../Appwrite/bookmarkService";
import commentService from "../../Appwrite/CommentService";
import likeService from "../../Appwrite/likeService";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import {
    FileText,
    Heart,
    MessageCircle,
    Bookmark,
} from "lucide-react";

function StatsCards() {
    const [posts, setPosts] = useState(0);
    const [bookmarks, setBookmarks] = useState(0);
    const [comments, setComments] = useState(0);
    const [likes, setLikes] = useState(0);
    const [loading, setLoading] = useState(true);

    const userData = useSelector((state) => state.auth.userData);

    const fetchData = async () => {
        try {
            const [postsData, likesData, commentsData, bookmarksData] =
                await Promise.all([
                    appwriteService.getUserPosts(userData.$id),
                    likeService.getLikesReceived(userData.$id),
                    commentService.getUserComments(userData.$id),
                    bookmarkService.getUserBookmarks(userData.$id),
                ]);

            setPosts(postsData.total);
            setLikes(likesData);
            setComments(commentsData.total);
            setBookmarks(bookmarksData.length);
        } catch (error) {
            console.error("StatsCards:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!userData) return;

        fetchData();
    }, [userData?.$id]);

    const stats = [
        {
            title: "Posts",
            value: posts,
            icon: FileText,
            color: "text-blue-600",
            bg: "bg-blue-50",
        },
        {
            title: "Likes",
            value: likes,
            icon: Heart,
            color: "text-red-500",
            bg: "bg-red-50",
        },
        {
            title: "Comments",
            value: comments,
            icon: MessageCircle,
            color: "text-green-600",
            bg: "bg-green-50",
        },
        {
            title: "Bookmarks",
            value: bookmarks,
            icon: Bookmark,
            color: "text-yellow-500",
            bg: "bg-yellow-50",
        },
    ];

    if (loading) {
        return (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 my-8">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-2xl shadow-md p-6"
                    >
                        <Skeleton circle width={48} height={48} />

                        <div className="mt-4">
                            <Skeleton width={50} height={30} />
                        </div>

                        <div className="mt-2">
                            <Skeleton width={90} height={18} />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 my-8">
            {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                    <div
                        key={stat.title}
                        className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6"
                    >
                        <div
                            className={`w-14 h-14 rounded-xl ${stat.bg} flex items-center justify-center`}
                        >
                            <Icon
                                size={28}
                                className={stat.color}
                            />
                        </div>

                        <h2 className="text-3xl font-bold mt-5">
                            {stat.value}
                        </h2>

                        <p className="text-gray-500 mt-1">
                            {stat.title}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}

export default StatsCards;