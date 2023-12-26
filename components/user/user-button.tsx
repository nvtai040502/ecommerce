
import { SignIn, SignOut } from "../auth-components"
import getCurrentUser from "@/lib/auth/getCurrentUser"
import { UserAvatar } from "./user-avatar"
import { UserAccountNav } from "@/components/user/user-account-nav"
import Link from "next/link"
import { Button } from "../ui/button"

export default async function UserButton() {
  const user = await getCurrentUser()
  if (!user) return (
    <Link className="w-full" href="/sign-in">
      <Button>Login</Button>
    </Link>
  )
  return (
    <UserAccountNav user={user} />
  )
}