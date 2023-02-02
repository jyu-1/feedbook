import Link from "next/link";
import style from "@/styles/header.module.scss";
import { useLogout } from "./AuthContext";
import { useUserContext } from "./UserContext";
import { useState } from "react";
import { TbLogout } from "react-icons/tb";
import { FcEditImage, FcSettings } from "react-icons/fc";

export default function Header() {
    const { logout } = useLogout();
    const { myInfo } = useUserContext();
    const [dropdown, setDropdown] = useState(false);

    const handleLogout = () => {
        logout();
    };

    return (
        <>
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
                        src={
                            dropdown
                                ? "https://img.icons8.com/pastel-glyph/128/null/cancel--v1.png"
                                : myInfo.profilePicture
                        }
                        alt="pfp"
                    />
                </div>
            </div>
            <div
                className={`${style.parent_dropdown} ${
                    dropdown ? style.dropdown_active : ""
                }`}
            >
                <div className={style.dropdown}>
                    <div className={style.nav_name}>
                        <img
                            className={style.pfp}
                            src={myInfo.profilePicture}
                            alt="pfp"
                        />
                        <div>{myInfo.name}</div>
                    </div>
                    <div className={style.nav_item}>
                        <FcSettings size={30} />
                        Change Name
                    </div>
                    <div className={style.nav_item}>
                        <FcEditImage size={30} />
                        Change Picture
                    </div>
                    <div className={style.nav_item} onClick={handleLogout}>
                        <TbLogout size={30} />
                        Logout
                    </div>
                </div>
            </div>
        </>
    );
}
