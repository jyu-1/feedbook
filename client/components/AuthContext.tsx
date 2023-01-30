import React, {
    createContext,
    useReducer,
    useContext,
    useState,
    useEffect,
} from "react";

type StateType = {
    user: object | null;
};

type ActionType = { type: "LOGIN"; payload: object } | { type: "LOGOUT" };

interface ContextInterface {
    user: object | null;
    dispatch: React.Dispatch<ActionType>;
}

export const AuthContext = createContext<ContextInterface | null>(null);

export const authReducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
        case "LOGIN":
            return { user: action.payload };
        case "LOGOUT": {
            return { user: {} };
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

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        if (user) {
            dispatch({ type: "LOGIN", payload: user });
        }
    }, []);

    console.log("AuthContext state: ", state);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw Error("useAthContext must be used inside the Auth Provider");
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

    return { login, isLoading, error };
};
