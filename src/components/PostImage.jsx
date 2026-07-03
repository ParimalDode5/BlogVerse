import { useState } from 'react'
import appwriteService from '../Appwrite/config'

function PostImage({ fileId, alt, className = "" }) {
    const [sourceIndex, setSourceIndex] = useState(0);

    if(!fileId) {
        return (
            <div className={`flex items-center justify-center bg-gray-200 text-sm text-gray-600 ${className}`}>
                Image not available
            </div>
        );
    }

    const imageUrls = [
        appwriteService.getFileView(fileId),
        appwriteService.getFilePreview(fileId),
        appwriteService.getFileDownload(fileId),
    ];

    const imageUrl = imageUrls[sourceIndex];

    if(!imageUrl) {
        return (
            <div className={`flex items-center justify-center bg-gray-200 text-sm text-gray-600 ${className}`}>
                Image not available
            </div>
        );
    }

    return (
        <img
            src={imageUrl}
            alt={alt}
            className={className}
            onError={() => {
                console.error("Failed to load Appwrite image:", imageUrl);
                setSourceIndex((currentIndex) => currentIndex + 1);
            }}
        />
    )
}

export default PostImage
