import {Link} from 'react-router-dom'
import PostImage from './PostImage'
import LikeButton from './like/LikeButton';
import CommentCount from './comments/CommentCount';

function PostCard({$id, title, featuredImage}) {
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    <PostImage
                        fileId={featuredImage}
                        alt={title}
                        className='h-40 w-full rounded-xl object-cover'
                    />
                </div>
                <span className='inline-block'><LikeButton postId={$id}/></span>
                <span className='inline-block ml-5'><CommentCount postId={$id}/></span>
                <h2 className='text-xl font-bold'>{title}</h2>
            </div>
        </Link>
    )
}

export default PostCard;
