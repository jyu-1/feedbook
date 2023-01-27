import Head from "next/head";
import login from "@/styles/login.module.scss";
import { useState } from "react";

export default function Home() {
    const [signUp, setSignUp] = useState(false);

    return (
        <>
            <Head>
                <title>Feedbook | Login or Signup</title>
            </Head>
            <div className={login.main}>
                <div>
                    <h1>feedbook</h1>
                    <h3>Connect with friends and the world around you</h3>
                </div>
                <div className={login.input_panel}>
                    <form>
                        <input
                            name="email"
                            type="email"
                            placeholder="Email Address"
                            minLength={2}
                            required
                        />
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            minLength={6}
                            required
                        />
                        <button className={login.login_button}>Login In</button>
                    </form>
                    <hr />
                    <button className={login.new_account_button}>
                        Create new Account
                    </button>
                    <button className={login.guest_button}>
                        Sign in as Guest
                    </button>
                </div>
            </div>
        </>
    );
}
