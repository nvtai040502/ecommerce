"use server";
import { signIn, signOut } from "@/auth";

export async function handleSignIn(provider?: string) {
  await signIn(provider, {
    redirect: true,
    redirectTo: "/"
  });
}

export async function handleSignOut() {
  await signOut();
}