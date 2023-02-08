import {
  getDialogCloseIcon,
  getAddSectionBtn,
  getCancelButton,
  getSectionCardByClass,
  getSectionName,
  getSections,
  getSubmitBtn,
  getTestHeading,
  getDialogHeader,
  getTestNameInput,
  getTextArea,
  getActiveSectionCard,
  getSubmitButtonById,
  getSectionDetailsHeading,
  getSectionSearch,
  getQuestionCardWrapper,
  getOptionWrapper,
  getQuestionType,
  getAddEditSectionTitleError,
  addEditSectionDescError,
  duplicateTitleError,
  getSectionLSWrapper,
} from "support/common-function"

const section1 = `Aptitude - section1`
const nameIsReq = "Name is required"
const descIsReq = "Description is required"
const duplicate = "Duplicate Title"
// const deleteSection = `Aptitude - delete-Section`

/// <reference types="Cypress">
describe("Test for Tests", () => {
  beforeEach("sign-in", () => {
    cy.login()
    cy.customVisit("/members")
  })

  it("Tests to check Attributes/Colors/Visibility/Texts", () => {
    // To check initial active state
    getSections().click()
    cy.location().then((loc) => {
      cy.location("search").should("include", loc.search)
    })

    // To check heading is visible, has correct text and has correct attributes
    getTestHeading()
      .should("be.visible")
      .should("have.text", "Tests")
      .should("have.class", "text-3xl font-bold text-black")
      .should("have.attr", "tabindex", "0")
      .click()
      .should("have.focus")

    // To check button is visible, has correct text and has working functionality
    getAddSectionBtn()
      .should("be.visible")
      .should("have.text", "+ Add Test")
      .click()
    cy.get("form > div")
      .should("be.visible")
      .within(() => {
        getCancelButton().click()
      })

    // To check pop up heading and close icon is visible and has correct attributes
    getAddSectionBtn().click()
    getDialogHeader()
      .should("be.visible")
      .should("have.text", "Add Test")
      .should("have.attr", "tabindex", "0")
      .should("have.attr", "aria-label", "Add Test")
      .click()
      .should("have.focus")
    getDialogCloseIcon()
      .should("be.visible")
      .should("have.attr", "tabindex", "0")
      .should("have.attr", "role", "img")

    // To check add and cancel button is visible and have correct attributes
    getSubmitButtonById()
      .should("be.visible")
      .should("have.text", "Add")
      .should("have.attr", "tabindex", "0")
    getCancelButton()
      .should("have.text", "Cancel")
      .should("have.attr", "tabindex", "0")

    // To check if input field and description area is visible and have correct attributes
    cy.get("form > div")
      .should("be.visible")
      .within((el) => {
        getTestNameInput()
          .type(`${section1} ${new Date().getTime()}`)
          .should("be.visible")
          .should("have.attr", "tabindex", "0")
          .click()
          .should("have.focus")
        cy.wait(500)
        getTextArea()
          .should("be.visible")
          .should("have.attr", "tabindex", "0")
          .click()
          .should("be.focus")
      })
    getDialogCloseIcon().click()

    // To check if active test has coorect attribute and has vertical dots
    getActiveSectionCard()
      .should("have.attr", "role", "button")
      .should("have.attr", "tabindex", "0")
      .children()
      .should("have.css", "background-color", "rgb(255, 255, 255)")
      .get(".verticalDots")
      .should("be.visible")

    // To check if tests heading is visible and has correct attributes
    getSectionCardByClass().each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName("sectionName")[0].innerHTML === section1
        ) {
          getSectionName().should("have.text", section1)
        }
      })
    })
    getSectionName().contains(section1).click()
    cy.wait(500)
    getSectionDetailsHeading()
      .should("be.visible")
      .should("have.class", "inline-block text-2xl font-semibold text-gray-700")
      .should("have.attr", "tabindex", "0")
      .click()
      .should("have.focus")

    // To check if search bar is visible and has correct attributes
    getSectionSearch()
      .should("be.visible")
      .should("have.attr", "tabindex", "0")
      .click()
      .should("have.focus")

    // To check if question card is visible and has correct attributes
    getQuestionCardWrapper()
      .should("be.visible")
      .should("have.attr", "tabindex", "0")
      .should("have.attr", "aria-label", "Expand")

    // To check if initially option card has max height 0 and can be expanded by clicking
    getOptionWrapper().should("have.css", "max-height", "0px")
    getQuestionCardWrapper().click()
    getOptionWrapper().should(
      "have.class",
      "overflow-scroll text-base text-gray-600 transition-all h-full"
    )

    // To check if question type chip is visible
    getQuestionCardWrapper().click()
    getQuestionType().should("be.visible")

    // To check if user sees valid error message while adding new tests without title or description and duplicate title
    getAddSectionBtn().click()
    cy.get("form > div").within((el) => {
      getSubmitBtn().click()
    })
    getAddEditSectionTitleError().should("have.text", nameIsReq)
    getTestNameInput().type(`${section1} ${new Date().getTime()}`)
    getSubmitButtonById().click()
    addEditSectionDescError().should("have.text", descIsReq)
    cy.wait(500)
    cy.get("form > div").within((el) => {
      getTestNameInput().clear().type(section1)
      getTextArea().clear().type("Aptitude")
      getSubmitButtonById().click()
    })
    duplicateTitleError().should("have.text", duplicate)
    getDialogCloseIcon().click()

    // To check sort by name and sort by created date
    getSectionLSWrapper().within(() => {
      cy.get("#section-cards")
        .get("#section-link")
        .then((listing) => {
          const listingCount = Cypress.$(listing).length
          expect(listing).to.have.length(listingCount)
          cy.get(".dropdownButton span span", { timeout: 6000 })
            .invoke("text")
            .then((el) => {
              if (el === "Name") {
                cy.get("h2").then(($elements) => {
                  let strings = [...$elements].map(($el) => $el.innerText)
                  expect(strings).to.deep.equal([...strings].sort())
                })
              } else if (el === "Created Date") {
                cy.get(".created-by-date").then(($elements) => {
                  let strings = [...$elements].map(($el) => {
                    return new Date($el.innerText).toLocaleDateString
                  })
                  expect(strings).to.deep.equal([...strings].sort())
                })
              }
            })
        })
    })
  })
})
