import {
  getAddTestBtn,
  getAssesPageTitle,
  getAssesmentNameInput,
  getAssesmentQlEditorWrapper,
  getBackBtnInBtn,
  getBackButton,
  getButton,
  getNextBtn,
  getNextBtnInBtn,
  getNumberOfQuestionsInput,
  getQlEditor,
  getSectionInDiv,
  getStepsTabs,
  getSubmitButtonById,
  getTests,
  getTimeInput,
} from "support/common-function"

const step1 = "Step 1"
const step2 = "Step 2"
const step3 = "Step 3"
const back = "Back"
const preview = "Preview"
const assessmentDetails = "Assessment Details"
const selectSections = "Select Sections"
const test = `Aptitude - section`
const addAssessmentPageTitle = "Add Assessment"
const addTestPageButtons = {
  next: "Next",
  back: "Back",
  submit: "Submit",
}
describe("Creating assessments", () => {
  beforeEach("sign-in", () => {
    cy.login()

    cy.customVisit("/members")
  })
  it("chceks, Add Assessment Page", () => {
    getTests().click()
    getAddTestBtn().click()
    cy.location("pathname", { timeout: 60000 }).should(
      "include",
      "/assessments/add-assessment"
    )

    // Checks add assessment page title
    getAssesPageTitle().should("have.text", addAssessmentPageTitle)
    getAssesPageTitle().should("have.css", "font-weight", "700")
    getAssesPageTitle().should("have.css", "color", "rgb(0, 0, 0)")
    getAssesPageTitle().should("have.css", "font-size", "30px")

    //Verify if next button is disabled if user do not provide name and description
    getNextBtnInBtn().should("have.text", "Next").should("have.disabled", true)

    // Checks next button
    getNextBtn().should("have.text", addTestPageButtons.next)
    getNextBtn().should("have.css", "color", "rgb(249, 250, 251)")
    getNextBtn().should("have.css", "font-size", "12px")
    getNextBtn().should("have.css", "font-weight", "500")
    getNextBtn().should("have.css", "font-weight", "500")
    getNextBtn().should("have.css", "background-color", "rgb(162, 164, 214)")
    getNextBtn().should("have.css", "padding", "10px 28px")
    getAssesmentNameInput().clear().type(test)
    getAssesmentQlEditorWrapper().within(() => {
      getQlEditor().type(`Test Description`)
    })
    getNextBtn().should("have.css", "cursor", "pointer")

    //back button
    getBackButton().should("have.text", addTestPageButtons.back)
    getBackButton().should("have.css", "color", "rgb(249, 250, 251)")
    getBackButton().should("have.css", "font-size", "12px")
    getBackButton().should("have.css", "font-weight", "500")
    getBackButton().should("have.css", "background-color", "rgb(162, 164, 214)")
    getNextBtn().should("have.css", "padding", "10px 28px")
    getAssesmentNameInput().clear().type(test)
    getAssesmentQlEditorWrapper().within(() => {
      getQlEditor().clear().type(`Test Description`)
    })
    getNextBtn().click()
    getBackButton().should("have.css", "cursor", "pointer").click()

    //checks submit button
    getAssesmentNameInput().clear().type(test)
    getAssesmentQlEditorWrapper().within(() => {
      getQlEditor().type(`Test Description`)
    })
    getNextBtn().click()
    // Verify if user able to add section and able to input total questions and time
    getSectionInDiv().each((el) => {
      cy.wrap(el).within(() => {
        if (el.find(".count")[0].innerText != "0") {
          getButton().click()
          // Verify if user able to remove added section and able to input total questions and time
          getNumberOfQuestionsInput().clear().type("1")
          getTimeInput().clear().type("1")
        }
      })
    })
    getNextBtn().click()
    getSubmitButtonById().should("have.text", addTestPageButtons.submit)
    getSubmitButtonById().should("have.css", "padding", "10px 28px")
    getSubmitButtonById().should(
      "have.css",
      "background-color",
      "rgb(53, 57, 136)"
    )
    getSubmitButtonById().should("have.css", "font-weight", "500")
    getSubmitButtonById().should("have.css", "font-size", "12px")
    getSubmitButtonById().should("have.css", "cursor", "pointer")
    getSubmitButtonById().should("have.css", "color", "rgb(249, 250, 251)")

    //checks add assessment have 3 tabs
    getStepsTabs().each(($el) => {
      cy.wrap($el).within((el) => {
        if (el[0].getElementsByClassName("stepsName")[0].innerHTML === step1) {
          cy.get(".stepsName").should("have.text", step1)
        } else if (
          el[0].getElementsByClassName("stepsName")[0].innerHTML === step2
        ) {
          cy.get(".stepsName").should("have.text", step2)
        } else if (
          el[0].getElementsByClassName("stepsName")[0].innerHTML === step3
        ) {
          cy.get(".stepsName").should("have.text", step3)
        }
      })
    })
    cy.get("#0").find(".text-gray-500").should("have.text", assessmentDetails)
    cy.get("#1").find(".text-gray-500").should("have.text", selectSections)
    cy.get("#2").find(".text-gray-500").should("have.text", preview)
    getBackButton().click()
    getBackButton().click()

    //Verify on clicking back button on step 2 user navigate back to step 2
    getAssesmentNameInput().clear().type(test)
    getAssesmentQlEditorWrapper().within(() => {
      getQlEditor().type(`Test Description`)
    })
    getStepsTabs().each(($el) => {
      cy.wrap($el).within((el) => {
        if (el[0].getElementsByClassName("stepsName")[0].innerHTML === step2) {
          cy.get(".stepsName").click()
        }
      })
    })
    getBackBtnInBtn().should("have.text", back).click()
  })
})
