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
 * @param userId
 * @returns Test array
 */
export const getDetailsOfAllAssessments = async (
  currentWorkspaceId: string,
  resultsItemsPerPage: number,
  resultsCurrentPage: number,
  statusFilter: string,
  sortBy: string,
  sortOrder: string,
  userId: string
) => {
  try {
    return await getAllCandidateTests(
      currentWorkspaceId as string,
      resultsItemsPerPage,
      resultsCurrentPage,
      statusFilter,
      sortBy as string,
      sortOrder as string,
      userId
    )
  } catch (error) {
    throw error
  }
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
 * @param currentWorkspaceId
 * @param userId
 * @returns total count
 */
export const getTotalTestsCount = async (
  id: string,
  workspaceId: string,
  userId: string
) => {
  try {
    return await getTotalTestCount(id, workspaceId, userId)
  } catch (error) {
    throw error
  }
}

/**
 * this function will return all candidate tests count
 * @param currentWorkspaceId
 * @param statusFilter
 * @param userId
 * @returns total count
 */
export const getTotalAssessmentCount = async (
  currentWorkspaceId: string,
  statusFilter: string,
  userId: string
) => {
  return await getAllCandidateTestsCount(
    currentWorkspaceId,
    statusFilter,
    userId
  )
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
export const getCountofAllCandidatesOfTest = async (
  id: string,
  statusFilter: string,
  userId: string,
  workspaceId: string
) => {
  try {
    return await getAllCandidatesOfTestCount(
      id,
      statusFilter,
      userId,
      workspaceId
    )
  } catch (error) {
    throw error
  }
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
export const getDetailsOfCandidatePerPage = async ({
  id,
  workspaceId,
  userId,
  currentWorkspaceId,
  currentPage,
  pageSize,
  statusFilter,
}: {
  id: string
  workspaceId: string
  userId: string
  currentWorkspaceId: string
  currentPage: number
  pageSize: number
  statusFilter: string
}) => {
  try {
    return await getAllCandidatesOfTest({
      id,
      workspaceId,
      userId,
      currentWorkspaceId,
      currentPage,
      pageSize,
      statusFilter,
    })
  } catch (error) {
    throw error
  }
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
  currentWorkspaceId,
  userId,
}: {
  id: string
  candidateStatus: string
  currentWorkspaceId: string
  userId: string
}) => {
  try {
    return await updateCandidateStatus({
      id,
      candidateStatus,
      currentWorkspaceId,
      userId,
    })
  } catch (error) {
    throw error
  }
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
  workspaceId,
  userId,
}: {
  testId: string
  candidateId: string
  workspaceId: string
  userId: string
}) => {
  return await getSectionWiseResultsOfIndividualCandidate({
    testId,
    candidateId,
    workspaceId,
    userId,
  })
}
