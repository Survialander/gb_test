import Router from "@koa/router";
import { SkuService } from "../../../application/services/SkuService.js";
import { SkuStates } from "../../../domain/types/StatesEnum.js";
import {
  FindAllContext,
  FindByIdContext,
  UpdateSkuContext,
  CreateSkuContext,
  ChangeSkuStateContext,
  UpdateSkuBody,
  ChangeSkuStateBody,
  CreateSkuBody,
} from "./types.js";

const service = new SkuService();
export const router = new Router({ prefix: "/skus" });

router.get("/", async (ctx: FindAllContext) => {
  const { page = 1, limit = 10 } = ctx.request.query;
  const { data: skusArray, hasMore } = await service.findAll(page, limit);

  const skusJson = {
    hasMore,
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

router.get("/:id", async (ctx: FindByIdContext) => {
  const { id } = ctx.params;
  const skuObject = await service.findById(id);

  if (!skuObject) {
    return (ctx.status = 404);
  }

  ctx.status = 200;
  ctx.body = { ...skuObject, state: skuObject.stateName };
});

router.post("/", async (ctx: CreateSkuContext) => {
  const { comercialDescription, description, sku } = ctx.request
    .body as CreateSkuBody;

  if (!sku || sku.trim() === "") {
    ctx.status = 400;
    ctx.body = { error: "O campo 'sku' é obrigatório." };
    return;
  }

  await service.create({ comercialDescription, description, sku });

  ctx.status = 204;
});

router.post("/:id/state", async (ctx: ChangeSkuStateContext) => {
  const { id } = ctx.params;
  const { state } = ctx.request.body as ChangeSkuStateBody;

  const stateValues = Object.values(SkuStates);
  const parsedState = stateValues.find((v) => v === state);

  if (!parsedState) {
    ctx.status = 400;
    ctx.body = {
      error:
        "Estado inválido. Os valores permitidos são: " + stateValues.join(", "),
    };
    return;
  }

  await service.changeState(id, parsedState);

  ctx.status = 200;
});

router.patch("/:id", async (ctx: UpdateSkuContext) => {
  const { id } = ctx.params;
  const { comercialDescription, description, sku } = ctx.request
    .body as UpdateSkuBody;

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
