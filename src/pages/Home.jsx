import { useEffect, useState } from 'react'
import appwriteService from '../Appwrite/config'
import {Container , PostCard} from '../components'
import { Link } from 'react-router-dom';
import heroBLogImg from '../assets/hero-Blog-Image.png'

function Home() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if(posts) {
                setPosts(posts.documents)
            }
        })

    },[])

    const latestPosts = posts.slice(0, 4);

    if(posts.length === 0) {
        return (
            <div className='w-full py-8 mt-4 text-center'>
                <Container>
                    <div className='flex flex-wrap'>
                        <div className='p-2 w-full'>
                            <h1 className='text-2xl font-bold hover:text-gray-500'>
                                Login to read Posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }


    return (
        <div className='w-full py-8'>

            <div className="relative
                            overflow-hidden
                            rounded-3xl
                            bg-white
                            shadow-xl
                            border
                            border-blue-100
                            px-6 py-8
                            md:px-8 md:py-10
                            lg:p-10
                            mx-4
                            md:mx-6
                            lg:mx-10
                            mb-14"
                >
                <div className="grid
                                grid-cols-1
                                lg:grid-cols-2
                                gap-8
                                lg:gap-12
                                items-center">

                    {/* Left */}
                    <div>

                        <span className="
                        inline-block
                        bg-blue-100
                        text-blue-700
                        px-4
                        py-2
                        rounded-full
                        text-xs
                        sm:text-sm
                        font-semibold
                        ">
                            ✍️ Share your ideas with the world
                        </span>

                        <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
                            Welcome to
                            <span className="text-blue-600">
                                {" "}BlogVerse
                            </span>
                            👋
                        </h1>

                        <p className="mt-6 text-gray-600 text-base
                                        sm:text-lg
                                        lg:text-xl
                                        leading-8
                                        lg:leading-9 max-w-xl">
                            Read, write and discover blogs from developers,
                            students and creators around the world.
                        </p>

                        <div className="mt-8 flex flex-col sm:flex-row gap-4">

                            <Link
                                to="/all-posts"
                                className="
                                bg-blue-600
                                hover:bg-blue-700
                                text-white
                                w-full
                                sm:w-auto
                                text-center
                                px-7
                                py-4
                                rounded-xl
                                shadow-lg
                                transition
                                "
                            >
                                📖 Start Reading
                            </Link>

                            <Link
                                to="/add-post"
                                className="
                                border-2
                                border-blue-600
                                text-blue-600
                                hover:bg-blue-100
                                w-full
                                sm:w-auto
                                text-center
                                px-7
                                py-4
                                rounded-xl
                                transition
                                "
                            >
                                ✍️ Write Blog
                            </Link>

                        </div>

                    </div>                    

                    {/* Right */}
                    <div className="relative flex justify-center">

                        <img
                            src={heroBLogImg}
                            className="
                            relative
                            w-full
                            max-w-xs
                            sm:max-w-sm
                            lg:max-w-xl
                            mx-auto
                            "
                            alt="hero blog image"
                        />

                    </div>

                </div>
            </div>
            

            {/* latest posts section */}
            <div className="flex
                            flex-col
                            sm:flex-row
                            justify-around
                            items-start
                            sm:items-end
                            gap-3
                            mx-4
                            md:mx-6
                            lg:mx-0
                            mb-6"
                >

                <div>

                    <h2 className="text-3xl font-bold">
                        Latest Posts
                    </h2>

                    <p className="text-gray-700 mt-1">
                        Fresh stories from the community
                    </p>

                </div>

                <Link
                    to="/all-posts"
                    className="text-blue-600 font-semibold hover:underline"
                >
                    View All →
                </Link>

            </div>
            <Container>
                <div className='flex flex-wrap'>
                    {latestPosts.map((post) => (
                        <div key={post.$id} className="w-full md:w-1/2 lg:w-1/4 p-2">
                            <PostCard {...post}/>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home;
