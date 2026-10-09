import { describe, expect, it } from "vitest";

import { capitalize, cn } from "./utils";

describe("cn", () => {
  it("merges class names and resolves tailwind conflicts", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
    expect(cn("a", false && "b", undefined, "c")).toBe("a c");
  });
});

describe("capitalize", () => {
  it("uppercases the first character", () => {
    expect(capitalize("hello world")).toBe("Hello world");
  });
});
