import { Context } from "koa";

export interface FindAllQueryParams {
  page: number;
  limit: number;
}

export interface FindAllContext extends Context {
  request: Context["request"] & {
    query: FindAllQueryParams;
  };
}

export interface FindByIdParams {
  id: string;
}

export interface FindByIdContext extends Context {
  params: FindByIdParams;
}

export interface CreateSkuBody {
  description: string;
  comercialDescription: string;
  sku: string;
}

export interface CreateSkuContext extends Context {
  request: Context["request"] & {
    body: CreateSkuBody;
  };
}

export interface ChangeSkuStateParams {
  id: string;
}

export interface ChangeSkuStateBody {
  state: string;
}

export interface ChangeSkuStateContext extends Context {
  params: ChangeSkuStateParams;
  request: Context["request"] & {
    body: ChangeSkuStateBody;
  };
}

export interface UpdateSkuParams {
  id: string;
}

export interface UpdateSkuBody {
  description?: string;
  comercialDescription?: string;
  sku?: string;
}

export interface UpdateSkuContext extends Context {
  params: UpdateSkuParams;
  request: Context["request"] & {
    body: UpdateSkuBody;
  };
}
