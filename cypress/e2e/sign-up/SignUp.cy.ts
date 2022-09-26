import { logIn, toastConstants } from '~/constants/common.constants'

const firstName = 'John'
const lastName = 'Doe'
const memberEmail = 'johndoe@example.com'

describe('Test for Sign Up page', () => {
  beforeEach('sign-in', () => {
    cy.visit('/sign-in')
    cy.get('span#sign-up').should('have.text', logIn.signUp).click()
    cy.wait(2000)
  })
  it('check toster showing a error if try to submit without filling first name input field', () => {
    cy.get('input[name="lastName"]')
      .clear()
      .type(lastName)
      .should('have.value', lastName)
    cy.get('input[name="email"]')
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
    cy.get('input[name="firstName"]').should("be.visible", { timeout: 60000 })
      .clear()
      .type(firstName)
      .should('have.value', firstName)
    cy.get('input[name="email"]').should("be.visible", { timeout: 60000 })
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
    cy.get('input[name="firstName"]').should("be.visible", { timeout: 60000 })
      .clear()
      .type(firstName)
      .should('have.value', firstName)
    cy.get('input[name="lastName"]').should("be.visible", { timeout: 60000 })
      .clear()
      .type(lastName)
      .should('have.value', lastName)

    cy.get('div').find('.dropdownButton').click()
    cy.get('ul').contains('Recruiter').click()
    cy.get('#add-button').should('have.text', logIn.signUp).click()
    cy.get('.Toastify__toast').should('have.text', toastConstants.emailRequired)
  })
  it('signing up successfully', () => {
    cy.get('input[name="firstName"]').should("be.visible", { timeout: 60000 })
      .clear()
      .type(firstName)
      .should('have.value', firstName)
    cy.get('input[name="lastName"]').should("be.visible", { timeout: 60000 })
      .clear()
      .type(lastName)
      .should('have.value', lastName)
    cy.get('input[name="email"]').should("be.visible", { timeout: 60000 })
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
    cy.get('input[name="firstName"]').should("be.visible", { timeout: 60000 })
      .clear()
      .type(firstName)
      .should('have.value', firstName)
    cy.get('input[name="lastName"]').should("be.visible", { timeout: 60000 })
      .clear()
      .type(lastName)
      .should('have.value', lastName)
    cy.get('input[name="email"]').should("be.visible", { timeout: 60000 })
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
