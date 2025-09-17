import 'next-auth';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    id?: string;
    username?: string;
    role?: string;
    badge?: string;
    faction?: string;
    rank?: string;
    Nickname?: string; 
    image?: string;
    ifNewAccount?: boolean;
  }

  interface Session {
    user: {
      id?: string;
      username?: string;
      role?: string;
      Nickname?: string;
      badge?: string;
      faction?: string;
      rank?: string;
      ifNewAccount?: boolean;
    } & DefaultSession['user']; 
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    username?: string;
    Nickname?: string
    role?: string;
    badge?: string;
    faction?: string;
    rank?: string;
    ifNewAccount?: boolean;
  }
}