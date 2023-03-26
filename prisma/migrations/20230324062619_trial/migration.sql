-- CreateTable
CREATE TABLE "FeedbackForm" (
    "id" TEXT NOT NULL,
    "testId" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,

    CONSTRAINT "FeedbackForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionForm" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "option" TEXT NOT NULL,
    "feedbackFormId" TEXT,

    CONSTRAINT "QuestionForm_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "QuestionForm_id_key" ON "QuestionForm"("id");

-- AddForeignKey
ALTER TABLE "FeedbackForm" ADD CONSTRAINT "FeedbackForm_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedbackForm" ADD CONSTRAINT "FeedbackForm_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionForm" ADD CONSTRAINT "QuestionForm_feedbackFormId_fkey" FOREIGN KEY ("feedbackFormId") REFERENCES "FeedbackForm"("id") ON DELETE SET NULL ON UPDATE CASCADE;
