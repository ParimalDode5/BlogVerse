import React, { useEffect, useState } from 'react'
import appwriteService from '../../Appwrite/config'
import { useSelector } from 'react-redux'
import PostCard from '../PostCard';
import Container from '../container/Container';
import PostCardSkeleton from '../skeleton/PostCardSkeleton';

import { Link } from "react-router-dom";
import { FilePlus2 } from "lucide-react";

function MyPosts() {

    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const userData = useSelector(state =>state.auth.userData);


    const fetchPosts = async() => {
        try {
            const response = await appwriteService.getUserPosts(userData.$id);

            if(response) {
                setUserPosts(response.documents);
            }
        }
        catch(error) {
            console.error("MyPosts : ",error);
        }
        finally {
            setLoading(false);
        }
    }


    useEffect(() => {

        if(!userData) return;

        fetchPosts();
        
    }, [userData?.$id]);


    if (loading) {
        return (
            <Container>
                <div className="flex flex-wrap mt-5">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div
                            key={index}
                            className="w-full md:w-1/2 lg:w-1/4 p-2"
                        >
                            <PostCardSkeleton />
                        </div>
                    ))}
                </div>
            </Container>
        );
    }

    return (
        <div className="mt-10">
            <h2 className="text-3xl font-bold mb-6">
                My Posts
            </h2>

            {userPosts.length > 0 ? (
                <div className="flex flex-wrap mt-5">
                    {userPosts.map((post) => (
                        <div
                            key={post.$id}
                            className="w-full md:w-1/2 lg:w-1/4 p-2"
                        >
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-24 text-center min-h-112.5">

                    <div className="w-28 h-28 rounded-full bg-blue-50 flex items-center justify-center shadow-md">
                        <FilePlus2
                            size={60}
                            className="text-blue-600"
                        />
                    </div>

                    <h2 className="mt-8 text-4xl font-bold text-gray-900">
                        You haven't published any posts.
                    </h2>

                    <p className="mt-3 text-lg text-gray-500 max-w-xl">
                        Create your first blog and share your thoughts,
                        experiences, and ideas with the world.
                    </p>

                    <Link
                        to="/add-post"
                        className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-3"
                    >
                        <FilePlus2 size={22} />
                        Create Your First Blog
                    </Link>

                </div>
            )}
        </div>
    );
}

export default MyPosts