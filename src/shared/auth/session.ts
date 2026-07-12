import { AuthError, type AuthPort, type AuthSession, type AuthenticatedUser } from "./types";

export async function getCurrentSession(auth: AuthPort): Promise<AuthSession | null> {
  const session = await auth.getCurrentSession();

  if (session === null) {
    return null;
  }

  if (!isSessionActive(session, new Date())) {
    throw new AuthError("AUTH_SESSION_EXPIRED", "Authentication session has expired.");
  }

  return session;
}

export async function requireAuthenticatedUser(auth: AuthPort): Promise<AuthenticatedUser> {
  const session = await getCurrentSession(auth);

  if (session === null) {
    throw new AuthError("AUTH_SESSION_MISSING", "Authentication session is required.");
  }

  return session.user;
}

function isSessionActive(session: AuthSession, now: Date): boolean {
  return session.expiresAt.getTime() > now.getTime();
}
