/// <reference types="Cypress"/>
import {
  getAddQuestionBtn,
  getAddSectionBtn,
  getAddWorkspaceBtn,
  getAddWorkspaceInput,
  getDropdown,
  getEmail,
  geth1,
  getPassword,
  getPasswordError,
  getSectionCards,
  getSectionName,
  getSections,
  getSubmitBtn,
  getTestNameInput,
  getTextArea,
  visitSignIn,
  getQuestionWithDropdown,
  getQlEditorWrapper,
  getQlEditor,
  getQlEditorInput,
  getSaveAndExit,
  getSaveAndAddMore,
  getTests,
  getAddTestBtn,
  getAssesmentNameInput,
  getNextBtn,
  getStepsTabs,
  getNumberOfQuestionsInput,
  getTimeInput,
  getAssesmentSubmitBtn,
  getAssesmentQlEditorWrapper,
  getInviteMemberBtn,
  getDialogWrapper,
  getEmailInput,
  getAddMemberModal,
  getInviteBtn,
  getAssessmentsPageTitle,
  getInvitePopup,
} from "support/common-function"

import {
  addQuestion,
  commonConstants,
  cypress,
} from "~/constants/common.constants"
const section1 = `Aptitude - section1`
const test1 = `Aptitude - assessment1`
const deleteTest1 = `Aptitude - assessment2`
const section2 = `Aptitude - section2`
const deleteSection = `Aptitude - delete-Section`
const question = "first-question"
const memberEmail = "johndoe@example.com"

describe("smoke tests", () => {
  beforeEach(() => {
    // This will clear the local storage for every test
    window.localStorage.clear()
  })

  it("Login form validations", () => {
    visitSignIn()

    cy.wait(2000)
    // To check Invalid Email Error
    getEmail().type("test@copods.co")
    getPassword().type("kQuiz@copods")
    getSubmitBtn().click()
    cy.wait(500)
    getPasswordError().should("have.text", "Incorrect email or password")

    // To clear fields
    getEmail().clear()
    getPassword().clear()

    // To check Invalid Password Error
    getEmail().type("copods.demo.sendgrid@gmail.com")
    getPassword().type("anuragpate")
    getSubmitBtn().click()
    cy.wait(500)
    getPasswordError().should("have.text", "Incorrect email or password")

    // To clear fields
    getEmail().clear()
    getPassword().clear()

    // To login
    getEmail().type("copods.demo.sendgrid@gmail.com")
    getPassword().type("kQuiz@copods")
    getSubmitBtn().click()
    cy.wait(1000)

    // To check cookies
    cy.getCookies()
      .should("have.length", 1)
      .then((cookies) => {
        expect(cookies[0]).to.have.property("name", "__session")
      })
  })

  it("Creating Workspace", () => {
    // To Login
    cy.login()

    // To add workspace
    cy.customVisit("/members")
    cy.location("pathname").should("include", "/members")
    cy.wait(500)

    const randomWorkSpaceName = `workSpace-${(Math.random() + 1)
      .toString(36)
      .substring(7)}`

    getDropdown()
      .click()
      .find("ul")
      .children()
      .each((element, index) => {
        if (index === 0) {
          cy.wrap(element).click()
          return
        }
      })

    getAddWorkspaceInput()
      .type(randomWorkSpaceName)
      .should("have.attr", "value", randomWorkSpaceName)

    getAddWorkspaceBtn().click()

    getDropdown()
      .click()
      .find("ul")
      .find("li")
      .should((item) => {
        expect(item.length).to.be.greaterThan(1)
      })
  })

  it("Creating sections", () => {
    // To Login
    cy.login()
    cy.customVisit("/members")

    // To add sections
    getSections().should("have.text", "Tests").click()

    // Section 1
    getAddSectionBtn().click()
    cy.get("form > div")
      .should("be.visible")
      .within((el) => {
        getTestNameInput().type(section1)
        getTextArea().type("Aptitude")
        getSubmitBtn().click()
      })
    cy.wait(1000)

    // Section 2
    getAddSectionBtn().click()
    cy.get("form > div")
      .should("be.visible")
      .within((el) => {
        getTestNameInput().type(section2)
        getTextArea().type("Aptitude")
        getSubmitBtn().click()
      })
    cy.wait(1000)

    // Delete Section
    getAddSectionBtn().click()
    cy.get("form > div")
      .should("be.visible")
      .within((el) => {
        getTestNameInput().type(deleteSection)
        getTextArea().type("Aptitude")
        getSubmitBtn().click()
      })
  })

  it("Adding Questions in Sections", () => {
    // To Login
    cy.login()
    cy.customVisit("/members")
    getSections().should("have.text", "Tests").click()

    // Add Question 1 to Section 1
    getSectionCards().each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName("sectionName")[0].innerHTML === section1
        ) {
          cy.get(".sectionName").contains(section1)
        }
      })
    })
    cy.wait(1000)
    getSectionName().contains(section1).click()
    cy.wait(1000)
    getAddQuestionBtn()
      .should("have.text", `+ ${addQuestion.addQuestion}`)
      .click()
    cy.location("pathname").should("include", "/add-question")
    geth1().should("be.visible")
    getQuestionWithDropdown().click()
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
    cy.wait(500)

    getQlEditorWrapper().within(() => {
      getQlEditor().type(cypress.useRef).should("have.text", cypress.useRef)
    })
    getQlEditorInput().clear().type(cypress.useRefAns)
    getSaveAndAddMore().click()
    cy.wait(500)

    // Add Question 2 to Section 1
    cy.location("pathname").should("include", "/add-question")
    geth1().should("be.visible")
    getQuestionWithDropdown().click()
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
    cy.wait(500)

    getQlEditorWrapper().within(() => {
      getQlEditor().type(question).should("have.text", question)
    })
    getQlEditorInput().clear().type(cypress.useRefAns)
    getSaveAndExit().click()

    // Add Question to Section 2
    getSectionCards().each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName("sectionName")[0].innerHTML === section2
        ) {
          cy.get(".sectionName").contains(section2)
        }
      })
    })
    cy.wait(1000)
    getSectionName().contains(section2).click()
    cy.wait(1000)
    getAddQuestionBtn()
      .should("have.text", `+ ${addQuestion.addQuestion}`)
      .click()
    cy.location("pathname").should("include", "/add-question")
    geth1().should("be.visible")
    getQuestionWithDropdown().click()
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
    cy.wait(500)

    getQlEditorWrapper().within(() => {
      getQlEditor().type(cypress.useMemo).should("have.text", cypress.useMemo)
    })
    getQlEditorInput().clear().type(cypress.useMemo)
    getSaveAndExit().click()
    cy.wait(500)
  })

  it("Creating Assesments", () => {
    // To Login
    cy.login()
    cy.customVisit("/members")
    getTests().should("have.text", "Assessments").click()

    // To add Assesment 1
    getAddTestBtn().click()
    cy.location("pathname").should("include", "/assessments/add-assessment")
    getAssesmentNameInput().type(deleteTest1)
    getAssesmentQlEditorWrapper().within(() => {
      getQlEditor().type("Test Description")
    })
    getNextBtn().should("have.text", cypress.next).click()

    getStepsTabs().each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName("stepsName")[0].innerHTML ===
          cypress.step1
        ) {
          cy.get(".stepsName").should("have.text", cypress.step1)
        } else if (
          el[0].getElementsByClassName("stepsName")[0].innerHTML ===
          cypress.step2
        ) {
          cy.get(".stepsName").should("have.text", cypress.step2)
        }
      })
    })

    cy.get("div#section").each((el) => {
      cy.wrap(el).within(() => {
        if (el.find(".count")[0].innerText != "0") {
          getNumberOfQuestionsInput().should("have.disabled", true)
          getTimeInput().should("have.disabled", true)
          cy.get("button").should("have.text", commonConstants.add).click()
          cy.get("button").should("have.text", cypress.remove)

          getNumberOfQuestionsInput().clear().type("1")
          getTimeInput().clear().type("1")
        }
      })
    })

    getNextBtn().click()

    getStepsTabs().each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName("stepsName")[0].innerHTML ===
          cypress.step1
        ) {
          cy.get(".stepsName").should("have.text", cypress.step1)
        } else if (
          el[0].getElementsByClassName("stepsName")[0].innerHTML ===
          cypress.step2
        ) {
          cy.get(".stepsName").should("have.text", cypress.step2)
        } else if (
          el[0].getElementsByClassName("stepsName")[0].innerHTML ===
          cypress.step3
        ) {
          cy.get(".stepsName").should("have.text", cypress.step3)
        }
      })
    })

    getAssesmentSubmitBtn().should("have.text", commonConstants.submit).click()

    // To add Assesment 2
    getAddTestBtn().click()
    cy.location("pathname").should("include", "/assessments/add-assessment")
    getAssesmentNameInput().type(test1)
    getAssesmentQlEditorWrapper().within(() => {
      getQlEditor().type("Test Description")
    })
    getNextBtn().should("have.text", cypress.next).click()

    getStepsTabs().each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName("stepsName")[0].innerHTML ===
          cypress.step1
        ) {
          cy.get(".stepsName").should("have.text", cypress.step1)
        } else if (
          el[0].getElementsByClassName("stepsName")[0].innerHTML ===
          cypress.step2
        ) {
          cy.get(".stepsName").should("have.text", cypress.step2)
        }
      })
    })

    cy.get("div#section").each((el) => {
      cy.wrap(el).within(() => {
        if (el.find(".count")[0].innerText != "0") {
          getNumberOfQuestionsInput().should("have.disabled", true)
          getTimeInput().should("have.disabled", true)
          cy.get("button").should("have.text", commonConstants.add).click()
          cy.get("button").should("have.text", cypress.remove)

          getNumberOfQuestionsInput().clear().type("1")
          getTimeInput().clear().type("1")
        }
      })
    })

    getNextBtn().click()

    getStepsTabs().each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName("stepsName")[0].innerHTML ===
          cypress.step1
        ) {
          cy.get(".stepsName").should("have.text", cypress.step1)
        } else if (
          el[0].getElementsByClassName("stepsName")[0].innerHTML ===
          cypress.step2
        ) {
          cy.get(".stepsName").should("have.text", cypress.step2)
        } else if (
          el[0].getElementsByClassName("stepsName")[0].innerHTML ===
          cypress.step3
        ) {
          cy.get(".stepsName").should("have.text", cypress.step3)
        }
      })
    })

    getAssesmentSubmitBtn().should("have.text", commonConstants.submit).click()
  })

  it("Inviting new member", () => {
    // To Login
    cy.login()
    cy.customVisit("/members")

    // To invite member
    getInviteMemberBtn().should("have.text", "Invite Member").click()
    getDialogWrapper().should("be.visible")
    getEmailInput().type(memberEmail).should("have.value", memberEmail)
    getAddMemberModal().find(".dropdownButton").click()
    cy.get("ul").contains("Recruiter").click()
    getInviteBtn().click()
  })

  it("Invite candidate for Assessment", () => {
    cy.viewport(1200, 1000)

    // To Login
    cy.login()
    cy.customVisit("/members")

    getTests().should("have.text", "Assessments").click()
    getAssessmentsPageTitle().should("have.text", "Assessments")
    getInvitePopup().should("be.visible").click()
    getEmailInput()
      .type("johndoe@example.com")
      .should("have.focus")
      .should("have.value", "johndoe@example.com")
    getSubmitBtn().click()
  })

  it("Test to check Page Not Found", () => {
    // To Login
    cy.login()
    cy.customVisit("/members")

    // To check Page Not Found fallback
    cy.location().then((res) => {
      cy.customVisit(`${res.pathname}-error`)
    })
    cy.contains("That's an error.")
  })
})
