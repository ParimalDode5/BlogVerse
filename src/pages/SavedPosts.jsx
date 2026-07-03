import React, { useEffect, useState } from 'react'
import bookmarkService from '../Appwrite/bookmarkService'
import { useSelector } from 'react-redux'
import appwriteService from '../Appwrite/config';
import { Container, PostCard } from '../components';
import PostCardSkeleton from '../components/skeleton/PostCardSkeleton';


function SavedPosts() {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const userData = useSelector(state => state.auth.userData);

    const fetchSavedPosts = async() => {
        try {
            const user_bookmarks = await bookmarkService.getUserBookmarks(userData.$id);

            const posts = await Promise.all(
                user_bookmarks.map((bookmark) => (
                    appwriteService.getPost(bookmark.postId)
                ))
            );

            //Sometimes a bookmarked post might have been deleted.
            // Remove those.
            setPosts(posts.filter(Boolean)); 
        }
        catch(error) {
            console.error("SavedPosts : ",error);
        }
        finally{
            setLoading(false);
        }
    }


    useEffect(() => {

        if(!userData) {
            setLoading(false);
            return;
        }

        fetchSavedPosts();

    }, [userData?.$id])



    return (
        <div className='w-full py-8'>
            <Container>
                <h2 className="text-3xl font-bold">
                    Saved Posts
                </h2>

                <p className="text-gray-950 mb-6">
                    Your bookmarked articles
                </p>

                {loading ? (

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

                ) : posts.length > 0 ? (
                    <div className='flex flex-wrap'>
                        {posts.map((post) => (
                            <div 
                                key={post.$id}
                                className='w-full md:w-1/2 lg:w-1/4 p-2'
                            >
                                <PostCard {...post}/>
                            </div>
                        ))}
                    </div>
                )  :  (
                    <div className='text-center py-20'>
                        <h2 className='text-2xl font-semibold'>
                            📑 No Saved Posts Yet
                        </h2>

                        <p className='text-gray-500 mt-2'>
                            Save posts to read them later
                        </p>
                    </div>
                )}
            </Container>
        </div>
    )
}

export default SavedPosts