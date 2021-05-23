-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "idAuthor" INTEGER NOT NULL,
    "idCategory" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "publicationDate" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Book.name_unique" ON "Book"("name");
