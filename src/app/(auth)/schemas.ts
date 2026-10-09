/**
 * Runtime validation contracts for the `(auth)` route group.
 *
 * The repository's schema-validation library is Zod (see `src/schema/auth.ts`
 * for the existing form schemas); these schemas follow the same conventions
 * but live inside `(auth)` because they guard the `(auth)` HTTP boundary —
 * query strings on the `/confirm` route, which are attacker-controlled.
 *
 * Design rule: untrusted values are only ever turned into `ConfirmRouteParams`
 * through `parseConfirmQuery`. Validation failures produce a specific,
 * human-readable message so misuse shows up in logs exactly as it happened.
 */
import { z } from "zod";

import type { AuthRedirectTo, ConfirmOtpType } from "./types";

/**
 * The one-time-code types the installed Supabase SDK accepts for email OTP
 * verification (`@supabase/auth-js` 2.67.3, `EmailOtpType`):
 * `'signup' | 'invite' | 'magiclink' | 'recovery' | 'email_change' | 'email'`.
 *
 * The list below is the runtime mirror of that union and is compile-checked
 * against it in `types.test.ts` (if the SDK adds a member, the check fails
 * until this list is updated — that is deliberate).
 */
export const EMAIL_OTP_TYPES = [
  "signup",
  "invite",
  "magiclink",
  "recovery",
  "email_change",
  "email",
] as const;

/**
 * Maximum accepted length for `token_hash`. Supabase token hashes are short
 * base64-ish strings; 512 characters is far above anything legitimate while
 * still bounding log lines and request sizes.
 */
export const TOKEN_HASH_MAX_LENGTH = 512;

/** Maximum accepted length for the `next` redirect path. */
export const NEXT_PATH_MAX_LENGTH = 2048;

/**
 * `token_hash` as sent by the confirmation email link.
 *
 * Deliberately not charset-restricted to base64: Supabase owns the token
 * format and we cannot verify every future shape against a live instance.
 * What this schema guarantees is that the value is a single, printable,
 * bounded token — no empty strings, no whitespace, no control characters.
 */
export const tokenHashSchema = z
  .string({
    required_error: "token_hash: query parameter 'token_hash' is required",
    invalid_type_error: "token_hash: must be a string",
  })
  .min(1, "token_hash: query parameter 'token_hash' is required")
  .max(
    TOKEN_HASH_MAX_LENGTH,
    `token_hash: must be at most ${TOKEN_HASH_MAX_LENGTH} characters`,
  )
  .refine(
    (value) => !/\s/.test(value) && !/[\u0000-\u001f\u007f]/.test(value),
    {
      message:
        "token_hash: must be a single token without whitespace or control characters",
    },
  );

/**
 * `type` as sent by the confirmation email link. Rejects anything outside the
 * Supabase `EmailOtpType` union with a message naming the valid values.
 */
export const emailOtpTypeSchema = z.enum(EMAIL_OTP_TYPES, {
  errorMap: () => ({
    message: `type: must be one of ${EMAIL_OTP_TYPES.join(", ")}`,
  }),
});

/**
 * Whether `value` is a safe, root-relative, in-app redirect target.
 *
 * Accepts exactly the shapes `AuthRedirectTo` allows at compile time:
 * a non-empty string starting with a single `/`, printable ASCII only,
 * with no backslash and no protocol-relative `//` prefix (which browsers
 * resolve against a foreign origin — the classic open-redirect shape).
 * Query strings on the path (`"/dashboard?tab=2"`) are allowed.
 *
 * This is the single source of truth for the runtime rule; the route's
 * redirect target can never leave the app while every value passes here.
 */
export function isSafeRelativePath(value: string): boolean {
  if (value.length === 0) return false;
  if (!value.startsWith("/")) return false; // absolute URLs, `javascript:`, bare hosts
  if (value.startsWith("//")) return false; // protocol-relative -> foreign origin
  if (value.includes("\\")) return false; // backslash tricks ("/\evil.example")
  if (/[^\x21-\x7e]/.test(value)) return false; // control characters or spaces
  return true;
}

/**
 * `next` as sent on the confirmation link. Absent (`null`/`undefined`)
 * falls back to `"/"`, matching the route's previous behaviour; anything
 * present must pass `isSafeRelativePath` or the parse fails with a specific
 * message naming what an acceptable target looks like.
 */
export const nextPathSchema = z
  .string({
    required_error: "next: must be a string",
    invalid_type_error: "next: must be a string",
  })
  .max(
    NEXT_PATH_MAX_LENGTH,
    `next: must be at most ${NEXT_PATH_MAX_LENGTH} characters`,
  )
  .refine(isSafeRelativePath, {
    message:
      "next: must be a relative path within this app starting with a single '/' (absolute URLs, protocol-relative URLs, backslashes and control characters are not allowed)",
  })
  .transform((value): AuthRedirectTo => {
    // Checked cast: `isSafeRelativePath` above guarantees the value starts
    // with a single "/", which is exactly the `AuthRedirectTo` invariant.
    // This is the only place the untrusted string becomes the branded type.
    return value as AuthRedirectTo;
  });

/**
 * The full `/confirm` query contract. Input fields may be `null`/`undefined`
 * because they come straight from `URLSearchParams.get`:
 * - missing `token_hash` or `type` is a hard failure with a specific message;
 * - missing `next` falls back to `"/"`.
 */
export const confirmParamsSchema = z.object({
  token_hash: z.preprocess(
    (value) => (value === null || value === undefined ? undefined : value),
    tokenHashSchema,
  ),
  type: z.preprocess(
    (value) => (value === null || value === undefined ? undefined : value),
    emailOtpTypeSchema,
  ),
  next: z.preprocess(
    (value) => (value === null || value === undefined ? "/" : value),
    nextPathSchema,
  ),
});

/** The validated, fully-typed output of `confirmParamsSchema`. */
export type ConfirmParams = {
  token_hash: string;
  type: ConfirmOtpType;
  next: AuthRedirectTo;
};

/** Raw `/confirm` query fields, exactly as read from the request URL. */
export interface ConfirmQueryInput {
  token_hash: string | null;
  type: string | null;
  next: string | null;
}

/** Discriminated result of `parseConfirmQuery` — never throws. */
export type ParseConfirmQueryResult =
  | { success: true; data: ConfirmParams }
  | { success: false; message: string; issues: z.ZodIssue[] };

/**
 * Parse and validate the `/confirm` route's query parameters.
 *
 * The single entry point the route uses to cross the trust boundary:
 * either the query is fully valid and every field is typed (`success: true`),
 * or the caller gets one specific message describing the first problem plus
 * the full issue list. Never throws, never returns partial data.
 */
export function parseConfirmQuery(input: ConfirmQueryInput): ParseConfirmQueryResult {
  const result = confirmParamsSchema.safeParse(input);

  if (result.success) {
    return { success: true, data: result.data };
  }

  const firstIssue = result.error.issues[0];
  return {
    success: false,
    message: firstIssue
      ? firstIssue.message
      : "Invalid confirmation link: could not validate query parameters",
    issues: result.error.issues,
  };
}
