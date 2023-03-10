import {
  getAnswer,
  getAnswerSectionHeading,
  getAnswerSectionLabel,
  getcoolDownCard,
  getQuestion,
  getQuestionSectionHeading,
  getRemainingTime,
  getSectionHeading,
  getStepperContents,
} from "support/common-function"

const commonContants = {
  sectionHeadingOne: "Section 1 - 2: Quantitative - assessment1",
  sectionHeadingTwo: "Section 2 - 2: Quantitative - assessment1",
  coolDown: "cooldown",
  congratulationText: "Congratulations! You have completed the exam",
  Next: "Next",
  Previous: "Previous",
  EndTest: "End Test",
  Finish: "Finish",
  section1: "Quantitive - section1",
}
describe("Tests for Test Section", () => {
  it("Checks,registration, OTP Verification and Instruction", () => {
    cy.candidateRegistration()
    cy.candidateVerification()
    cy.assessmentInstruction()
  })
  /**
   *  Test Cases For Section 1
   */

  it("Checks, timer should be visible and should work properly", () => {
    cy.clock()
    getRemainingTime()
      .first()
      .should("be.visible")
      .should("have.text", "Time Remaining")
    getRemainingTime().last().should("be.visible")
    cy.wait(1000)
    getRemainingTime().last().invoke("val", "01:00")
    cy.tick(1000)
    getRemainingTime().last().invoke("val", "00:59")
    cy.tick(1000)
    getRemainingTime().last().invoke("val", "00:58")
    cy.tick(1000)
    getRemainingTime().last().invoke("val", "00:57")
    cy.tick(1000)
  })

  it("Tests to check Attributes/Colors/Visibility/Texts of section 1", () => {
    // To check heading is visible and correct
    getSectionHeading().should("be.visible")
    getSectionHeading().should("have.text", commonContants?.sectionHeadingOne)

    // To check question section heading
    getQuestionSectionHeading()
      .should("be.visible")
      .should("have.text", "Question ")

    // To check question
    getQuestion().should("be.visible")

    // To check answer section heading
    getAnswerSectionHeading()
      .first()
      .should("be.visible")
      .should("have.text", "Write Correct Answer")

    // To check answer section has text area
    getAnswer().should("be.visible")
    getAnswer().click().should("have.focus")

    // To check previous button is visible
    cy.contains("button", commonContants.Previous).should("be.disabled")
    cy.contains("button", commonContants.Previous)
      .should("have.class", "text-xs")
      .and("have.class", "font-medium")
      .and("have.class", "text-primaryDisabled")

    // To check finish button is visible
    cy.contains("button", commonContants.Finish).should("be.visible")

    // To attempt question and click finish
    cy.contains("button", commonContants.Finish).click()
    cy.url().should("include", commonContants.coolDown)
  })

  /**
   * Cool Down Page
   */
  it("Tests to check Attributes/Colors/Visibility/Texts of cooldown page", () => {
    // To check cooldown page url
    cy.url().should("contains", commonContants.coolDown)

    // To check take a break is visible
    getcoolDownCard()
      .find("span")
      .should("be.visible")
      .should("have.class", "text-gray-500")
    getcoolDownCard().find("span").should("have.text", "Take A Break!")

    // To check heading is visible
    getcoolDownCard().find("p").should("be.visible")
    getcoolDownCard()
      .find("p")
      .should(
        "have.text",
        `Cheers! ${commonContants.section1} Questions Completed - one more to go`
      )

    // To check cooldown image is visible
    cy.get(".w-coolDownCard img").should("be.visible")

    // To check start new section button is visible
    cy.contains("button", "Start New Section")
      .should("be.visible")
      .should("have.class", "text-gray-50")
      .and("have.class", "hover:bg-primaryHover")
    cy.contains("button", "Start New Section").click()
  })

  /**
   *   Test Cases For Question 1 of Section 2
   */

  it("Tests to check Attributes/Colors/Visibility/Texts of section 2 page", () => {
    // To check heading
    getSectionHeading().should("be.visible")
    getSectionHeading().should("have.text", commonContants?.sectionHeadingTwo)

    // To check stepper section
    getStepperContents()
      .first()
      .find("div")
      .should("have.class", "bg-primary")
      .and("have.class", "rounded-full")
      .should("have.text", "1")
    getStepperContents()
      .last()
      .find("div")
      .and("have.class", "rounded-full")
      .should("have.text", "2")

    // To check answer section contains options
    getAnswerSectionLabel().each(($el) => {
      cy.wrap($el).first().get("input").should("be.visible")
    })

    // To attempt question and click skip
    cy.contains("button", "Skip Question").click()
    getStepperContents()
      .first()
      .find("div")
      .should("have.class", "bg-gray-700")
      .find("img")
      .should("be.visible")
    cy.contains("button", commonContants.Previous).click()
    getStepperContents().last().find("div").find("img").should("be.visible")

    // To attempt question and click on next
    cy.wait(1000)
    getAnswerSectionLabel().eq(0).click()
    getAnswerSectionLabel().eq(1).click()
    cy.contains("button", commonContants.Next).click()
    getStepperContents()
      .first()
      .find("div")
      .should("have.class", "bg-green-600")
      .find("img")
      .should("be.visible")
  })

  /**
   * Test Cases For Question 2 of Section 2
   */

  it("Tests to check Attributes/Colors/Visibility/Texts of question 2 of section 2 page", () => {
    // To check previous button
    cy.contains("button", commonContants.Previous).should("be.visible")
    cy.contains("button", commonContants.Previous)
      .should("have.class", "text-xs")
      .and("have.class", "font-medium")
      .and("have.class", "bg-white")

    // To check previous button works
    cy.contains("button", commonContants.Previous).click()
    getStepperContents().last().find("div").find("img").should("be.visible")
    cy.contains("button", commonContants.Next).click()

    // To check end test button is visible
    cy.contains("button", commonContants.EndTest).should("be.visible")
    cy.contains("button", commonContants.EndTest)
      .should("have.class", "text-xs")
      .and("have.class", "font-medium")
      .and("have.class", "text-gray-50")
      .and("have.class", "bg-primary")

    // To check end test button works
    getAnswerSectionLabel().last().click()
    cy.contains("button", commonContants.EndTest).should("be.visible").click()
  })

  /**
   * End assessment
   */

  it("Tests to check Attributes/Colors/Visibility/Texts of end assessment", () => {
    // To check if page url is correct
    cy.url().should("include", "end-assessment")

    // To check if image is visible
    getcoolDownCard().find("img").should("be.visible")

    // To check if text is visible
    getcoolDownCard()
      .find("span")
      .should("have.text", commonContants.congratulationText)
      .should("have.class", "text-2xl")
      .and("have.class", "font-bold")
      .and("have.class", "text-gray-900")
  })
})
