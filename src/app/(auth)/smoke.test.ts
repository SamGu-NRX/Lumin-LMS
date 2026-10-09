import { describe, expect, it } from "vitest";

import {
  confirmParamsSchema,
  isSafeRelativePath,
  parseConfirmQuery,
} from "./schemas";
import type { AuthRedirectTo } from "./types";

/**
 * Toolchain smoke test for the `(auth)` contract layer: proves the vitest
 * setup, the `@` alias and the schema/type modules all load. Deeper coverage
 * lives in `schemas.test.ts`, `types.test.ts` and the route/page tests.
 */
describe("(auth) contract toolchain", () => {
  it("loads the schemas module and validates a happy path", () => {
    const parsed = parseConfirmQuery({
      token_hash: "abc123",
      type: "signup",
      next: "/dashboard",
    });

    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data).toEqual({
        token_hash: "abc123",
        type: "signup",
        next: "/dashboard",
      });
    }
  });

  it("exposes isSafeRelativePath as a pure predicate", () => {
    expect(isSafeRelativePath("/")).toBe(true);
    expect(isSafeRelativePath("https://evil.example")).toBe(false);
  });

  it("falls back to '/' when next is missing", () => {
    const parsed = parseConfirmQuery({
      token_hash: "abc123",
      type: "recovery",
      next: null,
    });

    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.next).toBe("/");
    }
  });

  it("keeps confirmParamsSchema aligned with parseConfirmQuery", () => {
    const direct = confirmParamsSchema.safeParse({
      token_hash: "t",
      type: "invite",
      next: "/x",
    });
    expect(direct.success).toBe(true);
  });

  it("accepts an AuthRedirectTo literal (type-level check)", () => {
    const target: AuthRedirectTo = "/dashboard";
    expect(target).toBe("/dashboard");
  });
});
