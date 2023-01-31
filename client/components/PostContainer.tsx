import style from "@/styles/postcontainer.module.scss";
import { FormEvent, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import PostItem from "./PostItem";

interface PostType {
    _id: string;
    name: string;
    message: string;
    likeCount: number;
    commentCount: number;
    createdAt: string;
    comments?: {
        _id: number;
        name: string;
        message: string;
        createdAt: string;
    }[];
    image: string;
    uploadImage: string;
}

export default function PostContainer() {
    const [posts, setPost] = useState<PostType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuthContext();

    const createPostHandler = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_IP}/api/post`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: user ? user.email : "null",
                        message: (e.target as HTMLFormElement).message.value,
                    }),
                }
            );

            const json = await response.json();

            if (!response.ok) {
                console.log(json.error);
                setIsLoading(false);
            }

            if (response.ok) {
                setPost((prev) => [json, ...prev]);
                setIsLoading(false);
                (e.target as HTMLFormElement).reset();
            }
        } catch (err: unknown) {
            if (err instanceof Error) console.log(err.message);
            console.log("Server is starting. Please wait about 20 seconds.");
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_IP}/api/post`
                );
                const json = await response.json();

                if (response.ok) {
                    setPost(json);
                }
            } catch (err: unknown) {
                if (err instanceof Error) console.log(err.message);
                console.log(
                    "Server is starting. Please wait about 20 seconds."
                );
            }
        };

        fetchPost();
    }, []);

    return (
        <div className={style.post_container}>
            <form className={style.create_post} onSubmit={createPostHandler}>
                <div className={style.post_input}>
                    <div>{user?.email}</div>
                    <input
                        type="text"
                        name="message"
                        placeholder="What's on your mind?"
                        minLength={1}
                        maxLength={500}
                        required
                        disabled={isLoading}
                    />
                </div>
                <hr />
                <div className={style.post_buttons}>
                    <button type="button" disabled={isLoading}>
                        Attach a Photo
                    </button>
                    <button type="submit" disabled={isLoading}>
                        Post
                    </button>
                </div>
            </form>
            {posts &&
                posts.map((post) => (
                    <PostItem key={post._id} post={post} setPost={setPost} />
                ))}
        </div>
    );
}
