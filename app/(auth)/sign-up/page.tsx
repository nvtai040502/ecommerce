import Link from "next/link"

import { Shell } from "@/components/shells/shell"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SignIn } from "@/components/auth-components"

export const metadata = {
  title: "Sign Up",
  description: "Create an account to get started.",
}

export default function SignUpPage() {
  return (
    <Shell className="max-w-lg">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Sign up</CardTitle>
          <CardDescription>
            Choose your preferred sign up method
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <SignIn provider="github"/>
          
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-sm text-muted-foreground mx-auto">
            Already have an account?{" "}
            <Link
              aria-label="Sign in"
              href="/sign-in"
              className="text-primary underline-offset-4 transition-colors hover:underline"
            >
              Sign in
            </Link>
          </div>
          
        </CardFooter>
      </Card>
    </Shell>
  )
}