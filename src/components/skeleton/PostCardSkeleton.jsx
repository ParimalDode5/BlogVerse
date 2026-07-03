import Skeleton from "react-loading-skeleton";

function PostCardSkeleton() {
    return (
        <div className="rounded-xl overflow-hidden bg-white shadow-md p-3">

            <Skeleton
                height={220}
                borderRadius={12}
            />

            <div className="mt-4">

                <Skeleton height={28} width="80%" />

                <div className="mt-3">
                    <Skeleton count={2} />
                </div>

            </div>

        </div>
    );
}

export default PostCardSkeleton;