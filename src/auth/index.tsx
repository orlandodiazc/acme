import { ErrorPageComponent } from "@/components/errors";
import Spinner from "@/components/spinner";
import { ApiSchema } from "@/lib/api/apiSchema";
import { authUserQuery } from "@/lib/api/queryOptions";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { flushSync } from "react-dom";

type AuthUser = ApiSchema["AuthUserResponse"]["user"];

export interface AuthContext {
  isAuthenticated: boolean;
  user: AuthUser;
  setUser: (user: AuthUser) => void;
}

const AuthContext = React.createContext<AuthContext | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: authUser, error, isPending } = useQuery(authUserQuery());
  const [data, setData] = React.useState<typeof authUser>();
  React.useEffect(() => {
    setData(authUser);
  }, [authUser]);
  function setUser(user: AuthUser) {
    flushSync(() => {
      setData({ user });
    });
  }
  if (error) return <ErrorPageComponent error={error} />;

  if (isPending || !data)
    return (
      <div className="grid h-full w-full place-content-center">
        <Spinner loading={isPending} />
      </div>
    );
  const user = data?.user;
  const isAuthenticated = !!user;
  return (
    <AuthContext.Provider value={{ isAuthenticated, user, setUser }}>
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
