import { headers as nextHeaders } from "next/headers";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";

export type SessionUser = {
  id: string;
  email: string;
  name?: string;
  role?: string;
};

/**
 * Reads the Payload session from the incoming request cookie. Returns null
 * when no valid session exists. Use this when you want the user as data,
 * not as a gate.
 */
export async function getSessionUser(): Promise<SessionUser | null> {
  try {
    const payload = await getPayload({ config });
    const headers = await nextHeaders();
    const { user } = await payload.auth({ headers });
    if (!user) return null;
    return {
      id: String(user.id),
      email: String(user.email ?? ""),
      name: typeof user.name === "string" ? user.name : undefined,
      role: typeof user.role === "string" ? user.role : undefined,
    };
  } catch {
    return null;
  }
}

/**
 * Auth gate. Redirects to Payload's admin login (which double-serves as our
 * staff login) when the visitor isn't signed in, preserving the original
 * URL as `redirect`. Use at the top of every protected server component.
 */
export async function requireUser(
  fallback: string = "/dashboard",
): Promise<SessionUser> {
  const user = await getSessionUser();
  if (!user) {
    const search = new URLSearchParams({ redirect: fallback }).toString();
    redirect(`/admin/login?${search}`);
  }
  return user;
}
