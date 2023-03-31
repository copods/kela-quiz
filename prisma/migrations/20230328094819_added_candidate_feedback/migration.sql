-- CreateTable
CREATE TABLE "FeedbackForm" (
    "id" TEXT NOT NULL,
    "candidateTestId" TEXT NOT NULL,
    "candidateId" TEXT,

    CONSTRAINT "FeedbackForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionForm" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "option" TEXT NOT NULL,
    "questionType" TEXT NOT NULL,
    "feedbackFormId" TEXT,

    CONSTRAINT "QuestionForm_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "QuestionForm_id_key" ON "QuestionForm"("id");

-- AddForeignKey
ALTER TABLE "FeedbackForm" ADD CONSTRAINT "FeedbackForm_candidateTestId_fkey" FOREIGN KEY ("candidateTestId") REFERENCES "CandidateTest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedbackForm" ADD CONSTRAINT "FeedbackForm_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionForm" ADD CONSTRAINT "QuestionForm_feedbackFormId_fkey" FOREIGN KEY ("feedbackFormId") REFERENCES "FeedbackForm"("id") ON DELETE SET NULL ON UPDATE CASCADE;
