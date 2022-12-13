import {
  forgotPasswordConstants,
  statusCheck,
} from '~/constants/common.constants'
import { routes } from '~/constants/route.constants'
const memberEmail = 'johndoe@example.com'
const invalidMemberEmail = 'abc@email.com'

describe('Forgot password', () => {
  beforeEach('forgot-password', () => {
    cy.visit('/forgot-password')
  })
  it('checks forget-password card contain shadow', () => {
    cy.get('#forget-password-card')
      .should('be.visible')
      .should('have.class', `drop-shadow-xl`)
  })
  it('checks forget-password card have correct gap between children components', () => {
    cy.get('#forget-password-card')
      .should('be.visible')
      .should('have.css', `gap`, `24px`)
  })
  it('checks, divider should be visible ', () => {
    cy.get('hr').should('be.visible')
  })
  it('checks, divider should contains correct have', () => {
    cy.get('hr')
      .should('be.visible')
      .should('have.class', 'h-px w-6/12 border-none bg-gray-500 text-center')
  })
  it('should display a image and have correct size', () => {
    cy.get('img').should('be.visible')
  })
  it('should display a Heading and also contain correct text', () => {
    cy.get('#forget-pass-header')
      .should('be.visible')
      .should('have.text', forgotPasswordConstants.header)
  })
  it('should display a Heading and also contain correct classes', () => {
    cy.get('#forget-pass-header')
      .should('be.visible')
      .should('have.class', `text-center text-3xl font-bold text-gray-900`)
  })
  it('sub-Heading should be visible', () => {
    cy.get('#enter-mail-info').should('be.visible')
  })
  it('sub-Heading should be have correct text', () => {
    cy.get('#enter-mail-info')
      .should('be.visible')
      .should('have.text', forgotPasswordConstants.enterEmail)
  })
  it('sub-Heading should be have correct classes', () => {
    cy.get('#enter-mail-info')
      .should('be.visible')
      .should('have.class', 'text-center text-xs text-gray-500')
  })
  it('checks, label of email input box should be visible', () => {
    cy.get('label').should('be.visible')
  })
  it('checks, label of email input box should have correct text', () => {
    cy.get('label').should('be.visible').should('have.text', 'Email*')
  })
  it('checks, email input field should be visible', () => {
    cy.get('input').should('be.visible')
  })
  it('checks, email input field get into focus', () => {
    cy.get('input').should('be.visible').click().should('be.focused')
  })
  it('checks, email input field should be get focus', () => {
    cy.get('input').should('be.visible').clear().type(invalidMemberEmail)
  })
  it('checks, email input field should have correct classes', () => {
    cy.get('input').should(
      'have.class',
      'h-11 w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-lg'
    )
  })
  it('checks, back to login link should be visible', () => {
    cy.get('#back-to-login').should('be.visible')
  })
  it('checks, back to login link should have correct text', () => {
    cy.get('#back-to-login').should(
      'have.text',
      forgotPasswordConstants.backToLogin
    )
  })
  it('checks, back to login link should have correct classes', () => {
    cy.get('#back-to-login').should(
      'have.class',
      'cursor-pointer text-sm text-primary'
    )
  })
  it('checks, submit button should be visible', () => {
    cy.get('button').should('be.visible')
  })
  it('checks, submit button should have correct text', () => {
    cy.get('button').should('have.text', forgotPasswordConstants.resetPassword)
  })
  it('Checking account not found for reset password ,error should be visible', () => {
    cy.get('#forget-pass-header').should('be.visible', { timeout: 6000 })
    cy.get('#forget-pass-header').should(
      'have.text',
      forgotPasswordConstants.header
    )
    cy.get('input[name="email"]')
      .clear()
      .type(invalidMemberEmail)
      .should('have.value', invalidMemberEmail)
    cy.get('#reset-password').click()
    cy.get('#email-error').should('be.visible')
  })
  it('Checking account not found for reset password ,error should have correct message', () => {
    cy.get('#forget-pass-header').should('be.visible', { timeout: 6000 })
    cy.get('#forget-pass-header').should(
      'have.text',
      forgotPasswordConstants.header
    )
    cy.get('input[name="email"]')
      .clear()
      .type(invalidMemberEmail)
      .should('have.value', invalidMemberEmail)
    cy.get('#reset-password').click()
    cy.get('#email-error').should('have.text', statusCheck.resendPasswordError)
  })
  it('Checking account not found for reset password ,error should have correct classes', () => {
    cy.get('#forget-pass-header').should('be.visible', { timeout: 6000 })
    cy.get('#forget-pass-header').should(
      'have.text',
      forgotPasswordConstants.header
    )
    cy.get('input[name="email"]')
      .clear()
      .type(invalidMemberEmail)
      .should('have.value', invalidMemberEmail)
    cy.get('#reset-password').click()
    cy.get('#email-error').should('have.class', 'text-red-700')
  })
  it('Checking account not found for reset password ', () => {
    cy.get('#forget-pass-header').should('be.visible', { timeout: 6000 })
    cy.get('#forget-pass-header').should(
      'have.text',
      forgotPasswordConstants.header
    )
    cy.get('input[name="email"]')
      .clear()
      .type(invalidMemberEmail)
      .should('have.value', invalidMemberEmail)
    cy.get('#reset-password').click()
    cy.get('#email-error')
      .invoke('text')
      .then((toastText) => {
        if (toastText === statusCheck.resendPasswordError) {
          cy.location('pathname').should('include', routes.forgotPassword)
        } else {
          cy.get('.Toastify__toast', { timeout: 8000 }).should(
            'have.text',
            statusCheck.resendPasswordSuccess
          )
          cy.location('pathname').should('include', routes.signIn)
        }
      })
  })
  it('Checking for account when it is found for reset password ', () => {
    cy.log('On forget Password page')
    cy.get('#forget-pass-header').should('be.visible', { timeout: 6000 })
    cy.get('#forget-pass-header').should(
      'have.text',
      forgotPasswordConstants.header
    )
    cy.get('input[name="email"]')
      .should('be.visible', { timeout: 6000 })
      .clear()
      .type(memberEmail)
    cy.get('#reset-password').click()
  })
})
