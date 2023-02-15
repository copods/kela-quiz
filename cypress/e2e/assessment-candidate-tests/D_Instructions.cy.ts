import {
  getBeginAssessmentButton,
  getGoodLuckMessageText,
  getInstructionSectionContent,
  getInstructionSectionHeading,
  getSectionHeading,
  getTestSectionContent,
} from "support/common-function"

describe("Test for Assessment Verification", () => {
  let commonContants = {
    Begin: "Begin Assessment",
    BestWishes: "Best of Luck",
  }

  it("Check, Assessment registration and verification", () => {
    cy.candidateRegistration()
    cy.candidateVerification()
  })

  it("Check, heading is visible and should have first name", () => {
    cy.checkCandidateName()
  })

  it("Tests to check Attributes/Colors/Visibility/Texts", () => {
    // To check section heading
    getSectionHeading().should("be.visible")
    getSectionHeading().should("have.text", "Tests")

    // To check total number of sections
    const sectionsInAssessment = [
      "Test 1 -Quantitive - section1",
      "Test 2 -Quantitive - section2",
    ]
    getTestSectionContent().children().should("have.length", 2)
    getTestSectionContent()
      .children()
      .each(($el, index) => {
        cy.wrap($el).should("have.text", sectionsInAssessment[index])
      })

    // To check instruction section heading
    getInstructionSectionHeading().should("be.visible")
    getInstructionSectionHeading().should("have.text", "Instructions")

    // To check instruction text
    const instructions = [
      "The duration of this exam is 3 minutes",
      "Each question is worth the same marks",
      "After submitting the section, you won't be able to make any changes",
    ]
    getInstructionSectionContent().children().should("have.length", 3)
    getInstructionSectionContent()
      .children()
      .each(($el, index) => {
        cy.wrap($el).should("have.text", instructions[index])
      })

    // To check goodluck text
    getGoodLuckMessageText().should("be.visible")
    getGoodLuckMessageText().should("have.text", commonContants.BestWishes)

    // To click on begin assessment
    getBeginAssessmentButton().should("be.visible")
    getBeginAssessmentButton().should("have.text", commonContants.Begin)
    getBeginAssessmentButton().click()
  })
})
