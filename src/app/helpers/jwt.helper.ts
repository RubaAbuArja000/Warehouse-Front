export class JwtHelper {
  static decode<T = Record<string, unknown>>(token: string): T | null {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload)) as T;
    } catch {
      return null;
    }
  }

  static isExpired(token: string): boolean {
    const payload = JwtHelper.decode<{ exp: number }>(token);
    if (!payload?.exp) return true;
    return Date.now() >= payload.exp * 1000;
  }

  static getExpiry(token: string): Date | null {
    const payload = JwtHelper.decode<{ exp: number }>(token);
    if (!payload?.exp) return null;
    return new Date(payload.exp * 1000);
  }
}
