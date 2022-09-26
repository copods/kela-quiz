import {
  forgotPasswordConstants,
  statusCheck,
} from '~/constants/common.constants'
import { routes } from '~/constants/route.constants'
const memberEmail = 'johndoe@example.com'
const invalidMemberEmail = 'abc@email.com'

describe('Forgot password', () => {
  beforeEach('sign-in', () => {
    cy.visit('/sign-in')
    cy.get('span#forgot-password')
      .should('have.text', forgotPasswordConstants.header)
      .click()
    cy.wait(2000)
  })

  it('Checking account not found for reset password ', () => {
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
          cy.get('.Toastify__toast').should(
            'have.text',
            statusCheck.resendPasswordSuccess
          )
          cy.location('pathname').should('include', routes.signIn)
        }
      })
  })
  it('Checking for account when it is found for reset password ', () => {
    cy.get('#forget-pass-header').should(
      'have.text',
      forgotPasswordConstants.header
    )
    cy.get('input[name="email"]').clear().type(memberEmail)
    cy.get('#reset-password').click()
    cy.get('.Toastify__toast').should(
      'have.text',
      statusCheck.resendPasswordSuccess
    )
    cy.location('pathname').should('include', routes.signIn)
  })
})
