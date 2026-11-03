import { AuthContextType } from "@/types/context/auth/authContext";
import { createContext, useContext } from "react";

export const AuthContext = createContext<AuthContextType>({} as any);

export const useAuthContext = () => useContext(AuthContext);
