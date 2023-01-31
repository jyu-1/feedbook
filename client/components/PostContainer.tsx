import style from "@/styles/postcontainer.module.scss";
import { useEffect, useState } from "react";
import PostItem from "./PostItem";

interface PostType {
    _id: string;
    name: string;
    message: string;
    likeCount: number;
    commentCount: number;
    createdAt: string;
    comments: {
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

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_IP}/api/post`
            );
            const json = await response.json();

            if (response.ok) {
                setPost(json);
            }
        };

        fetchPost();
    }, []);

    return (
        <div className={style.post_container}>
            <div className={style.create_post}>
                <div className={style.post_input}>
                    <div>Profile</div>
                    <input placeholder="What's on your mind?" />
                </div>
                <hr />
                <div className={style.post_buttons}>
                    <button>Attach a Photo</button>
                    <button>Post</button>
                </div>
            </div>
            {posts &&
                posts.map((post) => <PostItem key={post._id} post={post} />)}
        </div>
    );
}
