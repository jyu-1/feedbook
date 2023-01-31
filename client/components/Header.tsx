import Link from "next/link";
import style from "@/styles/header.module.scss";
import { useLogout } from "./AuthContext";
import { useUserContext } from "./UserContext";

export default function Header() {
    const { logout } = useLogout();
    const { myInfo } = useUserContext();

    const handleLogout = () => {
        logout();
    };

    return (
        <div className={style.header}>
            <h1>
                <Link href="/home">feedbook</Link>
            </h1>
            <input placeholder="Search Feedbook" />
            <img className={style.pfp} src={myInfo.profilePicture} alt="pfp" />
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}
