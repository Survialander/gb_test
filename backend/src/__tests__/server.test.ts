import { describe, expect, it } from "vitest";
import { app as server } from "../server.js";

describe("server", () => {
  it("should export expected server", () => {
    expect(server).toBeDefined();
  });
});
