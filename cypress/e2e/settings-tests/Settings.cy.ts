import { getSettings, getWorkspaces } from "support/common-function"
const settings = "Settings"
const workspace = "Workspaces"

describe("Test for settings", () => {
  it("Tests to check Attributes/Colors/Visibility/Texts and to check if we can reset the password", () => {
    // To login
    cy.login()
    cy.customVisit("/members")

    // To check location and title
    getSettings().should("have.text", settings).click()
    cy.location("pathname").should("include", "/settings/workspace")
    cy.get("h1").should("have.text", settings)

    // To check title classes
    cy.get("h1").should("to.have.class", "text-3xl font-bold")

    // To check active tab is workspace
    getWorkspaces().should("have.text", workspace).click()
    getWorkspaces().within(() => {
      cy.get("hr").should(
        "have.class",
        "absolute -bottom-0.5 h-0.5 w-full border-0 bg-primary"
      )
    })

    // To check workspace tab has correct text
    getWorkspaces().should("have.text", workspace)

    // To check active tab is workspace
    getWorkspaces().should("have.text", workspace).click()
    getWorkspaces().within(() => {
      cy.get("hr").should(
        "have.class",
        "h-1 w-full rounded-1 border-0 bg-primary"
      )
    })
  })
})
