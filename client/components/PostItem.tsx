import style from "@/styles/postcontainer.module.scss";

interface PostItemProps {
    post: {
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
        uploadImage?: string;
    };
}

export default function PostItem({ post }: PostItemProps) {
    return (
        <div className={style.list_post}>
            <div className={style.info}>
                <div>Profile</div>
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
                <div>Profile</div>
                <input placeholder="Write a comment..." />
            </div>
        </div>
    );
}
