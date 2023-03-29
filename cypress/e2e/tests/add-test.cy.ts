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
  getPaginationDropdown,
  getPaginationDropdownButton,
  getPaginationDetails,
  getPaginationRange,
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
const paginationDropdownItems = ["6 Items", "12 Items", "18 Items", "24 Items"]
describe("Creating assessments", () => {
  beforeEach("sign-in", () => {
    cy.login()

    cy.customVisit("/members")
  })
  it("checks, Add Assessment Page", () => {
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

    /*
     * Checking the visibility of Dropdown
     * Verify if user able to change the dropdown Range
     * That Amount of section is visible
     */
    getPaginationDropdownButton()
      .should("be.visible")
      .should("have.text", "6 Items")
    getSectionInDiv().should("have.length", "5")
    getPaginationDropdownButton().click()
    getPaginationDropdown()
      .should("be.visible")
      .get("li")
      .each((listItems, index) => {
        cy.wrap(listItems).within(() => {
          expect(listItems.find("span")[0].innerText).to.deep.equal(
            paginationDropdownItems[index]
          )
        })
      })
    getPaginationDropdown()
      .get("li")
      .eq(0)
      .should(
        "have.class",
        "relative cursor-pointer select-none py-2 px-8 text-xs text-gray-600 bg-gray-100"
      )

    /**
     * Checking the Visiblity Pagination Range, Styling and its working
     */
    getPaginationRange()
      .should("be.visible")
      .find("span")
      .each((item, index) => {
        expect(item[0].innerText).to.deep.equal((index + 1).toString())
      })
    getPaginationRange().find("span").eq(0).should("have.class", "bg-gray-200")
    getPaginationRange().find("svg").should("have.length", "2")
    getPaginationRange()
      .find("svg")
      .eq(0)
      .should("have.class", "pointer-events-none text-slate-300")

    /**
     * Checking the Visibility Pagination Details, Styling and its working
     */
    getPaginationDetails()
      .should("be.visible")
      .should("have.text", "Showing 1 to 5 of 5")
    getPaginationRange().should("be.visible").find("span").eq(1).click()
    getPaginationRange().find("span").eq(1).should("have.class", "bg-gray-200")
    getSectionInDiv().should("have.length", "2")
    getPaginationRange()
      .find("svg")
      .eq(1)
      .should("have.class", "pointer-events-none text-slate-300")
    getPaginationDetails()
      .should("be.visible")
      .should("have.text", "Showing 4 to 5 of 5")
    getPaginationDropdownButton().click()
    getPaginationDropdown().get("li").eq(1).click()
    getPaginationDropdownButton().should("have.text", "6 Items")
    getSectionInDiv().should("have.length", "5")

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
