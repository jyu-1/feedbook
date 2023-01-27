import Head from "next/head";
import login from "@/styles/login.module.scss";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function Home() {
    const [signUp, setSignUp] = useState(false);

    return (
        <>
            <Head>
                <title>Feedbook | Login or Signup</title>
            </Head>
            <div className={login.page_split}>
                <div className={login.main}>
                    <div>
                        <h1>feedbook</h1>
                        <h3>Connect with friends and the world around you</h3>
                    </div>
                    {signUp ? (
                        <div className={login.login_panel}>
                            <h2>Signup</h2>
                            <p>It is fast and easy</p>
                            <form>
                                <input
                                    name="name"
                                    type="text"
                                    placeholder="Full Name"
                                    minLength={1}
                                    required
                                />
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
                                <button
                                    type="submit"
                                    className={login.new_account_button}
                                >
                                    Sign Up
                                </button>
                            </form>
                            <hr />
                            <button
                                className={login.guest_button}
                                onClick={() => setSignUp(false)}
                            >
                                Back to Login
                            </button>
                        </div>
                    ) : (
                        <div className={login.login_panel}>
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
                                <button
                                    type="submit"
                                    className={login.login_button}
                                >
                                    Login
                                </button>
                            </form>
                            <hr />
                            <button
                                className={login.new_account_button}
                                onClick={() => setSignUp(true)}
                            >
                                Create new Account
                            </button>
                            <button className={login.guest_button}>
                                Sign in as Guest
                            </button>
                        </div>
                    )}
                </div>
                <Footer />
            </div>
        </>
    );
}
