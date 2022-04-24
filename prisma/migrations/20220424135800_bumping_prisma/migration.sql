-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_idAuthor_fkey";

-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_idCategory_fkey";

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_idAuthor_fkey" FOREIGN KEY ("idAuthor") REFERENCES "Author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_idCategory_fkey" FOREIGN KEY ("idCategory") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "Book.name_unique" RENAME TO "Book_name_key";

-- RenameIndex
ALTER INDEX "User.email_unique" RENAME TO "User_email_key";
