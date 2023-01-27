import Link from "next/link";
import style from "@/styles/header.module.scss";

export default function Header() {
    return (
        <div className={style.header}>
            <h1>
                <Link href="/home">feedbook</Link>
            </h1>
            <input placeholder="Search Feedbook" />
            <div>Profile</div>
        </div>
    );
}
