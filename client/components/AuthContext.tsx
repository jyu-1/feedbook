import React, { createContext, useReducer, useContext, useState } from "react";

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
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const signup = async (email: string, password: string, name: string) => {
        setIsLoading(true);
        setError(null);

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
    };

    return { signup, isLoading, error };
};
