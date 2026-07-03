
const getEnv = (key) => {
    const value = import.meta.env[key];

    if (!value) {
        throw new Error(`Missing environment variable: ${key}`);
    }

    return value;
};

const conf = {
    appwriteUrl : getEnv("VITE_APPWRITE_URL"),
    appwriteProjectId : getEnv("VITE_APPWRITE_PROJECT_ID"),
    appwriteDatabaseId : getEnv("VITE_APPWRITE_DATABASE_ID"),
    appwriteCollectionId : getEnv("VITE_APPWRITE_COLLECTION_ID"),
    appwriteBucketId : getEnv("VITE_APPWRITE_BUCKET_ID"),

    tinymceapikey : getEnv("VITE_TINYMCE_API_KEY"),

    appwriteCollectionLikeId : getEnv("VITE_APPWRITE_COLLECTION_LIKE_ID"),
    appwriteCollectionCommentId : getEnv("VITE_APPWRITE_COLLECTION_Comment_ID"),
    appwriteCollectionBookmarksId : getEnv("VITE_APPWRITE_COLLECTION_Bookmarks_ID"),
    
}


export default conf;
