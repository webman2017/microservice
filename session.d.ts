// session.d.ts
import session from 'express-session';

declare module 'express-session' {
    interface SessionData {
        token?: string; // Add the 'token' property to SessionData
    }
}
