import { getGeneratedReport } from "~/models/report.server"

/**
 * This function will return report pdf
 * @returns string
 */
export const getGeneratePdfReport = async (assessmentId: string) => {
  const report = getGeneratedReport(assessmentId)
  return report
}
