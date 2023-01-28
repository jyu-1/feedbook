import Head from "next/head";
import Layout from "@/components/HomeLayout";
import SideNav from "@/components/SideNav";
import PostContainer from "@/components/PostContainer";
import FriendList from "@/components/FriendList";
import style from "@/styles/homeLayout.module.scss";

export default function Home() {
    return (
        <Layout>
            <Head>
                <title>Home Page</title>
            </Head>
            <div className={style.main_container}>
                <SideNav />
                <PostContainer />
                <FriendList />
            </div>
        </Layout>
    );
}
