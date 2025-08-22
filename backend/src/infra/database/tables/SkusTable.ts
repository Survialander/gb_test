import { pgTable, text, varchar, uuid, timestamp } from "drizzle-orm/pg-core";
import { SkuStates } from "../../../domain/types/StatesEnum.js";

export const skusTable = pgTable("skus", {
  id: uuid("id").primaryKey().defaultRandom(),
  description: text("description").notNull(),
  comercialDescription: text("comercial_description").notNull(),
  sku: varchar("sku", { length: 50 }).notNull().unique(),
  state: varchar("state", { length: 50 })
    .notNull()
    .default(SkuStates.PreCadastro),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});
