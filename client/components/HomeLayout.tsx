import Header from "@/components/Header";
import React from "react";
import style from "@/styles/homeLayout.module.scss";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className={style.home}>
            <Header />
            {children}
        </div>
    );
}
