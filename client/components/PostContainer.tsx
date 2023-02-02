import style from "@/styles/postcontainer.module.scss";
import { FormEvent, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { useUserContext } from "./UserContext";
import PostItem from "./PostItem";
import { FcPicture, FcSurvey } from "react-icons/fc";

interface PostType {
    _id: string;
    message: string;
    userLiked: number;
    likeCount: number;
    commentCount: number;
    updatedAt: string;
    comments: {
        _id: string;
        message: string;
        updatedAt: string;
        createdBy: {
            _id: string;
            name: string;
            profilePicture: string;
        };
    }[];
    uploadImage: string;
    createdBy: {
        _id: string;
        name: string;
        profilePicture: string;
    };
}

export default function PostContainer() {
    const [posts, setPost] = useState<PostType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuthContext();
    const { myInfo } = useUserContext();

    const createPostHandler = async (e: FormEvent) => {
        e.preventDefault();

        if (!user) {
            console.log("You are not logged in");
            return;
        }
        setIsLoading(true);
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_IP}/api/post`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user?.token}`,
                    },
                    body: JSON.stringify({
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
                setPost((prev) => [
                    {
                        ...json,
                        createdBy: {
                            _id: myInfo._id,
                            name: myInfo.name,
                            profilePicture: myInfo.profilePicture,
                        },
                    },
                    ...prev,
                ]);
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
                    `${process.env.NEXT_PUBLIC_SERVER_IP}/api/post`,
                    {
                        headers: {
                            Authorization: `Bearer ${user?.token}`,
                        },
                    }
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

        if (user) fetchPost();
    }, [user]);

    return (
        <div className={style.post_container}>
            <form className={style.create_post} onSubmit={createPostHandler}>
                <div className={style.post_input}>
                    <img
                        className={style.pfp}
                        src={myInfo.profilePicture}
                        alt="pfp"
                    />
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
                        <FcPicture size={30} />
                        Attach a Photo
                    </button>
                    <button type="submit" disabled={isLoading}>
                        <FcSurvey size={30} />
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
