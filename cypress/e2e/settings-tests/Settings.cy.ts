import {
  getHr,
  getSettings,
  getSettingsHeading,
  getWorkspaces,
} from "support/common-function"
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
    getSettingsHeading().should("have.text", settings)

    // To check title classes
    getSettingsHeading().should("to.have.class", "text-3xl font-bold")

    // To check active tab is workspace
    getWorkspaces().should("have.text", workspace).click()
    getWorkspaces().within(() => {
      getHr().should(
        "have.class",
        "absolute -bottom-0.5 h-0.5 w-full border-0 bg-primary"
      )
    })

    // To check workspace tab has correct text
    getWorkspaces().should("have.text", workspace)

    // To check active tab is workspace
    getWorkspaces().should("have.text", workspace).click()
    getWorkspaces().within(() => {
      getHr().should(
        "have.class",
        "absolute -bottom-0.5 h-0.5 w-full border-0 bg-primary"
      )
    })
  })
})
