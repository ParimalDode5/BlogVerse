import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ContentSkeleton() {
    return (
        <div className="w-full rounded-xl overflow-hidden border border-gray-300 bg-white">

            {/* Toolbar */}
            <div className="border-b p-3 flex flex-wrap gap-2">
                {Array.from({ length: 12 }).map((_, index) => (
                    <Skeleton
                        key={index}
                        width={28}
                        height={28}
                        borderRadius={6}
                    />
                ))}
            </div>

            {/* Writing Area */}
            <div className="p-5">
                <Skeleton height={18} width="95%" />
                <Skeleton height={18} width="90%" />
                <Skeleton height={18} width="82%" />
                <Skeleton height={18} width="96%" />
                <Skeleton height={18} width="88%" />
                <Skeleton height={18} width="93%" />
                <Skeleton height={18} width="70%" />

                <div className="mt-6">
                    <Skeleton height={320} />
                </div>
            </div>
        </div>
    );
}

export default ContentSkeleton;