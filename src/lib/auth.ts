import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { ValidateUser } from "@/lib/services";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) {
          return null;
        }
        
        if ((credentials as any)?.id) {
          return credentials;
        }

        const user = await ValidateUser(
          credentials.username as string,
          credentials.password as string
        );
        
        if (!user) {
          return null;
        }

        return {
          id: user._id.toString(),
          username: user.username,
          Nickname: user.Nickname,
          image: user.image,
          role: user.role,
          badge: user.badge,
          faction: user.faction,
          rank: user.rank,
          ifNewAccount: user.ifNewAccount
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.role = user.role;
        token.badge = user.badge;
        token.faction = user.faction;
        token.rank = user.rank;
        token.Nickname = user.Nickname;
        token.image = user.image;
        token.ifNewAccount = user.ifNewAccount;
      }

      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
        session.user.role = token.role as string;
        session.user.badge = token.badge as string;
        session.user.faction = token.faction as string;
        session.user.rank = token.rank as string;
        session.user.Nickname = token.Nickname as string;
        session.user.image = token.image as string;
        session.user.ifNewAccount = token.ifNewAccount as boolean;
      }
      return session;
    },
  },
};