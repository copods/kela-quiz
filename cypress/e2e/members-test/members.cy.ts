/// <reference types="Cypress"/>

import { cypress } from '~/constants/common.constants'

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
    cy.location('pathname').should('include', '/dashboard')
  })
  //
  it('Test for conforming ,new member is added in a list or not', () => {
    cy.get('a').find('#Members').should('have.text', cypress.members).click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/members')
    cy.get('.memberRows', { timeout: 6000 }).should('be.visible')
    cy.get('.memberRows').each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('memberMail')[0].innerHTML ===
          cypress.memberEmail
        ) {
          cy.get('.memberMail').contains(cypress.memberEmail)
        }
      })
    })
  })

  it('Test for add-members popUp cancel button', () => {
    cy.get('a').find('#Members').should('have.text', cypress.members).click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/members')
    cy.get('#addMember').should('have.text', cypress.addMember).click()
    cy.get('#cancelAddButton').should('have.text', 'Cancel').click()
  })
  it('Test for Delete member popup cancel button', () => {
    cy.get('a').find('#Members').should('have.text', cypress.members).click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/members')
    cy.get('.memberRow').each((item) => {
      cy.contains('hinata hyuga')
        .parent()
        .parent()
        .within(() => {
          cy.get('#deleteButton', { timeout: 60000 })
            .should('be.visible')
            .click()
        })

      cy.get('#deleteDialog').should('be.visible')
      cy.get('#cancelDeletePopUp').should('have.text', cypress.cancel).click()
    })
  })

  it('Test for Delete member ', () => {
    cy.get('a').find('#Members').should('have.text', cypress.members).click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/members')
    cy.get('.memberRow').each((item) => {
      cy.contains('hinata hyuga')
        .parent()
        .parent()
        .within(() => {
          cy.get('#deleteButton', { timeout: 60000 })
            .should('be.visible')
            .click()
        })
      cy.get('.confirm-delete').should('have.text', cypress.delete).click()
      cy.get('.Toastify__toast').find('.Toastify__close-button  ').click()
      cy.intercept('/members').as('membersPage')
      cy.get('.memberRow').each((item) => {
        cy.contains('hinata hyuga').should('not.exist')
      })

      return false
    })
  })
})
