import { createContext, useContext, ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface AuthContextType {
  user: any; // Replace 'any' with your user type
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const user = useSelector((store: RootState) => store.user);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider> //h
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
