import Head from "next/head";
import style from "@/styles/login.module.scss";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import Login from "@/components/Login";
import Signup from "@/components/Signup";
import { useAuthContext } from "@/components/AuthContext";
import { useRouter } from "next/router";

export default function Home() {
    const [signUp, setSignUp] = useState(false);
    const [renderPage, setRenderPage] = useState(false);
    const { user, loadPage } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        if (loadPage) {
            if (!user) {
                setRenderPage(true);
            } else {
                router.push("/home");
            }
        }
    }, [user, router, loadPage]);

    return (
        <>
            <Head>
                <title>Feedbook | Login or Signup</title>
            </Head>
            {renderPage && (
                <div className={style.page_split}>
                    <div className={style.main}>
                        <div>
                            <h1>feedbook</h1>
                            <h3>
                                Connect with friends and the world around you
                            </h3>
                        </div>
                        {signUp ? (
                            <Signup setSignUp={setSignUp} />
                        ) : (
                            <Login setSignUp={setSignUp} />
                        )}
                    </div>
                    <Footer />
                </div>
            )}
        </>
    );
}
