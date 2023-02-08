import {
  getForgetPasswordCard,
  getForgetPasswordHeader,
  getBackToLogIn,
  getButton,
  getEmailErrorById,
  getEmailInfo,
  getEmailInput,
  getHr,
  getImg,
  getInput,
  getLabel,
  getResetPassword,
  getToastMessage,
} from "support/common-function"
import { routes } from "~/constants/route.constants"
const memberEmail = "johndoe@example.com"
const invalidMemberEmail = "abc@email.com"
const header = "Forgot password?"
const enterEmail = "Enter your email to retrieve your password."
const resetPassword = "Reset Password"
const backToLogin = "Back to login"
const resendPasswordSuccess = "New password has been sent to email successfully"
const resendPasswordError = "Account not found. Please enter valid email"

describe("Forgot password", () => {
  it("Tests to check Attributes/Colors/Visibility/Texts", () => {
    cy.visit("/forgot-password")

    // To check if forgot password card contains shadow
    getForgetPasswordCard()
      .should("be.visible")
      .should("have.class", `drop-shadow-xl`)

    // To check forgot password card gap
    getForgetPasswordCard().should("have.css", `gap`, `24px`)

    // To check if divider is visible
    getHr().should("be.visible")

    // To check if divider has correct class
    getHr().should(
      "have.class",
      "h-px w-6/12 border-none bg-gray-500 text-center"
    )

    // To check if image is visible
    getImg().should("be.visible")

    // To check if heading is visible, has correct text and has correct css class
    getForgetPasswordHeader()
      .should("be.visible")
      .should("have.text", header)
      .should("have.class", `text-center text-3xl font-bold text-gray-900`)

    // To check sub heading has correct text and has correct classes and is visible
    getEmailInfo()
      .should("be.visible")
      .should("have.text", enterEmail)
      .should("have.class", "text-center text-xs text-gray-500")

    // To check if email input is visible, have correct text and has label
    getLabel().should("be.visible").should("have.text", "Email*")

    // To check if email input is focused and has correct class
    getInput()
      .should("be.visible")
      .should(
        "have.class",
        "h-11 w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-lg"
      )
      .click()
      .should("be.focused")

    // To check if login link has correct text and has correct class
    getBackToLogIn()
      .should("have.text", backToLogin)
      .should("have.class", "cursor-pointer text-sm text-primary")

    // To check if submit button has correct text and is visible
    getButton().should("be.visible").should("have.text", resetPassword)

    // To check if account not found error has correct message and classes
    getForgetPasswordHeader().should("be.visible").should("have.text", header)
    getEmailInput()
      .clear()
      .type(invalidMemberEmail)
      .should("have.value", invalidMemberEmail)
    getResetPassword().click()
    getEmailErrorById()
      .should("be.visible")
      .should("have.text", resendPasswordError)
      .should("have.class", "text-red-700")

    // To check account not found for reset password
    getEmailInput()
      .clear()
      .type(invalidMemberEmail)
      .should("have.value", invalidMemberEmail)
    getResetPassword().click()
    getEmailErrorById()
      .invoke("text")
      .then((toastText) => {
        if (toastText === resendPasswordError) {
          cy.location("pathname").should("include", routes.forgotPassword)
        } else {
          getToastMessage().should("have.text", resendPasswordSuccess)
          cy.location("pathname").should("include", routes.signIn)
        }
      })

    // To check if account is found for reset password
    getEmailInput().clear().type(memberEmail)
    getResetPassword().click()
  })
})
