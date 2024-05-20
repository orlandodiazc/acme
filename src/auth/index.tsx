import { ErrorPageComponent } from "@/components/errors";
import Spinner from "@/components/spinner";
import { ApiSchema } from "@/lib/api/apiSchema";
import { authUserQuery } from "@/lib/api/queryOptions";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { useSpinDelay } from "spin-delay";

type AuthUser = ApiSchema["AuthUserResponse"]["user"];

export interface AuthContext {
  isAuthenticated: boolean;
  user: AuthUser;
}

const AuthContext = React.createContext<AuthContext | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data, error, isPending } = useQuery(authUserQuery());
  const isDelayedPending = useSpinDelay(isPending);
  const user = data?.user;
  if (isDelayedPending)
    return (
      <div className="grid h-full w-full place-content-center">
        <Spinner />
      </div>
    );
  if (error) return <ErrorPageComponent error={error} />;

  const isAuthenticated = !!user;
  return (
    <AuthContext.Provider value={{ isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
