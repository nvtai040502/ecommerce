"use client"
import { Button } from "./ui/button"
import React from "react";
import { Icons } from "./icons";
import { handleSignIn, handleSignOut } from "@/lib/auth/auth-actions";

export function SignIn({
  provider,
  ...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const handleSignInAction = async () => {
    setIsLoading(true);
    try {
      await handleSignIn(provider);
    } catch (error) {
      // Handle error, if needed
    }
  };
  return (
    <form onSubmit={handleSignInAction}>
      <Button variant="outline" disabled={isLoading} className="w-full rounded-lg" {...props}>
        {isLoading && (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        )}
        Continue with {provider}
      </Button>
    </form>
  )
}

export function SignOut(props: React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={async () => {
        await handleSignOut();
      }}
      className="w-full"
    >
      <Button variant="ghost" className="w-full p-0" {...props}>
        Sign Out
      </Button>
    </form>
  )
}