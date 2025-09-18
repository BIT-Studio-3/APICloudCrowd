-- CreateTable
CREATE TABLE "public"."Wellness" (
    "id" SERIAL NOT NULL,
    "sleep" INTEGER NOT NULL,
    "stress" INTEGER NOT NULL,
    "fatigue" INTEGER NOT NULL,
    "muscleSoreness" INTEGER NOT NULL,
    "timeStamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Wellness_pkey" PRIMARY KEY ("id")
);
