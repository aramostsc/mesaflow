export type AuthProvider = "mock" | "clerk" | "supabase-auth" | "authjs" | "custom";

export type AuthAssuranceLevel = "single_factor" | "multi_factor";

export interface AuthenticatedUser {
  readonly id: string;
  readonly provider: AuthProvider;
  readonly providerUserId: string;
  readonly primaryEmail: string | null;
  readonly displayName: string | null;
  readonly emailVerified: boolean;
  readonly mfaVerified: boolean;
}

export interface AuthSession {
  readonly id: string;
  readonly provider: AuthProvider;
  readonly user: AuthenticatedUser;
  readonly issuedAt: Date;
  readonly expiresAt: Date;
  readonly assuranceLevel: AuthAssuranceLevel;
}

export interface AuthPort {
  getCurrentSession(): Promise<AuthSession | null>;
}

export type AuthErrorCode = "AUTH_SESSION_MISSING" | "AUTH_SESSION_EXPIRED";

export class AuthError extends Error {
  constructor(
    readonly code: AuthErrorCode,
    message: string,
  ) {
    super(message);
    this.name = "AuthError";
  }
}
