import style from "@/styles/login.module.scss";
import { useSignUp } from "@/components/AuthContext";
import { SetStateAction } from "react";
import React from "react";

interface SignUpForm {
    name: { value: string };
    email: { value: string };
    password: { value: string };
}

export default function Signup({
    setSignUp,
}: {
    setSignUp: React.Dispatch<SetStateAction<boolean>>;
}) {
    const { signup, error, isLoading } = useSignUp();

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { email, password, name } = e.target as typeof e.target &
            SignUpForm;

        await signup(email.value, password.value, name.value);
    };

    return (
        <div className={style.login_panel}>
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
                    className={style.new_account_button}
                    disabled={isLoading}
                >
                    Sign Up
                </button>
            </form>
            <hr />
            <button
                className={style.guest_button}
                onClick={() => setSignUp(false)}
                disabled={isLoading}
            >
                Back to Login
            </button>
        </div>
    );
}
