import {
  getAddButton,
  getConfirmPassword,
  getFirstName,
  getLastName,
  getPassword,
  getSignUpPageTitle,
  getEmail,
  getToastMessage,
} from 'support/common-function'
const signupPageTitle = 'Sign Up'
const firstName = 'John'
const lastName = 'Doe'
const memberEmail = 'john@example.com'
const memberAlreadyExist = 'Member with this email id already exists!'

describe('Test for Sign Up page', () => {
  it('Tests to check Attributes/Colors/Visibility/Texts', () => {
    cy.visit('/sign-up')

    // To check signup title has correct text and correct attributes
    getSignUpPageTitle()
      .should('have.text', signupPageTitle)
      .should('have.css', 'font-weight', '700')
      .should('have.css', 'font-size', '30px')
      .should('have.css', 'color', 'rgb(17, 24, 39)')

    // To check signup CTA button has correct text and correct attributes
    getAddButton()
      .should('have.text', signupPageTitle)
      .should('have.css', 'background-color', 'rgb(162, 164, 214)')
      .should('have.css', 'padding', '10px 16px')
      .should('have.css', 'color', 'rgb(249, 250, 251)')
      .should('have.css', 'font-size', '12px')
      .should('have.css', 'font-weight', '500')

    // To check signup CTA button cursor
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
    getEmail()
      .should('be.visible')
      .clear()
      .type(memberEmail)
      .should('have.value', memberEmail)

    getPassword().should('be.visible').clear().type('newPassword')
    getConfirmPassword().should('be.visible').clear().type('newPassword')
    getAddButton().should('have.css', 'cursor', 'pointer')

    // To check if signup is working
    getFirstName().clear().type(firstName).should('have.value', firstName)
    getLastName().clear().type(lastName).should('have.value', lastName)
    getEmail().clear().type(memberEmail).should('have.value', memberEmail)

    getPassword().clear().type('newPassword')
    getConfirmPassword().clear().type('newPassword')
    getAddButton().click()

    // To check member already exists toast
    cy.visit('/sign-up')
    getFirstName().type(firstName).should('have.value', firstName)
    getLastName().type(lastName).should('have.value', lastName)
    getEmail().type(memberEmail).should('have.value', memberEmail)

    getPassword().clear().type('newPassword')
    getConfirmPassword().clear().type('newPassword')
    getAddButton().click()
    getToastMessage().should('have.text', memberAlreadyExist)
  })
})
