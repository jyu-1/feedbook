import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { useAuthContext } from "./AuthContext";

interface UserContext {
    myInfo: {
        _id: string;
        name: string;
        profilePicture: string;
    };
}

export const UserContext = createContext<UserContext | null>(null);

export default function UserProvider({ children }: { children: ReactNode }) {
    const [myInfo, setMyInfo] = useState<{
        _id: string;
        name: string;
        profilePicture: string;
    }>({ _id: "", name: "", profilePicture: "" });
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchMe = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_IP}/api/user/list/${user?._id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${user?.token}`,
                        },
                    }
                );
                const json = await response.json();

                if (response.ok) {
                    setMyInfo(json);
                }
            } catch (err: unknown) {
                if (err instanceof Error) console.log(err.message);
                console.log(
                    "Server is starting. Please wait about 20 seconds."
                );
            }
        };
        if (user) fetchMe();
    }, [user]);

    return (
        <UserContext.Provider value={{ myInfo }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUserContext = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw Error("useUserContext must be used inside the Auth Provider");
    }

    return context;
};
