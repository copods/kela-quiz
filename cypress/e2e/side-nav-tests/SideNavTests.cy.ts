import {
  getChangePasswordButton,
  getLogoutButton,
  getMyProfileButton,
  getNavGuideAssessment,
  getNavGuideGeneral,
  getNavGuideResult,
  getSideNavFooterDropdownButton,
  getSideNavUserAvatar,
  getSideNavUserEmail,
  getSideNavUserName,
} from "support/common-function"

const sideNavGroupTitles = {
  results: "Results",
  assessments: "Assessments",
  general: "General",
}
const userName = "Copods Careers"
const userEmail = "copods.demo.sendgrid@gmail.com"
const userAvatarText = "CC"

const dropdownItems = {
  myProfile: "My Profile",
  changePassword: "Change Password",
  logout: "Logout",
}
describe("Test for Logout, SideNav", () => {
  it("Tests to check Attributes/Colors/Visibility/Texts", () => {
    // To login
    cy.login()
    cy.customVisit("/members")

    // To check text, styles of Results title
    getNavGuideResult()
      .should("have.text", sideNavGroupTitles.results)
      .should("have.css", "font-weight", "600")
      .should("have.css", "font-size", "12px")
      .should("have.css", "color", "rgb(156, 163, 175)")

    // To check text, styles of Assessments title
    getNavGuideAssessment()
      .should("have.text", sideNavGroupTitles.assessments)
      .should("have.css", "font-weight", "600")
      .should("have.css", "font-size", "12px")
      .should("have.css", "color", "rgb(156, 163, 175)")

    // To check text, styles of General title
    getNavGuideGeneral()
      .should("have.text", sideNavGroupTitles.general)
      .should("have.css", "font-weight", "600")
      .should("have.css", "font-size", "12px")
      .should("have.css", "color", "rgb(156, 163, 175)")

    // To check text, styles of Username
    cy.wait(1000)
    getSideNavUserName()
      .should("have.text", userName)
      .should("have.css", "color", "rgb(17, 24, 39)")
      .should("have.css", "font-weight", "600")
      .should("have.css", "font-size", "12px")

    // To check text, styles of User email
    getSideNavUserEmail()
      .should("have.text", userEmail)
      .should("have.css", "color", "rgb(107, 114, 128)")
      .should("have.css", "font-size", "12px")
      .should("have.css", "font-weight", "400")

    // To check text, styles of User avatar
    getSideNavUserAvatar()
      .should("have.text", userAvatarText)
      .should("have.css", "font-size", "18px")
      .should("have.css", "font-weight", "500")
      .should("have.css", "color", "rgb(255, 255, 255)")

    // To check dropdown visibility and its items text/styles
    getSideNavFooterDropdownButton().should("be.visible").click()
    getMyProfileButton()
      .should("be.visible")
      .should("have.text", dropdownItems.myProfile)
    getChangePasswordButton()
      .should("be.visible")
      .should("have.text", dropdownItems.changePassword)
    getLogoutButton()
      .should("be.visible")
      .should("have.text", dropdownItems.logout)
    getMyProfileButton()
      .should("have.css", "font-size", "14px")
      .should("have.css", "font-weight", "500")
      .should("have.css", "color", "rgb(0, 0, 0)")
  })
})
