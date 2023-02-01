import Link from "next/link";
import style from "@/styles/header.module.scss";
import { useLogout } from "./AuthContext";
import { useUserContext } from "./UserContext";
import { useState } from "react";

export default function Header() {
    const { logout } = useLogout();
    const { myInfo } = useUserContext();
    const [dropdown, setDropdown] = useState(false);

    const handleLogout = () => {
        logout();
    };

    return (
        <div className={style.header}>
            <h1>
                <Link href="/home">feedbook</Link>
            </h1>
            <input placeholder="Search Feedbook" />
            <div
                className={style.portrait_menu}
                onClick={() => setDropdown((prev) => !prev)}
            >
                <img
                    className={style.pfp}
                    src={myInfo.profilePicture}
                    alt="pfp"
                />
            </div>
            {dropdown && (
                <div className={style.dropdown}>
                    <div className={style.nav_name}>
                        <img
                            className={style.pfp}
                            src={myInfo.profilePicture}
                            alt="pfp"
                        />
                        <div>{myInfo.name}</div>
                    </div>
                    <div className={style.nav_item} onClick={handleLogout}>
                        Change Name
                    </div>
                    <div className={style.nav_item} onClick={handleLogout}>
                        Change Picture
                    </div>
                    <div className={style.nav_item} onClick={handleLogout}>
                        Logout
                    </div>
                </div>
            )}
        </div>
    );
}
