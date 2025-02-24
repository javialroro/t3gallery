import { sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  timestamp,
  varchar,
  unique,
  foreignKey,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `t3gallery_${name}`);

export const images = createTable(
  "image",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }).notNull(),
    url: varchar("url", { length: 1024 }).notNull(),
    userId: varchar("user_id", { length: 256 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const likes = createTable(
  "like",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    imageId: integer("image_id")
      .notNull()
      .references(() => images.id, {
        onDelete: "cascade",
      }),
    userId: varchar("user_id", { length: 256 }).notNull(),
  },
  (example) => ({
    imageIndex: index("image_idx").on(example.imageId),
    uniqueLike: unique("unique_like").on(example.userId, example.imageId),
  }),
);
