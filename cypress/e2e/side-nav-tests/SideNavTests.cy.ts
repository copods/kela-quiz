import {
  getChangePasswordButton,
  getConfirmNewPassword,
  getConfirmPasswordError,
  getDialogCloseIcon,
  getDialogWrapper,
  getInputContainerWrapper,
  getLabel,
  getLogoutButton,
  getMyProfileButton,
  getNavGuideAssessment,
  getNavGuideGeneral,
  getNavGuideResult,
  getNewPassword,
  getNewPasswordError,
  getOldPassword,
  getPasswordError,
  getSideNavFooterDropdownButton,
  getSideNavUserAvatar,
  getSideNavUserEmail,
  getSideNavUserName,
  getSubmitBtn,
  getToaster,
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

const resetPas = "Reset Password"
const enterOldPassword = "Enter Old Password"
const enterNewPass = "Enter New Password"
const reEnterPass = "Re-Enter Password"
const passNotMatch = "Password do not match"
const passIsInvalid = "Password is invalid"
const passShouldNotBeSame =
  "Current Password and New Password should not be same"

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

    //To check change password is working properly
    getChangePasswordButton().click()
    getDialogWrapper().should("be.visible")

    // To check if reset password pop up is closing
    getDialogCloseIcon().click()

    // To check heading of reset password pop up
    getSideNavFooterDropdownButton().should("be.visible").click()
    getChangePasswordButton().click()
    cy.get("h2").should("have.text", resetPas)

    // To check if reset password pop up has input fields
    getOldPassword().should("be.visible")
    getNewPassword().should("be.visible")
    getConfirmNewPassword().should("be.visible")

    // To check if there is gap between input fields
    getInputContainerWrapper().should("have.css", `gap`, `24px`)

    // To check if old password input has focus when clicked
    getOldPassword().click().should("be.focused")

    // To check if new password input has focus when clicked
    getNewPassword().click().should("be.focused")

    // To check if confirm new password input has focus when clicked
    getConfirmNewPassword().click().should("be.focused")

    // To check if old password input has correct label
    getOldPassword()
      .parent()
      .parent()
      .within(() => {
        getLabel().should("have.text", enterOldPassword + "*")
      })

    // To check if new password input has correct label
    getNewPassword()
      .parent()
      .parent()
      .within(() => {
        getLabel().should("have.text", enterNewPass + "*")
      })

    // To check if confirm new password input has correct label
    getConfirmNewPassword()
      .parent()
      .parent()
      .within(() => {
        getLabel().should("have.text", reEnterPass + "*")
      })

    // To check if old password input has correct classes
    getOldPassword()
      .parent()
      .parent()
      .within(() => {
        getLabel().should("have.class", "text-gray-800")
      })

    // To check if new password input has correct classes
    getNewPassword()
      .parent()
      .parent()
      .within(() => {
        getLabel().should("have.class", "text-gray-800")
      })

    // To check if confirm new password input has correct classes
    getConfirmNewPassword()
      .parent()
      .parent()
      .within(() => {
        getLabel().should("have.class", "text-gray-800")
      })

    // To check if submit button is disabled if all fields are not filled
    getSubmitBtn().should("have.class", "disabled:bg-primaryDisabled")

    // To check if submit button is enabled when all fields are filled
    getOldPassword().type("password")
    getNewPassword().type("newPassword")
    getConfirmNewPassword().type("confirmPassword")
    getSubmitBtn().should("be.disabled")

    // To check submit button text
    getSubmitBtn().should("have.text", resetPas)

    // To check if values are not matched we see a error
    getConfirmNewPassword().blur()
    getConfirmPasswordError().should("have.text", passNotMatch)

    // To check if new password and confirm password values dont match
    getOldPassword().clear().type("password")
    getNewPassword().clear().type("newPassword")
    getConfirmNewPassword().clear().type("confirmPassword")
    getConfirmPasswordError().should("have.class", "text-red-700")

    // To check if old password is not matched user sees error
    getOldPassword().clear().type("password")
    getNewPassword().clear().type("kQuiz@copods")
    getConfirmNewPassword().clear().type("kQuiz@copods")
    getSubmitBtn().click()
    getPasswordError()
      .should("have.text", passIsInvalid)
      .should("have.class", "text-red-700")

    // To check if old password and new password is same throws an error
    getOldPassword().clear().type("kQuiz@copods")
    getNewPassword().clear().type("kQuiz@copods")
    getConfirmNewPassword().clear().type("kQuiz@copods")
    getSubmitBtn().click()
    getNewPasswordError().should("have.text", passShouldNotBeSame)

    // Change password
    getOldPassword().clear().type("kQuiz@copods")
    getNewPassword().clear().type("kQuiz@careers")
    getConfirmNewPassword().clear().type("kQuiz@careers")
    getSubmitBtn().click()
    getToaster().should("have.text", "Password changed successfully !")

    // Change password to old once
    getSideNavFooterDropdownButton().should("be.visible").click()
    getChangePasswordButton().click()
    getOldPassword().clear().type("kQuiz@careers")
    getNewPassword().clear().type("kQuiz@copods")
    getConfirmNewPassword().clear().type("kQuiz@copods")
    getSubmitBtn().click()
    getToaster().should("have.text", "Password changed successfully !")
  })
})
