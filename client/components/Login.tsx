import style from "@/styles/login.module.scss";
import { useLogin } from "@/components/AuthContext";
import { SetStateAction } from "react";

interface SignInForm {
    email: { value: string };
    password: { value: string };
}

export default function Login({
    setSignUp,
}: {
    setSignUp: React.Dispatch<SetStateAction<boolean>>;
}) {
    const { login, error, isLoading } = useLogin();

    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { email, password } = e.target as typeof e.target & SignInForm;

        await login(email.value, password.value);
    };

    return (
        <div className={style.login_panel}>
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
                {error && <div>{error}</div>}
                <button
                    type="submit"
                    className={style.login_button}
                    disabled={isLoading}
                >
                    Login
                </button>
            </form>
            <hr />
            <button
                className={style.new_account_button}
                onClick={() => setSignUp(true)}
                disabled={isLoading}
            >
                Create new Account
            </button>
            <button className={style.guest_button} disabled={isLoading}>
                Sign in as Guest
            </button>
        </div>
    );
}
