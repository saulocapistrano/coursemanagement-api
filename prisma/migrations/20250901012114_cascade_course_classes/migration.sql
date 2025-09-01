-- DropForeignKey
ALTER TABLE "public"."Class" DROP CONSTRAINT "Class_courseId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Class" ADD CONSTRAINT "Class_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "public"."Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
