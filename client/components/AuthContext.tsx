import React, {
    createContext,
    useReducer,
    useContext,
    useState,
    useEffect,
} from "react";

type StateType = {
    user: { _id: string; token: string; name: string } | null;
};

type ActionType =
    | { type: "LOGIN"; payload: { _id: string; token: string; name: string } }
    | { type: "LOGOUT" };

interface ContextInterface {
    user: { _id: string; token: string; name: string } | null;
    dispatch: React.Dispatch<ActionType>;
    loadPage: boolean;
}

export const AuthContext = createContext<ContextInterface | null>(null);

export const authReducer = (
    state: StateType,
    action: ActionType
): StateType => {
    switch (action.type) {
        case "LOGIN":
            return { user: action.payload };
        case "LOGOUT": {
            return { user: null };
        }
        default:
            return state;
    }
};

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [state, dispatch] = useReducer(authReducer, { user: null });
    const [loadPage, setLoadPage] = useState(false);

    useEffect(() => {
        const checkLocal = async () => {
            const checkUser = localStorage.getItem("user");
            if (checkUser) {
                const user = await JSON.parse(checkUser);
                dispatch({ type: "LOGIN", payload: user });
            }
            setLoadPage(true);
        };

        checkLocal();
    }, []);

    return (
        <AuthContext.Provider value={{ ...state, dispatch, loadPage }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw Error("useAuthContext must be used inside the Auth Provider");
    }

    return context;
};

export const useSignUp = () => {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const signup = async (email: string, password: string, name: string) => {
        setIsLoading(true);
        setError(null);

        try {
            setError("Server is starting. Please wait about 20 seconds.");
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_IP}/api/user/signup`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password, name }),
                }
            );

            const json = await response.json();

            if (!response.ok) {
                setIsLoading(false);
                setError(json.error);
            }

            if (response.ok) {
                localStorage.setItem("user", JSON.stringify(json));
                dispatch({ type: "LOGIN", payload: json });
                setIsLoading(false);
            }
        } catch (err: unknown) {
            if (err instanceof Error) console.log(err.message);
            setError("Server is starting. Please wait about 20 seconds.");
            setIsLoading(false);
        }
    };

    return { signup, isLoading, error };
};

export const useLogout = () => {
    const { dispatch } = useAuthContext();

    const logout = () => {
        localStorage.removeItem("user");
        dispatch({ type: "LOGOUT" });
    };

    return { logout };
};

export const useLogin = () => {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        setError(null);

        try {
            setError("Server is starting. Please wait about 20 seconds.");
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_IP}/api/user/login`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                }
            );

            const json = await response.json();

            if (!response.ok) {
                setIsLoading(false);
                setError(json.error);
            }

            if (response.ok) {
                localStorage.setItem("user", JSON.stringify(json));
                dispatch({ type: "LOGIN", payload: json });
                setIsLoading(false);
            }
        } catch (err: unknown) {
            if (err instanceof Error) console.log(err.message);
            setError("Server is starting. Please wait about 20 seconds.");
            setIsLoading(false);
        }
    };

    const guestLogin = async () => {
        setIsLoading(true);
        setError(null);

        try {
            setError("Server is starting. Please wait about 20 seconds.");
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_IP}/api/user/guest`,
                {
                    method: "POST",
                }
            );

            const json = await response.json();

            if (!response.ok) {
                setIsLoading(false);
                setError(json.error);
            }

            if (response.ok) {
                localStorage.setItem("user", JSON.stringify(json));
                dispatch({ type: "LOGIN", payload: json });
                setIsLoading(false);
            }
        } catch (err: unknown) {
            if (err instanceof Error) console.log(err.message);
            setError("Server is starting. Please wait about 20 seconds.");
            setIsLoading(false);
        }
    };

    return { login, guestLogin, isLoading, error };
};
