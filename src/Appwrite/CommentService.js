import { Client, Databases, ID, Query } from "appwrite";
import conf from "../conf/conf";
import { data } from "react-router-dom";

export class CommentService
{
    client = new Client();
    database;

    constructor() {
        this.client
                    .setEndpoint(conf.appwriteUrl)
                    .setProject(conf.appwriteProjectId);

        this.database = new Databases(this.client);
    }


    async createComment(postId, userId, userName, comment) {
        try{
            return await this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionCommentId,
                ID.unique(),
                {
                    postId,
                    userId,
                    userName,
                    comment
                }
            )
        }
        catch(error) {
            console.error("Comment Service: ", error);
            throw error;
        }
    }

    async deleteComment(commentId) {
        try {
            return await this.database.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionCommentId,
                commentId
            )
        }
        catch(error) {
            console.error("Comment Service: ", error);
            throw error;
        }
    }

    async updateComment(commentId, comment) {
        try{
            return await this.database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionCommentId,
                commentId,
                {
                    comment
                }
            )
        }
        catch(error) {
            console.error("Comment Service: ", error);
            throw error;
        }
    }

    async getComments(postId) {
        try{
            return await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionCommentId,
                [
                    Query.equal("postId", postId),
                    Query.orderDesc("$createdAt"),
                ]
            )
        }
        catch(error) {
            console.error("Comment Service: ", error);
            throw error;
        }
    }

    async getUserComments(userId) {
        try{
            return await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionCommentId,
                [
                    Query.equal("userId", userId),
                ]
            )
        }
        catch(error){
            console.error("CommentService : ",error);
            throw error;
        }
    }
}


const commentService = new CommentService();

export default commentService;