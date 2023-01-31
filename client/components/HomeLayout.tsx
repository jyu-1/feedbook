import Header from "@/components/Header";
import React from "react";
import style from "@/styles/homeLayout.module.scss";
import UserContext from "./UserContext";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className={style.home}>
            <UserContext>
                <Header />
                {children}
            </UserContext>
        </div>
    );
}
