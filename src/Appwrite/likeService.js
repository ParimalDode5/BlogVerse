import { Client, Databases, ID, Query } from "appwrite";
import conf from "../conf/conf";
import appwriteService from "./config";

export class LikeService {
    client = new Client();
    database;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.database = new Databases(this.client);
    }

    async likePost(postId, userId) {
        try {
            return await this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionLikeId,
                ID.unique(),
                {
                    postId,
                    userId,
                }
            );
        } catch (error) {
            console.error("LikeService:", error);
            throw error;
        }
    }

    async unlikePost(documentId) {
        try {
            return await this.database.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionLikeId,
                documentId
            );
        } catch (error) {
            console.error("LikeService:", error);
            throw error;
        }
    }

    async hasUserLiked(postId, userId) {
        try {
            const response = await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionLikeId,
                [
                    Query.equal("postId", postId),
                    Query.equal("userId", userId),
                ]
            );

            return response.documents.length > 0
                ? response.documents[0]
                : null;
        } catch (error) {
            console.error("LikeService:", error);
            throw error;
        }
    }

    async getLikeCount(postId) {
        try {
            const response = await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionLikeId,
                [
                    Query.equal("postId", postId),
                ]
            );

            return response.total;
        } catch (error) {
            console.error("LikeService:", error);
            throw error;
        }
    }

    async getLikesReceived(userId) {
        try{
            const posts = await appwriteService.getUserPosts(userId);

            const ids = posts.documents.map(post => post.$id);

            if(ids.length === 0) {
                return 0;
            }

            const response = await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionLikeId,
                [
                    Query.equal("postId", ids)
                ]
            )


            return response.total;
        }
        catch(error) {
            console.error("GetLikeReceived: ",error);
            throw error;
        }
    }
}

const likeService = new LikeService();

export default likeService;