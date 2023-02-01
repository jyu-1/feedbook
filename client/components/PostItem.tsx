import style from "@/styles/postcontainer.module.scss";
import { formatDistanceToNow } from "date-fns";
import { useRef, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { useUserContext } from "./UserContext";

interface ItemType {
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

interface PostItemProps {
    post: ItemType;
    setPost: React.Dispatch<React.SetStateAction<ItemType[]>>;
}

export default function PostItem({ post, setPost }: PostItemProps) {
    const { user } = useAuthContext();
    const updateRef = useRef<HTMLTextAreaElement>(null);
    const commentRef = useRef<HTMLInputElement>(null);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showComment, setShowComment] = useState(false);
    const { myInfo } = useUserContext();

    const handleLike = async () => {
        if (!user) {
            console.log("You are not logged in");
            return;
        }

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_IP}/api/post/like`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user?.token}`,
                    },
                    body: JSON.stringify({
                        postId: post._id,
                    }),
                }
            );

            const json = await response.json();

            if (!response.ok) {
                console.log(json.error);
            }

            if (response.ok) {
                setPost((prev) =>
                    prev.map((item) => {
                        if (item._id === post._id) {
                            return {
                                ...item,
                                userLiked: 1,
                                likeCount: item.likeCount + 1,
                            };
                        }
                        return item;
                    })
                );
            }
        } catch (err: unknown) {
            if (err instanceof Error) console.log(err.message);
            console.log("Server is starting. Please wait about 20 seconds.");
        }
    };

    const handleUnlike = async () => {
        if (!user) {
            console.log("You are not logged in");
            return;
        }

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_IP}/api/post/like/${post._id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                    },
                }
            );

            const json = await response.json();

            if (!response.ok) {
                console.log(json.error);
            }

            if (response.ok) {
                setPost((prev) =>
                    prev.map((item) => {
                        if (item._id === post._id) {
                            return {
                                ...item,
                                userLiked: 0,
                                likeCount: item.likeCount - 1,
                            };
                        }
                        return item;
                    })
                );
            }
        } catch (err: unknown) {
            if (err instanceof Error) console.log(err.message);
            console.log("Server is starting. Please wait about 20 seconds.");
        }
    };

    const handleComment = async () => {
        if (!user) {
            console.log("You are not logged in");
            return;
        }

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_IP}/api/comment`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user?.token}`,
                    },
                    body: JSON.stringify({
                        postId: post._id,
                        message: commentRef.current
                            ? commentRef.current.value
                            : post.message,
                    }),
                }
            );

            const json = await response.json();

            if (!response.ok) {
                console.log(json.error);
            }

            if (response.ok) {
                if (commentRef.current) commentRef.current.value = "";
                setPost((prev) =>
                    prev.map((item) => {
                        if (item._id === post._id) {
                            return {
                                ...item,
                                comments: [
                                    {
                                        ...json,
                                        createdBy: {
                                            _id: myInfo._id,
                                            name: myInfo.name,
                                            profilePicture:
                                                myInfo.profilePicture,
                                        },
                                    },
                                    ...item.comments,
                                ],
                                commentCount: item.commentCount + 1,
                            };
                        }
                        return item;
                    })
                );
            }
        } catch (err: unknown) {
            if (err instanceof Error) console.log(err.message);
            console.log("Server is starting. Please wait about 20 seconds.");
        }
    };

    const handleUpdate = async () => {
        if (!user) {
            console.log("You are not logged in");
            return;
        }

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_IP}/api/post/${post._id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user?.token}`,
                    },
                    body: JSON.stringify({
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
        if (!user) {
            console.log("You are not logged in");
            return;
        }

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_IP}/api/post/${post._id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                    },
                }
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
                <img
                    className={style.pfp}
                    src={post.createdBy.profilePicture}
                    alt="pfp"
                />
                <div>
                    <div className={style.name}>{post.createdBy.name}</div>
                    <div className={style.date}>
                        {formatDistanceToNow(new Date(post.updatedAt), {
                            addSuffix: true,
                        })}
                    </div>
                </div>
            </div>
            {showEdit ? (
                <div className={style.edit_bar}>
                    <textarea
                        defaultValue={post.message}
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
                {post.userLiked === 0 ? (
                    <button onClick={handleLike}>Like</button>
                ) : (
                    <button onClick={handleUnlike}>Unlike</button>
                )}
                {showComment ? (
                    <button onClick={() => setShowComment((prev) => !prev)}>
                        Hide Comment
                    </button>
                ) : (
                    <button onClick={() => setShowComment((prev) => !prev)}>
                        Comment
                    </button>
                )}
                {myInfo._id === post.createdBy._id && (
                    <>
                        {showEdit ? (
                            <button onClick={() => setShowEdit(false)}>
                                Cancel Update
                            </button>
                        ) : (
                            <button onClick={() => setShowEdit(true)}>
                                Update Post
                            </button>
                        )}
                        {showDelete ? (
                            <button
                                className={style.delete_confirm}
                                onClick={handleDelete}
                            >
                                Confirm Delete
                            </button>
                        ) : (
                            <button onClick={() => setShowDelete(true)}>
                                Delete Post
                            </button>
                        )}
                    </>
                )}
            </div>
            {showComment && (
                <>
                    <hr className={style.comment_hr} />
                    {post.comments &&
                        post.comments
                            .slice(0)
                            .reverse()
                            .map((comment) => (
                                <div
                                    key={comment._id}
                                    className={style.comment}
                                >
                                    <img
                                        className={style.pfp}
                                        src={comment.createdBy.profilePicture}
                                        alt="pfp"
                                    />
                                    <div className={style.comment_right}>
                                        <div>
                                            <span className={style.name}>
                                                {comment.createdBy.name}
                                            </span>{" "}
                                            <span className={style.date}>
                                                {formatDistanceToNow(
                                                    new Date(comment.updatedAt),
                                                    {
                                                        addSuffix: true,
                                                    }
                                                )}
                                            </span>
                                        </div>
                                        <div>{comment.message}</div>
                                    </div>
                                </div>
                            ))}
                    <div className={style.post_comment}>
                        <img
                            className={style.pfp}
                            src={myInfo.profilePicture}
                            alt="pfp"
                        />
                        <input
                            type="text"
                            name="message"
                            minLength={1}
                            maxLength={250}
                            required
                            ref={commentRef}
                            placeholder="Write a comment..."
                        />
                        <button onClick={handleComment}>Post</button>
                    </div>
                </>
            )}
        </div>
    );
}
