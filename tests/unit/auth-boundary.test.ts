import { describe, expect, expectTypeOf, it } from "vitest";
import {
  AuthError,
  getCurrentSession,
  MockAuthPort,
  requireAuthenticatedUser,
  type AuthPort,
  type AuthSession,
} from "../../src/shared/auth";

function createSession(overrides: Partial<AuthSession> = {}): AuthSession {
  return {
    id: "session-1",
    provider: "mock",
    issuedAt: new Date("2026-07-12T10:00:00.000Z"),
    expiresAt: new Date(Date.now() + 60_000),
    assuranceLevel: "single_factor",
    user: {
      id: "user-1",
      provider: "mock",
      providerUserId: "provider-user-1",
      primaryEmail: "admin@example.test",
      displayName: "Admin Example",
      emailVerified: true,
      mfaVerified: false,
    },
    ...overrides,
  };
}

describe("authentication boundary", () => {
  it("mock auth port returns an authenticated session", async () => {
    const session = createSession();
    const auth = new MockAuthPort(session);

    await expect(getCurrentSession(auth)).resolves.toBe(session);
  });

  it("mock auth port can represent absence of session", async () => {
    const auth = new MockAuthPort(null);

    await expect(getCurrentSession(auth)).resolves.toBeNull();
  });

  it("requireAuthenticatedUser fails predictably without a session", async () => {
    const auth = new MockAuthPort(null);

    await expect(requireAuthenticatedUser(auth)).rejects.toMatchObject({
      code: "AUTH_SESSION_MISSING",
      name: "AuthError",
    });
  });

  it("requireAuthenticatedUser returns the user when a valid session exists", async () => {
    const session = createSession();
    const auth = new MockAuthPort(session);

    await expect(requireAuthenticatedUser(auth)).resolves.toEqual(session.user);
  });

  it("expired sessions produce a typed authentication error", async () => {
    const auth = new MockAuthPort(
      createSession({ expiresAt: new Date("2020-01-01T00:00:00.000Z") }),
    );

    await expect(getCurrentSession(auth)).rejects.toMatchObject({
      code: "AUTH_SESSION_EXPIRED",
      name: "AuthError",
    });
  });

  it("exposes provider-independent contracts", () => {
    const auth: AuthPort = new MockAuthPort(createSession());
    const error = new AuthError("AUTH_SESSION_MISSING", "Authentication session is required.");

    expectTypeOf(auth).toMatchTypeOf<AuthPort>();
    expect(error.code).toBe("AUTH_SESSION_MISSING");
  });

  it("does not require external provider connections", async () => {
    const auth = new MockAuthPort(createSession());

    await expect(auth.getCurrentSession()).resolves.toMatchObject({
      provider: "mock",
      user: { provider: "mock" },
    });
  });
});
