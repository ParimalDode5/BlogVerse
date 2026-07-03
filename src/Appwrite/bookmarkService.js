import { Client, Databases, ID, Query } from "appwrite";
import conf from "../conf/conf";


export class BookmarkService
{
    client = new Client();
    database;

    constructor() {
        this.client
                    .setEndpoint(conf.appwriteUrl)
                    .setProject(conf.appwriteProjectId);

        this.database = new Databases(this.client);
    }


    async bookmarkPost(postId, userId) {
        try {
            return await this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionBookmarksId,
                ID.unique(),
                {
                    postId,
                    userId
                }
            )
        }
        catch(error) {
            console.error("Bookmark Service :",error);
            throw error;
        }
    }

    async removeBookmark(documentId) {
        try {
            return await this.database.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionBookmarksId,
                documentId
            );
        }
        catch(error) {
            console.error("Bookmark Service :",error);
            throw error;
        }
    }


    async hasUserBookmarked(postId, userId) {
        try {
            const response = await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionBookmarksId,
                [
                    Query.equal("postId", postId),
                    Query.equal("userId", userId)
                ]
            )


            return response.documents.length > 0 ? response.documents[0] : null;
        }
        catch(error) {
            console.error("Bookmark Service :",error);
            throw error;
        }
    }


    async getUserBookmarks(userId) {
        try{
            const response = await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionBookmarksId,
                [
                    Query.equal("userId", userId)
                ]
            )

            return response.documents;
        }
        catch(error) {
            console.error("Bookmark Service :",error);
            throw error;
        }
    }
     
}



const bookmarkService = new BookmarkService();

export default bookmarkService;