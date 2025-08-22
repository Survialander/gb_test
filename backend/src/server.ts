import Koa from "koa";
import { router } from "./infra/http/routes/skuRoutes.js";
import { bodyParser } from "@koa/bodyparser";
import cors from "@koa/cors";
import { APIError } from "./application/errors/ApiError.js";

export const app = new Koa();

app.use(cors());
app.use(async (ctx, next) => {
  ctx.set("Content-Type", "application/json; charset=utf-8");
  console.log(`${ctx.method} ${ctx.url}`);
  await next();
});

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err instanceof APIError) {
      ctx.status = err.status;
      ctx.body = { message: err.message };
    } else {
      ctx.status = 500;
      ctx.body = { message: "Ocorreu um erro ao processar a requisição" };
    }
  }
});
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(process.env.PORT ?? 3000, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT ?? 3000}`);
});
