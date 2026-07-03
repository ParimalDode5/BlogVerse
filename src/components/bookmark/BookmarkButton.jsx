import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import bookmarkService from '../../Appwrite/bookmarkService';
import { Bookmark } from 'lucide-react';
import toast from 'react-hot-toast';


function BookmarkButton({ postId }) {

    const [bookmarked, setBookmarked] = useState(false);
    const [bookmarkDocument, setBookmarkDocument] = useState(null);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);

    const userData = useSelector(state => state.auth.userData);

    const fetchBookmark = async() => {
        try {
            const markDoc = await bookmarkService.hasUserBookmarked(postId, userData.$id);

            if(markDoc) {
                setBookmarked(true);
                setBookmarkDocument(markDoc);
            }
            else {
                setBookmarked(false);
                setBookmarkDocument(null);
            }
        }
        catch (error) {
            console.error("BookmarkButton : ",error);
        }
        finally {
            setLoading(false);
        }
    }

    const toggleMark = async() => {
        if(processing) return;

        setProcessing(true);

        try{
            if(bookmarked) {
                await bookmarkService.removeBookmark(bookmarkDocument.$id);

                setBookmarked(false);
                setBookmarkDocument(null);
            }
            else {
                const newBookmark = await bookmarkService.bookmarkPost(postId, userData.$id);

                setBookmarked(true);
                toast.success("Bookmarked");
                setBookmarkDocument(newBookmark);

            }  
        }
        catch(error) {
            console.error("BookmarkButton : ",error);
        }
        finally{
            setProcessing(false);
        }
    }


    useEffect(() => {
        if(!userData) {
            setLoading(false);
            return;
        }

        fetchBookmark();

    }, [postId, userData?.$id])


    if (loading) {
        return (
            <Bookmark className="text-gray-300 animate-pulse" />
        );
    }
    

    return (
        <button
            onClick={toggleMark}
            disabled={loading || processing}
            className="transition hover:scale-110 disabled:opacity-50 text-4xl"
        >
            {bookmarked ? (
                <Bookmark
                    fill="currentColor"
                    strokeWidth={1.8}
                    className="text-blue-700"
                />
            ) : (
                <Bookmark />
            )}
        </button>
    );
}

export default BookmarkButton;