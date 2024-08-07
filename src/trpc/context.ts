import { getAuth } from '@clerk/nextjs/server';
import { NextRequest } from 'next/server';

export const createContext = async ({ req }: { req: NextRequest }) => {
  return { auth: getAuth(req) };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
