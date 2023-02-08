import {
  getCopyLinkId,
  getEmailInput,
  getFirstName,
  getGroupByItemTest,
  getGroupByTestId,
  geth1,
  getInvitePopup,
  getLastName,
  getRegistrationButtonId,
  getSubmitBtn,
  getVeriticalIconId,
} from "support/common-function"

describe("Test for Candidate assessment Registration", () => {
  const emailId = Math.random()
  let examLink = ""

  it("Check candidate is in correct exam link", () => {
    cy.login()
    cy.customVisit("/members")
    getGroupByTestId().click()
    cy.get("a").find("#tests").click()
    getInvitePopup().click()
    getEmailInput().type(`ki${emailId}@copods.co`)
    getSubmitBtn().click()
    getGroupByTestId().click()
    getGroupByItemTest().each((el) => {
      const itemText = el.text()
      if (itemText === "Quantitative - assessment1") {
        cy.wrap(el).click()
      }
    })
    getVeriticalIconId().click()
    getCopyLinkId().should("be.visible").click()
    cy.wrap(
      Cypress.automation("remote:debugger:protocol", {
        command: "Browser.grantPermissions",
        params: {
          permissions: ["clipboardReadWrite", "clipboardSanitizedWrite"],
          origin: window.location.origin,
        },
      })
    )

    cy.window()
      .its("navigator.clipboard")
      .invoke("readText")
      .then((text) => {
        examLink = text.split("3000")[1]
        cy.visit(examLink)
      })
  })

  it("Tests to check Attributes/Colors/Visibility/Texts", () => {
    cy.visit(examLink)

    // To check if heading is visible
    geth1().should("be.visible")

    // To check if first and last name field
    getFirstName()
      .should("be.visible")
      .should("have.attr", "placeholder", "Enter first name")

    getLastName()
      .should("be.visible")
      .should("have.attr", "placeholder", "Enter last name")

    // To check if button is disabled
    getRegistrationButtonId().should("be.disabled")

    // To check if button color is correct when disabled
    getRegistrationButtonId().should(
      "have.css",
      "background-color",
      "rgb(162, 164, 214)"
    )

    // To check if first name is empty the button should be disabled
    getFirstName().should("be.visible").should("be.empty")
    getLastName().should("be.visible").type("tester")
    getRegistrationButtonId().should("be.disabled")

    // To check if last name is empty the button should be disabled
    getFirstName().clear().type("tester")
    getLastName().clear().should("be.empty")
    getRegistrationButtonId().should("be.disabled")

    // To check if form is submitting
    getFirstName().clear().type("aa")
    getLastName().clear().type("Jain")
    getRegistrationButtonId().click()
    cy.url().should("include", `${examLink}/verification`)
  })
})
