-- CreateTable
CREATE TABLE "Guild" (
    "id" TEXT NOT NULL,
    "guild_id" TEXT NOT NULL,
    "channel_id" TEXT NOT NULL,
    "target" INTEGER NOT NULL,
    "user" TEXT NOT NULL,

    CONSTRAINT "Guild_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Guild_guild_id_user_key" ON "Guild"("guild_id", "user");
