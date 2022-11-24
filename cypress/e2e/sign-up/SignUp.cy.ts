import { logIn, toastConstants } from '~/constants/common.constants'
const signupPageTitle = 'Sign Up'
const firstName = 'John'
const lastName = 'Doe'
const memberEmail = 'john@example.com'
const workspaceName = 'Copods workspace'

describe('Test for Sign Up page', () => {
  beforeEach('/sign-up', () => {
    cy.visit('/sign-up')
  })

  it('signing up successfully', () => {
    cy.get('#firstName')
      .should('be.visible', { timeout: 60000 })
      .clear()
      .type(firstName)
      .should('have.value', firstName)
    cy.get('#lastName')
      .should('be.visible', { timeout: 60000 })
      .clear()
      .type(lastName)
      .should('have.value', lastName)
    cy.get('#email')
      .should('be.visible', { timeout: 60000 })
      .clear()
      .type(memberEmail)
      .should('have.value', memberEmail)
    cy.get('#workspace')
      .should('be.visible', { timeout: 60000 })
      .clear()
      .type(workspaceName)
      .should('have.value', workspaceName)
    cy.get('#Password').should('be.visible').clear().type('newPassword')
    cy.get('#confirmPassword').should('be.visible').clear().type('newPassword')
    cy.get('#add-button').should('have.text', logIn.signUp).click()
  })
  it('Checks for signup page title text', () => {
    cy.get('#signup-page-title').should('have.text', signupPageTitle)
  })
  it('Checks for signup page title font weight', () => {
    cy.get('#signup-page-title').should('have.css', 'font-weight', '700')
  })
  it('Checks for signup page title font size', () => {
    cy.get('#signup-page-title').should('have.css', 'font-size', '30px')
  })
  it('Checks for signup page title color', () => {
    cy.get('#signup-page-title').should('have.css', 'color', 'rgb(17, 24, 39)')
  })

  it('Checks for Sign Up CTA button text', () => {
    cy.get('#add-button').should('have.text', signupPageTitle)
  })
  it('Checks for Sign Up CTA button background color', () => {
    cy.get('#add-button').should(
      'have.css',
      'background-color',
      'rgb(162, 164, 214)'
    )
  })
  it('Checks for Sign Up CTA button padding', () => {
    cy.get('#add-button').should('have.css', 'padding', '10px 16px')
  })
  it('Checks for Sign Up CTA button cursor', () => {
    cy.get('#firstName')
      .should('be.visible', { timeout: 60000 })
      .clear()
      .type(firstName)
      .should('have.value', firstName)
    cy.get('#lastName')
      .should('be.visible', { timeout: 60000 })
      .clear()
      .type(lastName)
      .should('have.value', lastName)
    cy.get('#email')
      .should('be.visible', { timeout: 60000 })
      .clear()
      .type(memberEmail)
      .should('have.value', memberEmail)
    cy.get('#workspace')
      .should('be.visible', { timeout: 60000 })
      .clear()
      .type(workspaceName)
      .should('have.value', workspaceName)
    cy.get('#Password').should('be.visible').clear().type('newPassword')
    cy.get('#confirmPassword').should('be.visible').clear().type('newPassword')
    cy.get('#add-button').should('have.css', 'cursor', 'pointer')
  })
  it('Checks for Sign Up CTA button color', () => {
    cy.get('#add-button').should('have.css', 'color', 'rgb(249, 250, 251)')
  })
  it('Checks for Sign Up CTA button font-size', () => {
    cy.get('#add-button').should('have.css', 'font-size', '12px')
  })
  it('Checks for Sign Up CTA button font weight', () => {
    cy.get('#add-button').should('have.css', 'font-weight', '500')
  })
  it('trying to sign up but member is already exist', () => {
    cy.get('#firstName')
      .should('be.visible', { timeout: 60000 })
      .clear()
      .type(firstName)
      .should('have.value', firstName)
    cy.get('#lastName')
      .should('be.visible', { timeout: 60000 })
      .clear()
      .type(lastName)
      .should('have.value', lastName)
    cy.get('#email')
      .should('be.visible', { timeout: 60000 })
      .clear()
      .type(memberEmail)
      .should('have.value', memberEmail)
    cy.get('#workspace')
      .should('be.visible', { timeout: 60000 })
      .clear()
      .type(workspaceName)
      .should('have.value', workspaceName)
    cy.get('#Password').should('be.visible').clear().type('newPassword')
    cy.get('#confirmPassword').should('be.visible').clear().type('newPassword')
    cy.get('#add-button').should('have.text', logIn.signUp).click()
    cy.get('.Toastify__toast', { timeout: 8000 }).should(
      'have.text',
      toastConstants.memberAlreadyExist
    )
  })
})
