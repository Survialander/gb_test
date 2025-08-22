// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { describe, expect, it } from "vitest";
import { SkuService } from "../application/services/SkuService.js";
import { router as skuRoutes } from "../infra/http/routes/skuRoutes.js";
import { Sku } from "../domain/entities/Sku.js";
import { SkuStates } from "../domain/types/StatesEnum.js";

function createMockCtx(overrides: { request?: any; [key: string]: any } = {}) {
  return {
    app: {},
    request: { query: {}, body: {}, ...(overrides.request || {}) },
    response: {},
    req: {},
    res: {},
    params: {},
    status: undefined,
    body: undefined,
    ...overrides,
  };
}

describe("skuRoutes", () => {
  it("should export expected routes", () => {
    expect(skuRoutes).toBeDefined();
    expect(skuRoutes.stack.length).toBeGreaterThan(0);
  });

  it("GET /skus should return skus list", async () => {
    const ctx = createMockCtx({ request: { query: { page: 1, limit: 2 } } });
    const mockSku = new Sku({
      description: "desc",
      comercialDescription: "comdesc",
      sku: "sku1",
      state: SkuStates.Ativo,
    });
    const mockData = {
      data: [mockSku],
      hasMore: false,
      totalPages: 1,
    };
    SkuService.prototype.findAll = async () => mockData;
    await skuRoutes.stack
      .find((r) => r.path === "/skus" && r.methods.includes("GET"))
      .stack[0](ctx, () => {});
    expect(ctx.status).toBe(200);
    expect(ctx.body.data[0].sku).toBe("sku1");
  });

  it("GET /skus/:id should return sku or 404", async () => {
    const mockSku = new Sku({
      description: "desc",
      comercialDescription: "comdesc",
      sku: "sku1",
      state: SkuStates.Ativo,
    });

    SkuService.prototype.findById = async (id) => (id === "1" ? mockSku : null);

    const ctx = createMockCtx({ params: { id: "1" } });
    await skuRoutes.stack
      .find((r) => r.path === "/skus/:id" && r.methods.includes("GET"))
      .stack[0](ctx, () => {});
    expect(ctx.status).toBe(200);
    expect(ctx.body.sku).toBe("sku1");

    const ctx404 = createMockCtx({ params: { id: "2" } });
    await skuRoutes.stack
      .find((r) => r.path === "/skus/:id" && r.methods.includes("GET"))
      .stack[0](ctx404, () => {});
    expect(ctx404.status).toBe(404);
  });

  it("POST /skus should create sku", async () => {
    const ctx = createMockCtx({
      request: {
        body: {
          comercialDescription: "desc",
          description: "desc",
          sku: "sku1",
        },
      },
    });
    SkuService.prototype.create = async () => {};
    await skuRoutes.stack
      .find((r) => r.path === "/skus" && r.methods.includes("POST"))
      .stack[0](ctx, () => {});
    expect(ctx.status).toBe(204);
  });

  it("POST /skus/:id/state should change state", async () => {
    const mockSku = new Sku({
      description: "desc",
      comercialDescription: "comdesc",
      sku: "sku1",
      state: SkuStates.Ativo,
    });
    SkuService.prototype.changeState = async () => mockSku;
    const ctx = createMockCtx({
      params: { id: "1" },
      request: { body: { state: SkuStates.Ativo } },
    });
    await skuRoutes.stack
      .find((r) => r.path === "/skus/:id/state" && r.methods.includes("POST"))
      .stack[0](ctx, () => {});
    expect(ctx.status).toBe(200);
  });

  it("PATCH /skus/:id should update sku", async () => {
    const mockSku = new Sku({
      description: "desc",
      comercialDescription: "comdesc",
      sku: "sku1",
      state: SkuStates.Ativo,
    });
    SkuService.prototype.update = async () => mockSku;
    const ctx = createMockCtx({
      params: { id: "1" },
      request: {
        body: {
          comercialDescription: "desc",
          description: "desc",
          sku: "sku1",
        },
      },
    });
    await skuRoutes.stack
      .find((r) => r.path === "/skus/:id" && r.methods.includes("PATCH"))
      .stack[0](ctx, () => {});
    expect(ctx.status).toBe(200);
    expect(ctx.body.sku).toBe("sku1");
  });
});
