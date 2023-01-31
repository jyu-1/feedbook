import style from "@/styles/postcontainer.module.scss";
import { formatDistanceToNow } from "date-fns";
import { useRef, useState } from "react";
import { useAuthContext } from "./AuthContext";

interface ItemType {
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

interface PostItemProps {
    post: ItemType;
    setPost: React.Dispatch<React.SetStateAction<ItemType[]>>;
}

export default function PostItem({ post, setPost }: PostItemProps) {
    const { user } = useAuthContext();
    const updateRef = useRef<HTMLInputElement>(null);
    const [showEdit, setShowEdit] = useState(false);

    const handleUpdate = async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_IP}/api/post/${post._id}`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: user ? user.email : "null",
                        message: updateRef.current
                            ? updateRef.current.value
                            : post.message,
                    }),
                }
            );

            const json = await response.json();

            if (!response.ok) {
                console.log(json.error);
                setShowEdit(false);
            }

            if (response.ok) {
                setShowEdit(false);
                setPost((prev) =>
                    prev.map((item) => {
                        if (item._id === post._id) {
                            return {
                                ...item,
                                message: updateRef.current
                                    ? updateRef.current.value
                                    : post.message,
                            };
                        }
                        return item;
                    })
                );
            }
        } catch (err: unknown) {
            if (err instanceof Error) console.log(err.message);
            console.log("Server is starting. Please wait about 20 seconds.");
            setShowEdit(false);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_IP}/api/post/${post._id}`,
                { method: "DELETE" }
            );

            const json = await response.json();

            if (!response.ok) {
                console.log(json.error);
            }

            if (response.ok) {
                setPost((prev) => prev.filter((item) => item._id !== post._id));
            }
        } catch (err: unknown) {
            if (err instanceof Error) console.log(err.message);
            console.log("Server is starting. Please wait about 20 seconds.");
        }
    };

    return (
        <div className={style.list_post}>
            <div className={style.info}>
                <div>{post.uploadImage}</div>
                <div>
                    <div className={style.name}>{post.name}</div>
                    <div className={style.date}>
                        {formatDistanceToNow(new Date(post.createdAt), {
                            addSuffix: true,
                        })}
                    </div>
                </div>
            </div>
            {showEdit ? (
                <div>
                    <input
                        defaultValue={post.message}
                        type="text"
                        name="message"
                        placeholder="Edit message"
                        minLength={1}
                        maxLength={500}
                        required
                        ref={updateRef}
                    />
                    <button onClick={handleUpdate}>Update</button>
                </div>
            ) : (
                <div className={style.message}>{post.message}</div>
            )}
            {post.uploadImage && (
                <>
                    <div className={style.photo}>Photo</div>
                    <hr />
                </>
            )}

            <div className={style.stats}>
                <div>Likes: {post.likeCount}</div>
                <div>{post.commentCount} comments</div>
            </div>
            <hr />
            <div className={style.like_comment_buttons}>
                <button>Like</button>
                <button>Comment</button>
                {showEdit ? (
                    <button onClick={() => setShowEdit(false)}>
                        Cancel Update
                    </button>
                ) : (
                    <button onClick={() => setShowEdit(true)}>
                        Update Post
                    </button>
                )}
                <button onClick={handleDelete}>Delete Post</button>
            </div>
            <hr />
            {post.comments &&
                post.comments.map((comment) => (
                    <div key={comment._id} className={style.comment}>
                        <div>
                            <span className={style.name}>{comment.name}</span>{" "}
                            <span className={style.date}>
                                {formatDistanceToNow(
                                    new Date(comment.createdAt),
                                    {
                                        addSuffix: true,
                                    }
                                )}
                            </span>
                        </div>
                        <div>{comment.message}</div>
                    </div>
                ))}
            <div className={style.post_comment}>
                <div>{user?.email}</div>
                <input placeholder="Write a comment..." />
            </div>
        </div>
    );
}
