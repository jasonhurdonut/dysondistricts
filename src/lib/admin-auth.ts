import { createHash } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "dd_admin";
export const ADMIN_NAME_COOKIE = "dd_admin_name";

function passcodeToken(): string {
  const passcode = process.env.ADMIN_PASSCODE ?? "";
  return createHash("sha256").update(`dyson-districts:${passcode}`).digest("hex");
}

export function verifyPasscode(passcode: string): boolean {
  const expected = process.env.ADMIN_PASSCODE;
  return Boolean(expected) && passcode === expected;
}

export function sessionToken(): string {
  return passcodeToken();
}

export async function isAdminRequest(): Promise<boolean> {
  const store = await cookies();
  return store.get(ADMIN_COOKIE)?.value === passcodeToken();
}

export async function adminName(): Promise<string> {
  const store = await cookies();
  return store.get(ADMIN_NAME_COOKIE)?.value || "DUC Admin";
}
