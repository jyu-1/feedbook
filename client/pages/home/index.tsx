import Head from "next/head";
import Layout from "@/components/HomeLayout";

export default function Home() {
    return (
        <Layout>
            <Head>
                <title>Home Page</title>
            </Head>
            <div>Home page</div>
        </Layout>
    );
}
