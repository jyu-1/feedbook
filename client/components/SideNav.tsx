import style from "@/styles/sidenav.module.scss";
import Link from "next/link";
import {
    FaHome,
    FaYoutube,
    FaGoogle,
    FaAmazon,
    FaFacebook,
    FaInstagram,
    FaNodeJs,
    FaReact,
} from "react-icons/fa";
import { SiExpress, SiMongodb } from "react-icons/si";

export default function SideNav() {
    return (
        <div className={style.nav}>
            <div className={style.nav_item}>
                <Link href="/">
                    <FaHome size={25} />
                    Home
                </Link>
            </div>
            <div className={style.nav_item}>
                <a href="https://www.youtube.com/">
                    <FaYoutube size={25} />
                    YouTube
                </a>
            </div>
            <div className={style.nav_item}>
                <a href="https://www.google.com/">
                    <FaGoogle size={25} />
                    Google
                </a>
            </div>
            <div className={style.nav_item}>
                <a href="https://www.amazon.com/">
                    <FaAmazon size={25} />
                    Amazon
                </a>
            </div>
            <div className={style.nav_item}>
                <a href="https://www.facebook.com/">
                    <FaFacebook size={25} />
                    Facebook
                </a>
            </div>
            <div className={style.nav_item}>
                <a href="https://www.instagram.com/">
                    <FaInstagram size={25} />
                    Instagram
                </a>
            </div>
            <div className={style.nav_item}>
                <a href="https://nodejs.org/en/docs/">
                    <FaNodeJs size={25} />
                    Node Docs
                </a>
            </div>
            <div className={style.nav_item}>
                <a href="https://reactjs.org/">
                    <FaReact size={25} />
                    React Docs
                </a>
            </div>
            <div className={style.nav_item}>
                <a href="https://expressjs.com/">
                    <SiExpress size={25} />
                    Express Docs
                </a>
            </div>
            <div className={style.nav_item}>
                <a href="https://www.mongodb.com/docs/">
                    <SiMongodb size={25} />
                    MongoDB Docs
                </a>
            </div>
        </div>
    );
}
