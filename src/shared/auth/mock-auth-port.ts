import type { AuthPort, AuthSession } from "./types";

export class MockAuthPort implements AuthPort {
  constructor(private session: AuthSession | null = null) {}

  async getCurrentSession(): Promise<AuthSession | null> {
    return this.session;
  }

  setSession(session: AuthSession | null): void {
    this.session = session;
  }
}
