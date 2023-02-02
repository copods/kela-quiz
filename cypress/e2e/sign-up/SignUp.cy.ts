import {
  getAddButton,
  getConfirmPassword,
  getFirstName,
  getLastName,
  getPassword,
  getSignUpPageTitle,
} from 'support/common-function'
const signupPageTitle = 'Sign Up'
const firstName = 'John'
const lastName = 'Doe'
const memberEmail = 'john@example.com'
const memberAlreadyExist = 'Member with this email id already exists!'
const signUp = 'Sign Up'

describe('Test for Sign Up page', () => {
  beforeEach('/sign-up', () => {
    cy.visit('/sign-up')
  })
  it('Checks for signup page title should have correct text and attributes', () => {
    getSignUpPageTitle()
      .should('have.text', signupPageTitle)
      .should('have.css', 'font-weight', '700')
      .should('have.css', 'font-size', '30px')
      .should('have.css', 'color', 'rgb(17, 24, 39)')
  })

  it('Checks for Sign Up CTA button text and atttributes', () => {
    getAddButton()
      .should('have.text', signupPageTitle)
      .should('have.css', 'background-color', 'rgb(162, 164, 214)')
      .should('have.css', 'padding', '10px 16px')
  })

  it('Checks for Sign Up CTA button cursor', () => {
    getFirstName()
      .should('be.visible')
      .clear()
      .type(firstName)
      .should('have.value', firstName)
    getLastName()
      .should('be.visible')
      .clear()
      .type(lastName)
      .should('have.value', lastName)
    cy.get('#email')
      .should('be.visible')
      .clear()
      .type(memberEmail)
      .should('have.value', memberEmail)

    getPassword().should('be.visible').clear().type('newPassword')
    getConfirmPassword().should('be.visible').clear().type('newPassword')
    getAddButton().should('have.css', 'cursor', 'pointer')
  })
  it('Checks for Sign Up CTA button properties', () => {
    getAddButton()
      .should('have.css', 'color', 'rgb(249, 250, 251)')
      .should('have.css', 'font-size', '12px')
      .should('have.css', 'font-weight', '500')
  })
  it('trying to sign up but member is already exist', () => {
    getFirstName()
      .should('be.visible', { timeout: 60000 })
      .clear()
      .type(firstName)
      .should('have.value', firstName)
    getLastName()
      .should('be.visible', { timeout: 60000 })
      .clear()
      .type(lastName)
      .should('have.value', lastName)
    cy.get('#email')
      .should('be.visible', { timeout: 60000 })
      .clear()
      .type(memberEmail)
      .should('have.value', memberEmail)

    getPassword().should('be.visible').clear().type('newPassword')
    getConfirmPassword().should('be.visible').clear().type('newPassword')
    getAddButton().should('have.text', signUp).click()
    cy.get('.Toastify__toast', { timeout: 8000 }).should(
      'have.text',
      memberAlreadyExist
    )
  })
})
