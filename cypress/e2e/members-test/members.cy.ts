/// <reference types="Cypress"/>
import {
  commonConstants,
  cypress,
  members,
  statusCheck,
} from '~/constants/common.constants'

const memberEmail = 'johndoe@example.com'

describe('Test for members', () => {
  beforeEach('sign-in', () => {
    cy.visit('/sign-in')
    cy.get('input[name="email"]')
      .clear()
      .type(Cypress.env('email'))
      .should('have.focus')
      .should('have.value', Cypress.env('email'))
    cy.get('input[name="password"]')
      .clear()
      .type(Cypress.env('password'))
      .should('have.focus')
      .should('have.value', Cypress.env('password'))
    cy.get('[data-cy="submit"]').click()
    cy.location('pathname').should('include', '/members')
  })
  it('Test for conforming ,new member is added in a list or not', () => {
    cy.get('a').find('#members').should('have.text', members.members).click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/members')
    cy.get('.memberRows', { timeout: 8000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('memberMail')[0].innerHTML ===
          memberEmail
        ) {
          cy.get('.memberMail').should('have.text', memberEmail)
        }
      })
    })
  })
  it('Test for add-members popUp cancel button', () => {
    cy.get('a').find('#members').should('have.text', members.members).click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/members')
    cy.get('#add-member').should('have.text', cypress.addMember).click()
    cy.get('#cancel-add-button').should('have.text', 'Cancel').click()
  })
  it('Test for Delete member popup cancel button', () => {
    cy.get('a').find('#members').should('have.text', members.members).click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/members')
    cy.get('.membersHeading').should('have.text', 'Members')
    cy.get('.memberRows', { timeout: 8000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('memberMail')[0].innerHTML ===
          memberEmail
        ) {
          cy.get('.memberMail').should('have.text', memberEmail)
        }
      })
    })
    cy.get('.memberMail')
      .contains(memberEmail)
      .parent()
      .parent()
      .within(() => {
        cy.get('#delete-button').click()
      })
    cy.get('#delete-dialog').should('be.visible')
    cy.get('#cancel-delete-pop-up')
      .should('have.text', commonConstants.cancel)
      .click()
  })
  it('Test for Delete member ', () => {
    cy.get('a').find('#members').should('have.text', members.members).click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/members')
    cy.get('.memberRows', { timeout: 8000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('memberMail')[0].innerHTML ===
          memberEmail
        ) {
          cy.get('.memberMail').should('have.text', memberEmail)
        }
      })
    })
    cy.get('.memberMail')
      .contains(memberEmail)
      .parent()
      .parent()
      .within(() => {
        cy.get('#delete-button').click()
      })
    cy.get('#delete-dialog').should('be.visible')
    cy.get('#confirm-delete')
      .should('have.text', commonConstants.delete)
      .click()
    cy.get('.Toastify__toast').find('.Toastify__close-button  ').click()
    cy.intercept('/members').as('membersPage')
    cy.get('.memberRows').each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('memberMail')[0].innerHTML ===
          memberEmail
        ) {
          cy.get('.memberMail')
            .should('have.text', memberEmail)
            .should('not.exist')
        }
      })
    })
    return false
  })
  it('create-password page contain correct header', () => {
    cy.visit(
      `http://localhost:3000` +
        '/members/' +
        ' cl9qupatc0193thtn2iitunti' +
        '/create-password'
    )
    cy.get('.text-center').should('have.text', commonConstants.createPassword)
  })
  it('create-password page, checks enter password input filed should have focus after click', () => {
    cy.visit(
      `http://localhost:3000` +
        '/members/' +
        ' cl9qupatc0193thtn2iitunti' +
        '/create-password'
    )
    cy.get('#enterPassword').click().should('be.focused')
  })
  it('create-password page, checks enter password input filed not take empty space at begining', () => {
    cy.visit(
      `http://localhost:3000` +
        '/members/' +
        ' cl9qupatc0193thtn2iitunti' +
        '/create-password'
    )
    cy.get('#enterPassword').type('     ').should('have.value', '')
  })
  it('create-password page, checks enter password input filed should have correct label', () => {
    cy.visit(
      `http://localhost:3000` +
        '/members/' +
        ' cl9qupatc0193thtn2iitunti' +
        '/create-password'
    )
    cy.get('#enterPassword')
      .should('be.visible')
      .parent()
      .within(() => {
        cy.get('label')
          .should('have.text', 'Enter Password')
          .should('have.class', 'block text-gray-800')
      })
  })
  it('create-password page, checks re-enter password input filed should have focus after click', () => {
    cy.visit(
      `http://localhost:3000` +
        '/members/' +
        ' cl9qupatc0193thtn2iitunti' +
        '/create-password'
    )
    cy.get('#reEnterPassword').click().should('be.focused')
  })
  it('create-password page, checks re-enter password input filed not take empty space at begining', () => {
    cy.visit(
      `http://localhost:3000` +
        '/members/' +
        ' cl9qupatc0193thtn2iitunti' +
        '/create-password'
    )
    cy.get('#enterPassword').type('     ').should('have.value', '')
  })
  it('create-password page, checks re-enter password input filed should have correct label', () => {
    cy.visit(
      `http://localhost:3000` +
        '/members/' +
        ' cl9qupatc0193thtn2iitunti' +
        '/create-password'
    )
    cy.get('#reEnterPassword')
      .should('be.visible')
      .parent()
      .within(() => {
        cy.get('label')
          .should('have.text', 'Re-Enter Password')
          .should('have.class', 'block text-gray-800')
      })
  })
  it('create-password page, checks submit button contain correct text', () => {
    cy.visit(
      `http://localhost:3000` +
        '/members/' +
        ' cl9qupatc0193thtn2iitunti' +
        '/create-password'
    )
    cy.get('#reset-password').should('have.text', 'Proceed')
  })
  it('create-password page,throw error if password entered in both input fileds are not matched', () => {
    cy.visit(
      `http://localhost:3000` +
        '/members/' +
        ' cl9qupatc0193thtn2iitunti' +
        '/create-password'
    )
    cy.get('#enterPassword').should('be.visible').type('copods')
    cy.get('#reEnterPassword').should('be.visible').type('careers')
    cy.get('#reset-password').should('have.text', 'Proceed').click()
    cy.get('#email-error').should(
      'have.text',
      statusCheck.enteredReenteredPassword
    )
  })
})
