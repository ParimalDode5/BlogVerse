import { useCallback, useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import {Button, Input, RTE, Select} from '../index'
import appwriteService from '../../Appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import ContentSkeleton from '../skeleton/ContentSkeleton'


function PostForm({ post }) {

    const {register, handleSubmit, setValue, control, getValues } = useForm({
        defaultValues : {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        }
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const title = useWatch({ control, name: "title" });
    const [error, setError] = useState("");

    const [editorReady, setEditorReady] = useState(false);

    const submit = async(data) => {
        setError("");

        if(!userData) {
            setError("Please log in before creating a post.");
            return;
        }

        try {
            if(post) {
                // update post
                const file = data.image?.[0] ? await appwriteService.uploadFile(data.image[0], userData.$id) : null;
                const featuredImage = file ? file.$id : post.featuredImage;

                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage,
                });

                if(dbPost) {
                    if(file) {
                        appwriteService.deleteFile(post.featuredImage);
                    }

                    navigate(`/post/${dbPost.$id}`);
                    toast.success("Post updated!");
                }
            }
            else {
                // create post
                const file = data.image?.[0] ? await appwriteService.uploadFile(data.image[0], userData.$id) : null;

                if(file) {
                    const fileId = file.$id;
                    data.featuredImage = fileId;

                    const dbPost = await appwriteService.createPost({...data, userId: userData.$id});

                    if(dbPost) {
                        navigate(`/post/${dbPost.$id}`);
                        toast.success("Post published successfully!");
                    }
                }
            }
        }
        catch(error) {
            if(error.message?.includes('Unknown attribute: "featuredImage"')) {
                setError('Add a string column named "featuredImage" in your Appwrite articles table, then try again.');
                return;
            }

            setError(error.message || "Something went wrong while saving the post.");
        }
    };

    const slugTransform = useCallback((value) => {
        if(value && typeof value === "string") {
            return value
                        .trim()
                        .toLowerCase()
                        .replace(/[^a-zA-Z\d\s]+/g, "-")
                        .replace(/\s/g, "-")
        }

        return "";
    }, []);

    useEffect(() => {
        setValue("slug" , slugTransform(title), {shouldValidate: true});
    }, [title, slugTransform, setValue]);



    
    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            {error && (
                <p className="mb-4 w-full rounded-lg bg-red-100 px-4 py-3 text-sm font-medium text-red-700">
                    {error}
                </p>
            )}
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                {/* <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} /> */}

                {!editorReady && <ContentSkeleton />}

                <div className={editorReady ? "block" : "hidden"}>
                    <RTE label="Content :" 
                        name="content" 
                        onInit={() => setEditorReady(true)}
                        control={control} 
                        defaultValue={getValues("content")} />
                </div>
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        {post.featuredImage && (
                            <img
                                src={appwriteService.getFileView(post.featuredImage)}
                                alt={post.title}
                                className="rounded-lg"
                            />
                        )}
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

export default PostForm;
