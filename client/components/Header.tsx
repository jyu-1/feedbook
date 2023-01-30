import Link from "next/link";
import style from "@/styles/header.module.scss";
import { useLogout } from "./AuthContext";

export default function Header() {
    const { logout } = useLogout();

    const handleLogout = () => {
        logout();
    };

    return (
        <div className={style.header}>
            <h1>
                <Link href="/home">feedbook</Link>
            </h1>
            <input placeholder="Search Feedbook" />
            <div>Profile</div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}
