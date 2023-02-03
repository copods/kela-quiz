import {
  forgetPasswordCard,
  forgetPasswordHeader,
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
} from 'support/common-function'
import { routes } from '~/constants/route.constants'
const memberEmail = 'johndoe@example.com'
const invalidMemberEmail = 'abc@email.com'
const header = 'Forgot password?'
const enterEmail = 'Enter your email to retrieve your password.'
const resetPassword = 'Reset Password'
const backToLogin = 'Back to login'
const resendPasswordSuccess = 'New password has been sent to email successfully'
const resendPasswordError = 'Account not found. Please enter valid email'

describe('Forgot password', () => {
  beforeEach('forgot-password', () => {
    cy.visit('/forgot-password')
  })
  it('checks forget-password card contain shadow', () => {
    forgetPasswordCard()
      .should('be.visible')
      .should('have.class', `drop-shadow-xl`)
  })
  it('checks forget-password card have correct gap between children components', () => {
    forgetPasswordCard().should('be.visible').should('have.css', `gap`, `24px`)
  })
  it('checks, divider should be visible ', () => {
    getHr().should('be.visible')
  })
  it('checks, divider should contains correct have', () => {
    getHr()
      .should('be.visible')
      .should('have.class', 'h-px w-6/12 border-none bg-gray-500 text-center')
  })
  it('should display a image and have correct size', () => {
    getImg().should('be.visible')
  })
  it('should display a Heading and also contain correct text and css class', () => {
    forgetPasswordHeader()
      .should('be.visible')
      .should('have.text', header)
      .should('have.class', `text-center text-3xl font-bold text-gray-900`)
  })
  it('sub-Heading should have correct text and classes', () => {
    getEmailInfo().should('be.visible')
  })
  it('sub-Heading should be have correct text', () => {
    getEmailInfo()
      .should('be.visible')
      .should('have.text', enterEmail)
      .should('have.class', 'text-center text-xs text-gray-500')
  })
  it('checks, label of email input box should be visible and have correct text', () => {
    getLabel().should('be.visible').should('have.text', 'Email*')
  })

  it('checks, email input field should be focused and correct class', () => {
    getInput()
      .should('be.visible')
      .should(
        'have.class',
        'h-11 w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-lg'
      )
      .click()
      .should('be.focused')
  })

  it('checks, back to login link should have correct text and classes', () => {
    getBackToLogIn()
      .should('have.text', backToLogin)
      .should('have.class', 'cursor-pointer text-sm text-primary')
  })

  it('checks, submit button should have correct text and visible', () => {
    getButton().should('be.visible').should('have.text', resetPassword)
  })
  it('Checking account not found for reset password ,error should have correct message and classes', () => {
    forgetPasswordHeader().should('be.visible', { timeout: 6000 })
    forgetPasswordHeader().should('have.text', header)
    getEmailInput()
      .clear()
      .type(invalidMemberEmail)
      .should('have.value', invalidMemberEmail)
    getResetPassword().click()
    getEmailErrorById()
      .should('be.visible')
      .should('have.text', resendPasswordError)
      .should('have.class', 'text-red-700')
  })

  it('Checking account not found for reset password ', () => {
    forgetPasswordHeader().should('be.visible', { timeout: 6000 })
    forgetPasswordHeader().should('have.text', header)
    getEmailInput()
      .clear()
      .type(invalidMemberEmail)
      .should('have.value', invalidMemberEmail)
    getResetPassword().click()
    getEmailErrorById()
      .invoke('text')
      .then((toastText) => {
        if (toastText === resendPasswordError) {
          cy.location('pathname').should('include', routes.forgotPassword)
        } else {
          cy.get('.Toastify__toast', { timeout: 8000 }).should(
            'have.text',
            resendPasswordSuccess
          )
          cy.location('pathname').should('include', routes.signIn)
        }
      })
  })
  it('Checking for account when it is found for reset password ', () => {
    cy.log('On forget Password page')
    forgetPasswordHeader().should('be.visible', { timeout: 6000 })
    forgetPasswordHeader().should('have.text', header)
    getEmailInput()
      .should('be.visible', { timeout: 6000 })
      .clear()
      .type(memberEmail)
    getResetPassword().click()
  })
})
