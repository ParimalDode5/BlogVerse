import { Client, Databases, ID, Permission, Query, Role, Storage } from 'appwrite';
import conf from '../conf/conf'

export class AppwriteService
{
    client = new Client();
    database;
    bucket;

    constructor() {
        this.client
                .setEndpoint(conf.appwriteUrl)
                .setProject(conf.appwriteProjectId);

        this.database = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}) {
        return this.database.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
                userId,
            }
        )
    }

    async updatePost(slug, {title, content, featuredImage, status}) {
        return this.database.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug, 
            {
                title,
                content,
                featuredImage,
                status,
            }
        )
    }


    async deletePost(slug) {

        try{
            await this.database.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        }
        catch(error) {
            console.log(error);
            return false;
        }
    }


    async getPost(slug) {
        try{
            return await this.database.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        }
        catch(error) {
            console.log(error);
            return false;
        }
    }


    async getPosts() {
        try{
            return await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    Query.equal("status", "active"), 
                    Query.orderDesc("$createdAt")
                ]
            )
        }
        catch(error) {
            console.log(error);
            return false;
        }
    }

    async getUserPosts(userId) {
        try{
            return await this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    Query.equal("userId" , userId)
                ]
            )
        }
        catch(error) {
            console.log("Appwrite GetourPosts" ,error);
            throw error;
        }
    }


    // file upload service

    async uploadFile(file, userId) {
        return this.bucket.createFile({
            bucketId: conf.appwriteBucketId,
            fileId: ID.unique(),
            file,
            permissions: [
                Permission.read(Role.any()),
                Permission.update(Role.user(userId)),
                Permission.delete(Role.user(userId))
            ]
        })
    }


    async deleteFile(fileId) {

        if(!fileId) {
            return false;
        }

        try{
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
        }
        catch(error) {
            console.log("delete file error ",error);
            return false;
        }
    }


    getFilePreview(fileId) {

        if(!fileId) {
            return "";
        }

        return this.bucket.getFilePreview(
            {
                bucketId: conf.appwriteBucketId,
                fileId,
                width: 800,
                height: 450,
                quality: 90,
            }
        )
    }

    getFileView(fileId) {
        if(!fileId) {
            return "";
        }

        return this.bucket.getFileView({
            bucketId: conf.appwriteBucketId,
            fileId,
        })
    }

    getFileDownload(fileId) {
        if(!fileId) {
            return "";
        }

        return this.bucket.getFileDownload({
            bucketId: conf.appwriteBucketId,
            fileId,
        })
    }
}


const appwriteService = new AppwriteService();

export default appwriteService;
