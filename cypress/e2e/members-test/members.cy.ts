/// <reference types="Cypress"/>
import {
  commonConstants,
  cypress,
  members,
  toastConstants,
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
  it('checks invite member button should be visible', () => {
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
        cy.get('#resend-member-invite').should('be.visible')
      })
  })
  it('checks,member should be invited after clicking on invited button', () => {
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
        cy.get('#resend-member-invite').should('be.visible').click()
      })
    cy.get('.Toastify__toast-body', { timeout: 8000 }).should(
      'have.text',
      toastConstants.resendMemberInvitation
    )
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
})
