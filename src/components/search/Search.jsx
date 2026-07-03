import React, { useEffect, useState } from "react";
import appwriteService from "../../Appwrite/config";
import Container from "../container/Container";
import PostCard from "../PostCard";
import PostCardSkeleton from "../skeleton/PostCardSkeleton";
import { FaSearch } from "react-icons/fa";

function Search() {
    const [search, setSearch] = useState("");
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await appwriteService.getPosts();

                if (response) {
                    setPosts(response.documents);
                }
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

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

    const query = search.trim().toLowerCase();

    const filteredPosts = posts.filter((post) => {
        const title = post.title.toLowerCase();

        const content = post.content
            .replace(/<[^>]*>/g, "")
            .toLowerCase();

        return (
            title.includes(query) ||
            content.includes(query)
        );
    });

    return (
        <div>
            <div className='flex items-center justify-center'>
            <div className="bg-white rounded-xl shadow-md p-3 flex items-center gap-2 w-150">
                <span className="text-xl">
                    <FaSearch />
                </span>

                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search blogs..."
                    className="w-full outline-none"

                />
            </div>
            </div>

            <Container>
                <div className="flex flex-wrap mt-5">
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((post) => (
                            <div
                                key={post.$id}
                                className="w-full md:w-1/2 lg:w-1/4 p-2"
                            >
                                <PostCard {...post} />
                            </div>
                        ))
                    ) : (
                        <div className="w-full text-center py-10 text-2xl font-semibold">
                            <h2>
                                No Posts Found 😕
                            </h2>
                            <h2 className="mt-2">Try another search.</h2>
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
}

export default Search;