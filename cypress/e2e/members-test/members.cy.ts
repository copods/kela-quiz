/// <reference types="Cypress"/>
import {
  getBadgeTag,
  getCancelBtn,
  getDialogCloseIcon,
  getDropdown,
  getEmail,
  getHr,
  getInviteBtn,
  getInvitedMembers,
  getInviteMemberBtn,
  getJoinedMembers,
  getMemberDialogHeader,
  getMembersHeading,
  getResendMemberInviteBtn,
  getToaster,
} from "support/common-function"
const owner = "Owner"
const joinedMembers = "Joined Members"
const invitedMembers = "Invited Members"

describe("Test for members", () => {
  beforeEach("sign-in", () => {
    cy.login()
    cy.customVisit("/members")
  })

  it("Tests to check Attributes/Colors/Visibility/Texts", () => {
    // Header tests
    // To check if header is visible
    getMembersHeading().should("be.visible")

    // To check if header has correct text
    getMembersHeading().should("have.text", "Members")

    // To check if header has tabindex
    getMembersHeading().should("have.attr", "tabindex", "0")

    // To check if header is focused
    getMembersHeading().click().should("have.focus")

    // Invite button tests
    // To check if invite member button is visible
    getInviteMemberBtn().should("be.visible")

    // To check if invite member button has correct text
    getInviteMemberBtn().should("have.text", "Invite Member")

    // To check if invite member button has correct background color
    getInviteMemberBtn().should(
      "have.css",
      "background-color",
      "rgb(53, 57, 136)"
    )

    // Check active tab is Joined Members
    getJoinedMembers()
      .should("have.text", joinedMembers)
      .within(() => {
        getHr().should(
          "have.class",
          "absolute -bottom-0.5 h-0.5 w-full border-0 bg-primary"
        )
      })

    // Invite Dialog tests
    // To check if invite Dialog is visible
    getInviteMemberBtn().click()
    getMemberDialogHeader().should("be.visible")

    // To check if Dialog has correct text
    getMemberDialogHeader().should("have.text", "Invite Member")

    // To check if Dialog has tabindex
    getMemberDialogHeader().should("have.attr", "tabindex", "0")

    // Invite popup tests
    // To check if invite popup close icon is visible
    getDialogCloseIcon().should("be.visible")

    // To check if invite popup close icon has tabindex
    getDialogCloseIcon().should("have.attr", "tabindex", "0")

    // To check if invite popup close icon has role
    getDialogCloseIcon().should("have.attr", "tabindex", "0")

    // Invite popup email input tests
    // To check if invite popup email input is visible
    getEmail().should("be.visible")

    // To check if invite popup email input has tabindex
    getEmail().should("have.attr", "tabindex", "0")

    // To check if invite popup email input has type
    getEmail().should("have.attr", "type", "text")

    // To check if invite popup email input has no value initially
    getEmail().should("not.have.value")

    // Invite popup dropdown tests
    // To check if invite popup dropdown is visible
    getDropdown().should("be.visible")

    // To check if invite popup dropdown has aria label
    getDropdown().should("have.attr", "aria-label", "Select")

    // Cancel Button tests
    // To check if cancel button has correct text
    getCancelBtn().should("have.text", "Cancel")

    // To check if cancel button has tabindex
    getCancelBtn().should("have.attr", "tabindex", "0")

    // To check if cancel button has working functionality
    getCancelBtn().click()

    // Invite button tests
    // To check if invite button is visible
    getInviteMemberBtn().click()
    getInviteBtn().should("be.visible")

    // To check if invite button is disabled
    getInviteBtn().should("have.attr", "disabled")

    // To check if invite button is clickable after all input filled
    getEmail().type("johndoe@example.com")
    getInviteBtn().should("have.css", "background-color", "rgb(53, 57, 136)")
    getCancelBtn().click()

    // Check active tab is Invited Members
    getInvitedMembers().click()
    getInvitedMembers()
      .should("have.text", invitedMembers)
      .within(() => {
        getHr().should(
          "have.class",
          "absolute -bottom-0.5 h-0.5 w-full border-0 bg-primary"
        )
      })

    // Resend member invite button tests
    // To check if resend member invite button is visible
    getResendMemberInviteBtn().should("be.visible")

    // To check if resend member invite button has tabindex
    getResendMemberInviteBtn().parent().should("have.attr", "tabindex", "0")

    // To check if resend number invite button click opens toster
    getResendMemberInviteBtn().click()
    getToaster().should("have.text", "Invitation Sent Successfully..!")

    // Owner badge tests
    // To check if owner badge is visible
    cy.viewport(1500, 1000)
    getBadgeTag().should("be.visible")

    // To check if owner badge has text
    getBadgeTag().should("have.text", owner)
  })
})
