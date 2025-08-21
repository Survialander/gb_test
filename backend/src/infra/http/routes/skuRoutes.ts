import Router from "@koa/router";
import { SkuService } from "../../../application/services/SkuService.js";
import { Context } from "koa";

interface FindAllQueryParams {
  page: number;
  limit: number;
}

interface FindAllContext extends Context {
  request: Context["request"] & {
    query: FindAllQueryParams;
  };
}

const service = new SkuService();
export const router = new Router({ prefix: "/skus" });

router.get("/", async (ctx: FindAllContext) => {
  const { page = 1, limit = 10 } = ctx.request.query;
  const {
    data: skusArray,
    hasMore,
    totalPages,
  } = await service.findAll(page, limit);

  const skusJson = {
    hasMore,
    totalPages,
    data: skusArray.map((sku) => {
      return {
        ...sku,
        state: sku.stateName,
      };
    }),
  };

  ctx.status = 200;
  ctx.body = skusJson;
});

router.get("/:id", async (ctx) => {
  const { id } = ctx.params;
  const skuObject = await service.findById(id);

  if (!skuObject) {
    return (ctx.status = 404);
  }

  ctx.status = 200;
  ctx.body = { ...skuObject, state: skuObject.stateName };
});

router.post("/", async (ctx) => {
  console.log(ctx.request.body);
  const { comercialDescription, description, sku } = ctx.request.body;

  await service.create({ comercialDescription, description, sku });

  ctx.status = 204;
});

router.post("/:id/state", async (ctx) => {
  const { id } = ctx.params;
  const { state } = ctx.request.body;

  await service.changeState(id, state);

  ctx.status = 200;
});

router.patch("/:id", async (ctx) => {
  const { id } = ctx.params;
  const { comercialDescription, description, sku } = ctx.request.body;

  const skuObject = await service.update({
    id,
    comercialDescription,
    description,
    sku,
  });

  ctx.status = 200;
  ctx.body = {
    ...skuObject,
    state: skuObject.stateName,
  };
});
