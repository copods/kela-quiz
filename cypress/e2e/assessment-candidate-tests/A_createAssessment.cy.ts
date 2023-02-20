import {
  getAddQuestionBtn,
  getAddSectionBtn,
  getAddTestBtn,
  getAssesmentNameInput,
  getAssesmentQlEditorWrapper,
  getAssesmentSubmitBtn,
  geth1,
  getNextBtn,
  getQlEditor,
  getQlEditorInput,
  getQlEditorWrapper,
  getQuestionWithDropdown,
  getSaveAndAddMore,
  getSaveAndExit,
  getSectionName,
  getSections,
  getSubmitBtn,
  getTestNameInput,
  getTests,
  getTextArea,
} from "support/common-function"

const commonConstants = {
  test1: `Quantitative - assessment1`,
  add: "Add",
  submit: "Submit",
  section1: "Quantitive - section1",
  section2: "Quantitive - section2",
  addQuestion: "Add Question",
  useRef: "What is useRef() ?",
  useRefAns: "It allows you to persist values between renders.",
  useMemo: "What is useMemo() ?",
  useMemoAns:
    "The useMemo Hook can be used to keep expensive, resource intensive functions from needlessly running.",
  next: "Next",
  remove: "Remove",
}

describe("Creating new assessment", () => {
  // creating test data
  it("Adding two section", () => {
    cy.viewport(1280, 1000)
    cy.login()
    cy.customVisit("/members")

    //To add sections
    getSections().should("have.text", "Tests").click()

    //Section 1
    getAddSectionBtn().click()
    cy.get("form > div")
      .should("be.visible")
      .within((el) => {
        getTestNameInput().type(commonConstants?.section1)
        getTextArea().type("Aptitude")
        getSubmitBtn().click()
      })
    cy.wait(1000)

    //Section 2
    getAddSectionBtn().click()
    cy.get("form > div")
      .should("be.visible")
      .within((el) => {
        getTestNameInput().type(commonConstants?.section2)
        getTextArea().type("Aptitude")
        getSubmitBtn().click()
      })
    cy.wait(1000)
  })

  it("Adding Questions in Sections", () => {
    cy.login()
    cy.customVisit("/members")
    getSections().should("have.text", "Tests").click()
    cy.wait(1000)
    getSectionName().contains(commonConstants?.section1).click()
    cy.wait(1000)
    getAddQuestionBtn().click()
    cy.get("#Question").get("#dropdown-container").click()
    cy.get("ul").within(() => {
      cy.get("li").within(() => {
        cy.get("div").then((el) => {
          ;[...el].map((el) => {
            if (el.innerText === "Text") {
              el.click()
            }
            return null
          })
        })
      })
    })
    cy.wait(1000)
    getQlEditorWrapper().within(() => {
      getQlEditor().type(commonConstants?.useRef)
    })
    getQlEditorInput().clear().type(commonConstants?.useRefAns)
    getSaveAndExit().click()
    cy.wait(2000)

    //Add Question to Section2
    getSectionName().contains(commonConstants?.section2).click()
    cy.wait(1000)
    getAddQuestionBtn()
      .should("have.text", `+ ${commonConstants?.addQuestion}`)
      .click()
    geth1().should("be.visible")
    getQuestionWithDropdown().click()
    cy.get("ul").within(() => {
      cy.get("li").within(() => {
        cy.get("div").then((el) => {
          ;[...el].map((el) => {
            if (el.innerText === "Multiple Choice") {
              el.click()
            }
            return null
          })
        })
      })
    })
    cy.wait(1000)

    getQlEditorWrapper().within(() => {
      getQlEditor().type(commonConstants?.useMemo)
    })
    getQlEditor().eq(1).clear().type(commonConstants?.useMemoAns)
    cy.get(".checkBox").eq(0).click()
    getQlEditor().eq(2).clear().type("secound option")
    getQlEditor().eq(3).clear().type("third option")
    getQlEditor().eq(4).clear().type("fourth option")
    getSaveAndAddMore().click()
    cy.wait(500)

    getQlEditorWrapper().within(() => {
      getQlEditor().type(commonConstants?.useMemo)
    })
    getQlEditor().eq(1).clear().type(commonConstants?.useMemoAns)
    cy.get(".checkBox").eq(0).click()
    getQlEditor().eq(2).clear().type("secound option")
    cy.get(".checkBox").eq(1).click()
    getQlEditor().eq(3).clear().type("third option")
    getQlEditor().eq(4).clear().type("fourth option")
    getSaveAndExit().click()
  })

  it("creating assessment ", () => {
    //To Login
    cy.login()
    cy.customVisit("/members")
    getTests().should("have.text", "Assessments").click()

    //To add Quantitative assessment
    getAddTestBtn().click()
    getAssesmentNameInput().type(commonConstants.test1)
    getAssesmentQlEditorWrapper().within(() => {
      getQlEditor().type("Test Description")
    })
    getNextBtn().should("have.text", commonConstants?.next).click()

    // user reached to step 2
    cy.get("div#section").each((el) => {
      cy.wrap(el).within(() => {
        if (
          el.find("[data-cy='sectionHeading']")[0].innerText ===
            commonConstants.section1 ||
          el.find("[data-cy='sectionHeading']")[0].innerText ===
            commonConstants.section2
        ) {
          cy.get("button").should("have.text", commonConstants.add).click()
          cy.wait(2000)
          cy.get("button").should("have.text", commonConstants?.remove)
        }
      })
    })
    getNextBtn().click()
    getAssesmentSubmitBtn().should("have.text", commonConstants.submit).click()
  })
})
