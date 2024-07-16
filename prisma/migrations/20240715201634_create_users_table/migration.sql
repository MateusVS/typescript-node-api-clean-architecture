-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "actived" BOOLEAN NOT NULL DEFAULT false,
    "avatar_url" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "users_email_password_idx" ON "users"("email", "password");

-- CreateIndex
CREATE INDEX "users_email_name_avatar_url_idx" ON "users"("email", "name", "avatar_url");

-- CreateIndex
CREATE INDEX "tenants_name_cnpj_idx" ON "tenants"("name", "cnpj");
