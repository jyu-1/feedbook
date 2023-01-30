import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import AuthContext from "@/components/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <AuthContext>
            <Component {...pageProps} />
        </AuthContext>
    );
}
