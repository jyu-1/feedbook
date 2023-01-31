import style from "@/styles/postcontainer.module.scss";
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
                    <div className={style.date}>{post.createdAt}</div>
                </div>
            </div>
            <div className={style.message}>{post.message}</div>
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
                <button onClick={handleDelete}>Delete Post</button>
            </div>
            <hr />
            {post.comments &&
                post.comments.map((comment) => (
                    <div key={comment._id} className={style.comment}>
                        <div>
                            <span className={style.name}>{comment.name}</span>{" "}
                            <span className={style.date}>
                                {comment.createdAt}
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
