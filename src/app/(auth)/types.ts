/**
 * Public type contracts for the `(auth)` route group.
 *
 * Every exported type here is part of the interface between the `(auth)`
 * pages/routes and the rest of the application. The contract tests in this
 * directory (`*.test.ts`) assert these types stay in sync with the real
 * components they bind to, so a change that breaks the contract fails at
 * compile/test time instead of silently at runtime.
 */
import type { EmailOtpType } from "@supabase/supabase-js";

/**
 * The modes an `(auth)` page can render the shared `Auth` component in.
 *
 * Mirrors `AuthProps["mode"]` in `@/components/auth`. The bridge is asserted
 * by contract tests (`types.test.ts`), so if the component narrows or widens
 * its `mode` union, the mismatch is caught here, at the boundary.
 */
export type AuthPageMode = "login" | "register";

/**
 * A root-relative, in-app redirect target (for example `"/"` or `"/dashboard"`).
 *
 * Enforced two ways so misuse fails loudly:
 * - Compile time: the template-literal type only accepts strings that start
 *   with a single `/`, so absolute URLs (`"https://evil.example"`) and
 *   protocol-relative URLs (`"//evil.example"`) do not type-check.
 * - Runtime: untrusted input (query parameters) must go through
 *   `nextPathSchema` / `parseConfirmQuery` in `./schemas`, which apply the
 *   same rules with specific error messages. Never construct an
 *   `AuthRedirectTo` from unvalidated input by hand.
 */
export type AuthRedirectTo = `/${string}`;

/**
 * The set of one-time-code types Supabase accepts for email OTP verification.
 *
 * Re-exported from `@supabase/supabase-js` so callers do not import SDK
 * internals directly; the runtime validation lives in `./schemas`.
 */
export type ConfirmOtpType = EmailOtpType;

/**
 * A parsed, fully validated query for the `/confirm` route
 * (`src/app/(auth)/confirm/route.ts`). Every field is present and checked;
 * there is no `null`/`undefined` here by construction.
 */
export interface ConfirmRouteParams {
  /** The OTP token hash from the confirmation email link. */
  token_hash: string;
  /** Which kind of email flow the token belongs to. */
  type: ConfirmOtpType;
  /** Where to send the user after a successful verification (in-app only). */
  next: AuthRedirectTo;
}

/**
 * Why the `/confirm` route redirected the user to `/error`.
 * Kept as an exhaustive union so future failure modes must be added here
 * (and therefore to the docs) rather than smuggled in as strings.
 */
export type ConfirmFailureReason = "invalid_params" | "verification_failed";

/**
 * The exact props `(auth)` pages pass to the shared `Auth` component.
 * Both fields are required here — the pages never render `Auth` without an
 * explicit mode and redirect target — which is stricter than the component's
 * own optional `redirectTo` and is checked by the page contract tests.
 */
export interface AuthPageProps {
  mode: AuthPageMode;
  redirectTo: AuthRedirectTo;
}
