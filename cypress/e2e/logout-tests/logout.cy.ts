import {
  getLogoutBtn,
  getSideNavFooterDropdownButton,
} from "support/common-function"

describe("Tests for Logout", () => {
  it("Test to check logout functionality/styling", () => {
    cy.login()
    cy.customVisit("/members")

    getSideNavFooterDropdownButton().click()

    // To check if logout has correct text/style
    getLogoutBtn().should("be.visible").should("have.text", "Logout").click()

    // To check if correct page is shown after logout
    cy.url().should("include", "/sign-in")
  })
})
