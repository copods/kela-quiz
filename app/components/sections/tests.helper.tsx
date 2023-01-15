import { getAllSections } from '~/models/sections.server'

// * fetching sections data
export const getAllSectionsData = (
  sortBy: string | null,
  sortOrder: string | null,
  currentWorkspaceId: string,
  testCurrentPage: number,
  testItemsPerPage: number,
  cb: any
) => {
  return getAllSections(
    sortBy,
    sortOrder,
    currentWorkspaceId as string,
    testCurrentPage,
    testItemsPerPage
  )
    .then((res) => {
      return cb(res, 'statusCheck.success')
    })
    .catch((err) => {
      return cb(err, '')
    })
}
