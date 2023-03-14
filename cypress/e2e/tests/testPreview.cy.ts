import {
  getBackButton,
  getDescription,
  getInvitePopupOpenText,
  getName,
  getTestNameNavigation,
  getTestPreviewAssessDetail,
  getTestPrewSelectedTest,
  getTests,
  getTitle,
  getTotalSections,
  getTotalTime,
} from "support/common-function"

import { cypress, testsConstants } from "~/constants/common.constants"

const test1 = `Aptitude - assessment1`
const selectedSectionText = "Selected Tests"
const assessmentDetailsText = "Assessment Details"
const inviteCandidate = "Invite Candidate"
describe("Test for testPreview", () => {
  beforeEach("sign-in", () => {
    cy.login()

    cy.customVisit("/members")
  })
  it("checks preview data", () => {
    cy.viewport(2000, 1000)
    getTests().click()
    cy.location("pathname", { timeout: 60000 }).should(
      "include",
      "/assessments"
    )
    getTestNameNavigation().contains(test1).should("have.text", test1)
    getTestNameNavigation().contains(test1).click()
    getTitle().should("have.text", test1)

    // data match selected test and back button
    getBackButton()

    // test for assessments name
    getName().should("have.text", cypress.name)

    // Checks for invite candidate button
    getInvitePopupOpenText().should("have.text", inviteCandidate)
    getInvitePopupOpenText().should("have.css", "color", "rgb(53, 57, 136)")
    getInvitePopupOpenText().should("have.css", "font-size", "16px")
    getInvitePopupOpenText().should("have.css", "cursor", "pointer")

    // Checks for assessment details
    getTestPreviewAssessDetail().should("have.text", assessmentDetailsText)
    getTestPreviewAssessDetail().should("have.css", "color", "rgb(0, 0, 0)")
    getTestPreviewAssessDetail().should("have.css", "font-size", "20px")
    getTestPreviewAssessDetail().should("have.css", "font-weight", "600")

    // Checks for selected section
    getTestPrewSelectedTest().should("have.text", selectedSectionText)
    getTestPrewSelectedTest().should("have.css", "color", "rgb(0, 0, 0)")
    getTestPrewSelectedTest().should("have.css", "font-size", "20px")
    getTestPrewSelectedTest().should("have.css", "font-weight", "600")

    // test for description
    getDescription().should("have.text", cypress.description).click()

    // test for total time
    getTotalTime().should("have.text", cypress.totalTime).click()

    // test for Total Sections
    getTotalSections().should("have.text", testsConstants.totalTests)
  })
})
