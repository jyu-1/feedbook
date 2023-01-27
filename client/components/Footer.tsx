import style from "@/styles/footer.module.scss";

export default function Footer() {
    return (
        <footer className={style.footer}>
            <a
                href="https://github.com/jyu-1/feedbook"
                title="github link to this project"
            >
                Copyright © 2023 Nateyu
            </a>
        </footer>
    );
}
