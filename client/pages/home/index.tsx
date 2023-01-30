import Head from "next/head";
import Layout from "@/components/HomeLayout";
import SideNav from "@/components/SideNav";
import PostContainer from "@/components/PostContainer";
import FriendList from "@/components/FriendList";
import style from "@/styles/homeLayout.module.scss";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/components/AuthContext";
import { useRouter } from "next/router";

export default function Home() {
    const [renderPage, setRenderPage] = useState(false);
    const { user } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            if (Object.keys(user).length === 0) {
                router.push("/");
            } else {
                setRenderPage(true);
            }
        }
    }, [user, router]);

    return (
        <>
            <Head>
                <title>Home Page</title>
            </Head>
            {renderPage && (
                <Layout>
                    <div className={style.main_container}>
                        <SideNav />
                        <PostContainer />
                        <FriendList />
                    </div>
                </Layout>
            )}
        </>
    );
}
