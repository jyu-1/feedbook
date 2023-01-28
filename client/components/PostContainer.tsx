import style from "@/styles/postcontainer.module.scss";

export default function PostContainer() {
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
            {data.map((item, index) => (
                <div key={index} className={style.list_post}>
                    <div className={style.info}>
                        <div>Profile</div>
                        <div>
                            <div className={style.name}>{item.name}</div>
                            <div className={style.date}>{item.datePosted}</div>
                        </div>
                    </div>
                    <div className={style.message}>{item.message}</div>
                    {item.uploadImage !== "" ? (
                        <>
                            <div className={style.photo}>Photo</div>
                            <hr />
                        </>
                    ) : null}

                    <div className={style.stats}>
                        <div>Likes: {item.likeCount}</div>
                        <div>{item.commentCount} comments</div>
                    </div>
                    <hr />
                    <div className={style.like_comment_buttons}>
                        <button>Like</button>
                        <button>Comment</button>
                    </div>
                    <hr />
                    {item.comments.map((comment, cIndex) => (
                        <div key={cIndex} className={style.comment}>
                            <div>
                                <span className={style.name}>
                                    {comment.name}
                                </span>{" "}
                                <span className={style.date}>
                                    {comment.datePosted}
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
            ))}
        </div>
    );
}

const data = [
    {
        image: "image url",
        name: "Apple Pie",
        datePosted: "Jan 27, 2023",
        message: "Apple pie here!",
        uploadImage: "",
        likeCount: 20,
        commentCount: 20,
        comments: [
            {
                name: "Apple Pie",
                datePosted: "Jan 27, 2023",
                message: "I am doing well!",
            },
            {
                name: "Peach Pie",
                datePosted: "Jan 27, 2023",
                message: "Thank you sir",
            },
            {
                name: "Pear Pie",
                datePosted: "Jan 27, 2023",
                message: "Good morning",
            },
        ],
    },
    {
        image: "image url",
        name: "Mango Pie",
        datePosted: "Jan 27, 2023",
        message: "Hello! How is everyone doing?",
        uploadImage: "",
        likeCount: 20,
        commentCount: 20,
        comments: [
            {
                name: "Apple Pie",
                datePosted: "Jan 27, 2023",
                message: "I am doing well!",
            },
            {
                name: "Peach Pie",
                datePosted: "Jan 27, 2023",
                message: "Thank you sir",
            },
            {
                name: "Pear Pie",
                datePosted: "Jan 27, 2023",
                message: "Good morning",
            },
        ],
    },
    {
        image: "image url",
        name: "Pineapple Pie",
        datePosted: "Jan 27, 2023",
        message: "I am pineapple",
        uploadImage: "",
        likeCount: 20,
        commentCount: 20,
        comments: [
            {
                name: "Apple Pie",
                datePosted: "Jan 27, 2023",
                message: "I am doing well!",
            },
            {
                name: "Peach Pie",
                datePosted: "Jan 27, 2023",
                message: "Thank you sir",
            },
            {
                name: "Pear Pie",
                datePosted: "Jan 27, 2023",
                message: "Good morning",
            },
        ],
    },
    {
        image: "image url",
        name: "Orange Pie",
        datePosted: "Jan 27, 2023",
        message: "Tasty fruits!",
        uploadImage: "",
        likeCount: 20,
        commentCount: 20,
        comments: [
            {
                name: "Apple Pie",
                datePosted: "Jan 27, 2023",
                message: "I am doing well!",
            },
            {
                name: "Peach Pie",
                datePosted: "Jan 27, 2023",
                message: "Thank you sir",
            },
            {
                name: "Pear Pie",
                datePosted: "Jan 27, 2023",
                message: "Good morning",
            },
        ],
    },
];
