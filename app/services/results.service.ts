import { resendTestLink } from "~/models/candidate.server"
import {
  getAllCandidateTests,
  getAllCandidateTestsCount,
  getAllCandidatesOfTest,
  getAllCandidatesOfTestCount,
  getSectionWiseResultsOfIndividualCandidate,
  getTotalTestCount,
  updateCandidateStatus,
} from "~/models/result.server"
import { getUserWorkspaces } from "~/models/workspace.server"

/**
 * this function will return all candidate tests
 * @param currentWorkspaceId
 * @param resultsItemsPerPage
 * @param resultsCurrentPage
 * @param statusFilter
 * @param sortBy
 * @param sortOrder
 * @returns Test array
 */
export const getALLCandidateTests = async (
  currentWorkspaceId: string,
  resultsItemsPerPage: number,
  resultsCurrentPage: number,
  statusFilter: string,
  sortBy: string,
  sortOrder: string
) => {
  return await getAllCandidateTests(
    currentWorkspaceId as string,
    resultsItemsPerPage,
    resultsCurrentPage,
    statusFilter,
    sortBy as string,
    sortOrder as string
  )
}

/**
 * this function will return workspace
 * @param userId
 * @returns userWorkspaces
 */
export const getWorkspaces = async (userId: string) => {
  return await getUserWorkspaces(userId)
}

/**
 * this function will return userId
 * @param request
 * @returns userId
 */

/**
 * this function will return total count of tests
 * @param id
 * @returns total count
 */
export const getTotalTestCounts = async (id: string) => {
  return await getTotalTestCount(id)
}

/**
 * this function will return all candidate tests count
 * @param currentWorkspaceId
 * @param statusFilter
 * @returns total count
 */
export const getALLCandidateTestsCount = async (
  currentWorkspaceId: string,
  statusFilter: string
) => {
  return await getAllCandidateTestsCount(currentWorkspaceId, statusFilter)
}

/**
 * this function will resend test link to candidate
 * @param id
 * @param candidateId
 * @param testId
 * @returns resend test link to candidate on mail
 */
export const getTestResendLink = async ({
  id,
  candidateId,
  testId,
}: {
  id: string
  candidateId: string
  testId: string
}) => {
  return await resendTestLink({
    id,
    candidateId,
    testId,
  })
}

/**
 * get count of candidate for specific test
 * @param id
 * @param statusFilter
 * @returns total count
 */
export const getALLCandidatesOfTestCount = async (
  id: string,
  statusFilter: string
) => {
  return await getAllCandidatesOfTestCount(id, statusFilter)
}

/**
 * this function will return all candidate of test
 * @param id
 * @param workspaceId
 * @param currentPage
 * @param pageSize
 * @param statusFilter
 * @returns tests
 */
export const getALLCandidatesOfTest = async ({
  id,
  workspaceId,
  currentPage,
  pageSize,
  statusFilter,
}: {
  id: string
  workspaceId: string
  currentPage: number
  pageSize: number
  statusFilter: string
}) => {
  return await getAllCandidatesOfTest({
    id,
    workspaceId,
    currentPage,
    pageSize,
    statusFilter,
  })
}

/**
 * this function will update the candidate result
 * @param id
 * @param candidateStatus
 * @returns isQualified: candidateStatus == "true" ? true : false
 */
export const updateCandidateSTATUS = async ({
  id,
  candidateStatus,
}: {
  id: string
  candidateStatus: string
}) => {
  return await updateCandidateStatus({
    id,
    candidateStatus,
  })
}

/**
 * this function will return test cand candidate data
 * @param testId
 * @param candidateId
 * @returns array of candidate and tests
 */
export const getSectionWiseResultsOFIndividualCandidate = async ({
  testId,
  candidateId,
}: {
  testId: string
  candidateId: string
}) => {
  return await getSectionWiseResultsOfIndividualCandidate({
    testId,
    candidateId,
  })
}
