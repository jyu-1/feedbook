import { useState, useEffect } from "react";
import style from "@/styles/friendlist.module.scss";

interface UserType {
    _id: string;
    name: string;
}

export default function FriendList() {
    const [users, setUsers] = useState<UserType[]>([]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_IP}/api/user/list`
                );
                const json = await response.json();

                if (response.ok) {
                    setUsers(json);
                }
            } catch (err: unknown) {
                if (err instanceof Error) console.log(err.message);
                console.log(
                    "Server is starting. Please wait about 20 seconds."
                );
            }
        };

        fetchUser();
    }, []);

    return (
        <div className={style.friend_list}>
            {users &&
                users.map((user) => (
                    <div className={style.friend_item} key={user._id}>
                        {user.name}
                    </div>
                ))}
        </div>
    );
}
