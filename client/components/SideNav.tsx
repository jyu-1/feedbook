import style from "@/styles/sidenav.module.scss";
import Link from "next/link";

export default function SideNav() {
    return (
        <div className={style.nav}>
            <div className={style.nav_item}>
                <Link href="/">Home</Link>
            </div>
            <div className={style.nav_item}>
                <a href="https://www.youtube.com/">YouTube</a>
            </div>
            <div className={style.nav_item}>
                <a href="https://www.google.com/">Google</a>
            </div>
            <div className={style.nav_item}>
                <a href="https://www.amazon.com/">Amazon</a>
            </div>
            <div className={style.nav_item}>
                <a href="https://www.facebook.com/">Facebook</a>
            </div>
            <div className={style.nav_item}>
                <a href="https://www.instagram.com/">Instagram</a>
            </div>
            <div className={style.nav_item}>
                <a href="https://nodejs.org/en/docs/">Node Docs</a>
            </div>
            <div className={style.nav_item}>
                <a href="https://reactjs.org/">React Docs</a>
            </div>
            <div className={style.nav_item}>
                <a href="https://expressjs.com/">Express Docs</a>
            </div>
            <div className={style.nav_item}>
                <a href="https://www.mongodb.com/docs/">MongoDB Docs</a>
            </div>
        </div>
    );
}
