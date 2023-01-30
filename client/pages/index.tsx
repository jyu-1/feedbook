import Head from "next/head";
import style from "@/styles/login.module.scss";
import Footer from "@/components/Footer";
import { useState } from "react";
import Login from "@/components/Login";
import Signup from "@/components/Signup";

export default function Home() {
    const [signUp, setSignUp] = useState(false);

    return (
        <>
            <Head>
                <title>Feedbook | Login or Signup</title>
            </Head>
            <div className={style.page_split}>
                <div className={style.main}>
                    <div>
                        <h1>feedbook</h1>
                        <h3>Connect with friends and the world around you</h3>
                    </div>
                    {signUp ? (
                        <Signup setSignUp={setSignUp} />
                    ) : (
                        <Login setSignUp={setSignUp} />
                    )}
                </div>
                <Footer />
            </div>
        </>
    );
}
