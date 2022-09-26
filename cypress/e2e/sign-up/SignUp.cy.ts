import { logIn, toastConstants } from '~/constants/common.constants'

const firstName = 'John'
const lastName = 'Doe'
const memberEmail = 'johndoe@example.com'

describe('Test for Sign Up page', () => {
  beforeEach('/sign-up', () => {
    cy.visit('/sign-up')
  })
  it('check toster showing a error if try to submit without filling first name input field', () => {
    cy.get('[data-cy="lastName"]')
      .clear()
      .type(lastName)
      .should('have.value', lastName)
    cy.get('[data-cy="email"]')
      .clear()
      .type(memberEmail)
      .should('have.value', memberEmail)
    cy.get('div').find('.dropdownButton').click()
    cy.get('ul').contains('Recruiter').click()
    cy.get('#add-button').should('have.text', logIn.signUp).click()
    cy.get('.Toastify__toast').should(
      'have.text',
      toastConstants.firstNameRequired
    )
  })
  it('check toster showing a error if try to submit without filling last name input field', () => {
    cy.get('[data-cy="firstName"]')
      .should('be.visible', { timeout: 60000 })
      .clear()
      .type(firstName)
      .should('have.value', firstName)
    cy.get('[data-cy="email"]')
      .should('be.visible', { timeout: 60000 })
      .clear()
      .type(memberEmail)
      .should('have.value', memberEmail)
    cy.get('div').find('.dropdownButton').click()
    cy.get('ul').contains('Recruiter').click()
    cy.get('#add-button').should('have.text', logIn.signUp).click()
    cy.get('.Toastify__toast').should(
      'have.text',
      toastConstants.lastNameRequired
    )
  })
  it('check toster showing a error if try to submit without filling email input field', () => {
    cy.get('[data-cy="firstName"]')
      .should('be.visible', { timeout: 60000 })
      .clear()
      .type(firstName)
      .should('have.value', firstName)
    cy.get('[data-cy="lastName"]')
      .should('be.visible', { timeout: 60000 })
      .clear()
      .type(lastName)
      .should('have.value', lastName)

    cy.get('div').find('.dropdownButton').click()
    cy.get('ul').contains('Recruiter').click()
    cy.get('#add-button').should('have.text', logIn.signUp).click()
    cy.get('.Toastify__toast').should('have.text', toastConstants.emailRequired)
  })
  it('signing up successfully', () => {
    cy.get('[data-cy="firstName"]')
      .should('be.visible', { timeout: 60000 })
      .clear()
      .type(firstName)
      .should('have.value', firstName)
    cy.get('[data-cy="lastName"]')
      .should('be.visible', { timeout: 60000 })
      .clear()
      .type(lastName)
      .should('have.value', lastName)
    cy.get('[data-cy="email"]')
      .should('be.visible', { timeout: 60000 })
      .clear()
      .type(memberEmail)
      .should('have.value', memberEmail)
    cy.get('div').find('.dropdownButton').click()
    cy.get('ul').contains('Recruiter').click()
    cy.get('#add-button').should('have.text', logIn.signUp).click()
    cy.get('.Toastify__toast').should(
      'have.text',
      toastConstants.signUpSuccessfull
    )
  })
  it('trying to sign up but member is already exist', () => {
    cy.get('[data-cy="firstName"]')
      .should('be.visible', { timeout: 60000 })
      .clear()
      .type(firstName)
      .should('have.value', firstName)
    cy.get('[data-cy="lastName"]')
      .should('be.visible', { timeout: 60000 })
      .clear()
      .type(lastName)
      .should('have.value', lastName)
    cy.get('[data-cy="email"]')
      .should('be.visible', { timeout: 60000 })
      .clear()
      .type(memberEmail)
      .should('have.value', memberEmail)
    cy.get('div').find('.dropdownButton').click()
    cy.get('ul').contains('Recruiter').click()
    cy.get('#add-button').should('have.text', logIn.signUp).click()
    cy.get('.Toastify__toast').should(
      'have.text',
      toastConstants.memberAlreadyExist
    )
  })
})
