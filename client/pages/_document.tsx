import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="shortcut icon" href="/feedbook/favicon.ico" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
