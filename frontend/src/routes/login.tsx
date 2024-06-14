import AcmeLogo from "@/components/acme-logo";
import { StatusButton } from "@/components/ui/status-button";
import { useLoginMutation } from "@/lib/api/queryOptions";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { AlertCircle, AtSign, Key } from "lucide-react";
import React, { useState } from "react";

export const Route = createFileRoute("/login")({
  beforeLoad: ({ context: { auth } }) => {
    if (auth?.isAuthenticated) {
      throw redirect({ to: "/dashboard" });
    }
  },
  component: Login,
});

function Login() {
  const { mutate, status } = useLoginMutation();
  const navigate = Route.useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    mutate(formData, {
      onSuccess() {
        navigate({ to: "/dashboard" });
      },
      onError(response: Response) {
        if (response.status === 401) {
          setErrorMessage("Invalid username or password");
        }
      },
    });
  }
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <AcmeLogo />
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
            <h1 className="mb-3 text-2xl">Please log in to continue.</h1>
            <div className="w-full">
              <div>
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                  htmlFor="email"
                >
                  Email
                </label>
                <div className="relative">
                  <input
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    required
                    autoComplete="email"
                  />
                  <AtSign className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
              </div>
              <div className="mt-4">
                <label
                  className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    required
                    minLength={6}
                  />
                  <Key className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
              </div>
            </div>
            <StatusButton className="mt-4 w-full" status={status}>
              Log in
            </StatusButton>
            <div
              className="flex h-8 items-end space-x-1"
              aria-live="polite"
              aria-atomic="true"
            >
              {errorMessage && (
                <>
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <p className="text-sm text-red-500">{errorMessage}</p>
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
