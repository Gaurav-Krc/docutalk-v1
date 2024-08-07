import { initTRPC, TRPCError } from '@trpc/server';
import { type Context } from './context'

const t = initTRPC.context<Context>().create();
const middleware = t.middleware

const isAuthed = middleware(({ next, ctx }) => {
    if (!ctx.auth.userId) {
      throw new TRPCError({ code: 'UNAUTHORIZED' })
    }
    return next({       // return to the next action after middleware
        ctx: {
            auth: ctx.auth,
        }
    })
})

export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuthed);