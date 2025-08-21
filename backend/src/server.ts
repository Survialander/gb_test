import Koa from "koa";
import { router } from "./infra/http/routes/skuRoutes.js";
import { bodyParser } from "@koa/bodyparser";
import cors from "@koa/cors";

const app = new Koa();

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
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = { message: err.message ?? "Internal Server Error" };
  }
});
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(process.env.PORT ?? 3000, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT ?? 3000}`);
});
