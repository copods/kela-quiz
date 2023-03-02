import {
  getConfirmNewPassword,
  getConfirmPasswordError,
  getDialogCloseIcon,
  getDialogWrapper,
  getGeneral,
  getInputContainerWrapper,
  getLabel,
  getNewPassword,
  getNewPasswordError,
  getOldPassword,
  getPasswordError,
  getResetPasswordPopup,
  getSettings,
  getSubmitBtn,
  getToaster,
  getWorkspaces,
} from "support/common-function"
const settings = "Settings"
const clickToChange = "Click to change"
const general = "General"
const workspace = "Workspaces"
const resetPas = "Reset Password"
const enterOldPassword = "Enter Old Password"
const enterNewPass = "Enter New Password"
const reEnterPass = "Re-Enter Password"
const passNotMatch = "Password do not match"
const passIsInvalid = "Password is invalid"
const passShouldNotBeSame =
  "Current Password and New Password should not be same"

describe("Test for settings", () => {
  it("Tests to check Attributes/Colors/Visibility/Texts and to check if we can reset the password", () => {
    // To login
    cy.login()
    cy.customVisit("/members")

    // To check location and title
    getSettings().should("have.text", settings).click()
    cy.location("pathname").should("include", "/settings/general")
    cy.get("h1").should("have.text", settings)

    // To check title classes
    cy.get("h1").should("to.have.class", "text-3xl font-bold")

    // To check initial active tab is general
    getGeneral().within(() => {
      cy.get("hr").should(
        "have.class",
        "absolute -bottom-0.5 h-0.5 w-full border-0 bg-primary"
      )
    })

    // To check general tab has correct text
    getGeneral().should("have.text", general)

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

    // To check heading in general has correct classes
    getGeneral().click()
    cy.get("h3").should("have.class", "text-lg font-semibold")

    // To check if reset password pop up is opening
    getResetPasswordPopup().should("have.text", clickToChange).click()
    getDialogWrapper().should("be.visible")

    // To check if reset password pop up is closing
    getDialogCloseIcon().click()

    // To check heading of reset password pop up
    getResetPasswordPopup().click()
    cy.get("h2").should("have.text", resetPas)

    // To check if heading of reset password pop up has focus
    cy.get("h2").should("be.focused")

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
    getResetPasswordPopup().click()
    getOldPassword().clear().type("kQuiz@careers")
    getNewPassword().clear().type("kQuiz@copods")
    getConfirmNewPassword().clear().type("kQuiz@copods")
    getSubmitBtn().click()
    getToaster().should("have.text", "Password changed successfully !")
  })
})
