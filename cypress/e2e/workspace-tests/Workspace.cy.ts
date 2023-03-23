import {
  getBadgeTag,
  getCancelEditWorkspaceBtn,
  getConfirmOwnershipBtn,
  getCurrentWorkspace,
  getEditWorkspaceBtn,
  getHr,
  getJoinedMembers,
  getOwnerDropdown,
  getSaveWorkspaceBtn,
  getSettings,
  getSettingsHeading,
  getToaster,
  getTransferOwnership,
  getWorkspaceListMenu,
  getWorkspaceNameInput,
  getWorkspaces,
} from "support/common-function"

const settings = "Settings"
const workspace = "Workspaces"
const edit = "Edit"
const save = "Save"
const cancel = "Cancel"
const defaultWorkspace = "Default Workspace"
const updatedName = "Updated Name"

describe("Test for settings", () => {
  beforeEach(() => {
    // To login
    cy.login()
    cy.customVisit("/members")
  })

  it("Tests to check Attributes/Colors/Visibility/Texts and to check if we can reset the password", () => {
    // To check location and title
    getSettings().should("have.text", settings).click()
    cy.location("pathname").should("include", "/settings/workspace")
    getSettingsHeading().should("have.text", settings)

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

    // To check if current workspace name is correct
    getCurrentWorkspace()
      .should("have.text", defaultWorkspace)
      .should("have.class", "text-base font-medium leading-6 text-gray-900")

    // To check edit, save and cancel button have correct styles
    getEditWorkspaceBtn()
      .should("have.text", edit)
      .should("have.attr", "variant", "primary-solid")
      .should("have.attr", "title", edit)
      .click()

    getSaveWorkspaceBtn()
      .should("have.text", save)
      .should("have.attr", "title", save)
      .should("have.attr", "variant", "primary-solid")

    getCancelEditWorkspaceBtn()
      .should("have.text", cancel)
      .should("have.attr", "title", cancel)
      .should("have.attr", "variant", "primary-outlined")

    // To check if workspace name is updating
    getWorkspaceNameInput().clear().type(updatedName)
    getSaveWorkspaceBtn().click()
    getCurrentWorkspace().should("have.text", updatedName)
    getToaster().should("have.text", "Workspace updated sucessfully..!")

    // To check if error is shown when user tries to submit empty input
    getEditWorkspaceBtn().click()
    getWorkspaceNameInput().clear()
    getSaveWorkspaceBtn().should("have.attr", "disabled")
  })

  it("To check if we can transfer ownership", () => {
    getSettings().click()
    getWorkspaceListMenu().click()
    cy.wait(1000)
    getTransferOwnership().click()
    getOwnerDropdown()
      .click()
      .find("ul")
      .children()
      .each((element, index) => {
        if (index === 0) {
          cy.wrap(element).click()
          return
        }
      })
    getConfirmOwnershipBtn().click()
    getToaster().should("have.text", "Owner updated")
    getJoinedMembers().click()
    cy.viewport(1500, 1000)
    getBadgeTag()
      .should("be.visible")
      .parent()
      .should("contain", "Copods Admin")
  })
})
