import { useState, useEffect } from "react";
import style from "@/styles/friendlist.module.scss";
import { useAuthContext } from "./AuthContext";

interface UserType {
    _id: string;
    name: string;
    profilePicture: string;
}

export default function FriendList() {
    const [users, setUsers] = useState<UserType[]>([]);
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_IP}/api/user/list`,
                    {
                        headers: {
                            Authorization: `Bearer ${user?.token}`,
                        },
                    }
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
        if (user) fetchUser();
    }, [user]);

    return (
        <div className={style.friend_list}>
            {users &&
                users.map((user) => (
                    <div className={style.friend_item} key={user._id}>
                        <img src={user.profilePicture} alt="pfp" />
                        <div>{user.name}</div>
                    </div>
                ))}
        </div>
    );
}
