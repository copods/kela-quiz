/// <reference types="Cypress"/>
import {
  getBadgeTag,
  getCancelBtn,
  getDialogCloseIcon,
  getDropdown,
  getEmail,
  getInviteBtn,
  getInvitedMemberHeading,
  getInviteMemberBtn,
  getJoinedMemberHeading,
  getMemberDialogHeader,
  getMembersHeading,
  getResendMemberInviteBtn,
  getTableRow,
  getToaster,
} from "support/common-function"
const memberEmail = "johndoe@example.com"
const owner = "Owner"
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

    // Joined memeber heading tests
    // To check if joined memeber heading is visible
    getJoinedMemberHeading().should("be.visible")

    // To check if joined member heading has text
    getJoinedMemberHeading().should("have.text", "Joined Members")

    // To check if joined member heading has tabindex
    getJoinedMemberHeading().should("have.attr", "tabindex", "0")

    // To check if joined member heading has aria label
    getJoinedMemberHeading().should("have.attr", "aria-label", "Joined Members")

    // Invite member heading tests
    // To check if invite member heading is visible
    getInvitedMemberHeading().should("be.visible")

    // To check if invite member heading has text
    getInvitedMemberHeading().should("have.text", "Invited Member")

    // To check if invite member heading has tabindex
    getInvitedMemberHeading().should("have.attr", "tabindex", "0")

    // To check if invite member heading has aria label
    getInvitedMemberHeading().should(
      "have.attr",
      "aria-label",
      "Invited Member"
    )

    // Resend member invite button tests
    // To check if resend member invite button is visible
    getResendMemberInviteBtn().should("be.visible")

    // To check if resend member invite button has tabindex
    getResendMemberInviteBtn().parent().should("have.attr", "tabindex", "0")

    // To check if resend number invite button click opens toster
    getResendMemberInviteBtn().click()
    getToaster().should("have.text", "Invitation Sent Successfully..!")

    // New member tests
    // To check if new member is added
    getTableRow().eq(5).should("have.text", memberEmail)

    // Owner badge tests
    // To check if owner badge is visible
    cy.viewport(1280, 720)
    getBadgeTag().should("be.visible")

    // To check if owner badge has text
    getBadgeTag().should("have.text", owner)
  })
})
