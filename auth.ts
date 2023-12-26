import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
// import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { NextAuthConfig } from "next-auth";
import { db } from "./lib/db";
import authConfig from "./auth.config"

export const config: NextAuthConfig = {
  ...authConfig,
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);