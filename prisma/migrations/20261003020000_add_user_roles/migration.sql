ALTER TABLE "User" ADD COLUMN "role" TEXT NOT NULL DEFAULT 'CUSTOMER';
ALTER TABLE "User" ADD COLUMN "pincode" TEXT;

UPDATE "User" SET "role" = 'SHOPKEEPER' WHERE "shopId" IS NOT NULL;

INSERT OR IGNORE INTO "User" ("name", "username", "password", "role")
VALUES ('System Admin', 'admin', 'admin12345', 'ADMIN');

CREATE INDEX "User_role_idx" ON "User"("role");
