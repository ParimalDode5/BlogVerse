import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import appwriteService from '../Appwrite/config';
import {Button, Container} from '../components'
import PostImage from '../components/PostImage';
import parse from 'html-react-parser'
import { useSelector } from 'react-redux';
import LikeButton from '../components/like/LikeButton';
import Comments from '../components/comments/Comments';
import Skeleton from 'react-loading-skeleton';
import PostCardSkeleton from '../components/skeleton/PostCardSkeleton';
import toast from 'react-hot-toast';
import { formatDistanceToNow } from "date-fns";
import CommentCount from '../components/comments/CommentCount';
import BookmarkButton from '../components/bookmark/BookmarkButton';


function Post() {

    const [post , setPost] = useState(null);
    const {slug} = useParams();
    const navigate = useNavigate();

    const userData = useSelector(state => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if(slug) {
            appwriteService.getPost(slug).then((post) => {
                if(post) {
                    setPost(post);
                }
                else {
                    navigate("/");
                }
            });
        }
        else {
            navigate("/");
        }
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if(status) {
                appwriteService.deleteFile(post.featuredImage);
                toast.success("Post deleted!");
                navigate("/");
            }
        });
    }


    return post ? (
        <div className='py-8'>
            <Container>
                <div className='w-full flex justify-center mb-4 relative border rounded-xl p-2'>
                    <PostImage
                        fileId={post.featuredImage}
                        alt={post.title}
                        className='w-full rounded-xl object-cover'
                    />

                    {isAuthor && (
                        <div className='absolute right-6 top-6'>
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                
                <div className="flex justify-center my-4">
                    <div className="flex items-center gap-25 text-2xl my-5 rounded-full bg-white px-8 py-3 shadow-md">
                        <LikeButton postId={post.$id} />
                        <CommentCount postId={post.$id} />
                        <BookmarkButton postId={post.$id} />
                    </div>
                </div>

                <div className='w-full mb-6'>
                    <h1 className='text-2xl font-bold'>{post.title}</h1>
                    <p className="text-xs text-gray-700">
                        {formatDistanceToNow(
                            new Date(post.$createdAt),
                            { addSuffix: true }
                        )}
                    </p>
                </div>
                <div className='browser-css'>
                    {parse(post.content)}
                </div>

                <div>
                    <Comments postId={post.$id}/>
                </div>
            </Container>
        </div>
    ) : (
        <div className='mx-40 my-10'>
            <PostCardSkeleton />
        </div>
    );
}

export default Post;
