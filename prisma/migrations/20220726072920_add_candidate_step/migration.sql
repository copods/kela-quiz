-- AlterTable
ALTER TABLE "CandidateTest" ADD COLUMN     "candidateStep" JSONB NOT NULL DEFAULT '{ "nextRoute": "register", "isSection": false, "currentSectionID": null }';
