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
import { getUserId } from "~/session.server"

/**
 *
 * @param currentWorkspaceId
 * @param resultsItemsPerPage
 * @param resultsCurrentPage
 * @param statusFilter
 * @param sortBy
 * @param sortOrder
 * @returns this function will return all candidate tests
 */
export const getALLCandidateTests = (
  currentWorkspaceId: string,
  resultsItemsPerPage: number,
  resultsCurrentPage: number,
  statusFilter: string,
  sortBy: string,
  sortOrder: string
) => {
  return getAllCandidateTests(
    currentWorkspaceId as string,
    resultsItemsPerPage,
    resultsCurrentPage,
    statusFilter,
    sortBy as string,
    sortOrder as string
  )
}

/**
 *
 * @param userId
 * @returns this function will return workspace
 */
export const getWorkspaces = async (userId: string) => {
  return await getUserWorkspaces(userId)
}

/**
 *
 * @param request
 * @returns this function will return userId
 */
export const getUsersId = async (request: Request) => {
  return await getUserId(request)
}

/**
 *
 * @param id
 * @returns this function will return total count of tests
 */
export const getTotalTestCounts = async (id: string) => {
  return await getTotalTestCount(id)
}

/**
 *
 * @param currentWorkspaceId
 * @param statusFilter
 * @returns this function will return all candidate tests
 */
export const getALLCandidateTestsCount = async (
  currentWorkspaceId: string,
  statusFilter: string
) => {
  return await getAllCandidateTestsCount(currentWorkspaceId, statusFilter)
}

/**
 *
 * @param id
 * @param candidateId
 * @param testId
 * @returns resend test link to candidate
 */
export const getTestResendLink = async (
  id: string,
  candidateId: string,
  testId: string
) => {
  return await resendTestLink({
    id,
    candidateId,
    testId,
  })
}

/**
 *
 * @param id
 * @param statusFilter
 * @returns get count of candidate for specific test
 */
export const getALLCandidatesOfTestCount = async (
  id: string,
  statusFilter: string
) => {
  return await getAllCandidatesOfTestCount(id, statusFilter)
}

/**
 *
 * @param id
 * @param workspaceId
 * @param currentPage
 * @param pageSize
 * @param statusFilter
 * @returns this function will return all candidate of test
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
 *
 * @param id
 * @param candidateStatus
 * @returns candidate result is updated
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
 *
 * @param testId
 * @param candidateId
 * @returns sectionWise result
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
