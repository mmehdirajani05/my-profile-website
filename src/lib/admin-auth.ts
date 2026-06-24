import { cookies } from "next/headers";

export const ADMIN_COOKIE = "mehdi_admin";

function adminSecret() {
  return process.env.ADMIN_PASSWORD;
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const value = cookieStore.get(ADMIN_COOKIE)?.value;
  const secret = adminSecret();

  return Boolean(secret && value === secret);
}

export async function setAdminCookie(password: string) {
  const cookieStore = await cookies();
  const secret = adminSecret();

  if (!secret || password !== secret) {
    return false;
  }

  cookieStore.set(ADMIN_COOKIE, secret, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: 60 * 60 * 8,
  });

  return true;
}

export async function clearAdminCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
}
