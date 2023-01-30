import Head from "next/head";
import login from "@/styles/login.module.scss";
import Footer from "@/components/Footer";
import { useState } from "react";
import { useSignUp } from "@/components/AuthContext";

interface SignUpForm {
    name: { value: string };
    email: { value: string };
    password: { value: string };
}

interface SignInForm {
    email: { value: string };
    password: { value: string };
}

export default function Home() {
    const [signUp, setSignUp] = useState(false);
    const { signup, error, isLoading } = useSignUp();

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { email, password, name } = e.target as typeof e.target &
            SignUpForm;

        await signup(email.value, password.value, name.value);
    };

    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { email, password } = e.target as typeof e.target & SignInForm;

        console.log(email.value, password.value);
    };

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
                            <p>It is fast and easy!</p>
                            <form onSubmit={handleSignUp}>
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
                                {error && <div>{error}</div>}
                                <button
                                    type="submit"
                                    className={login.new_account_button}
                                    disabled={isLoading}
                                >
                                    Sign Up
                                </button>
                            </form>
                            <hr />
                            <button
                                className={login.guest_button}
                                onClick={() => setSignUp(false)}
                                disabled={isLoading}
                            >
                                Back to Login
                            </button>
                        </div>
                    ) : (
                        <div className={login.login_panel}>
                            <form onSubmit={handleSignIn}>
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
