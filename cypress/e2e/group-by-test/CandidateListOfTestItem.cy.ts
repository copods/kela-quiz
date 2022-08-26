import { cypress } from '~/constants/common.constants'

describe('Visiting group by test of results page', () => {
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

  // creating data to test Test list page

  it('Check  that if list of candidate is coming after clicking a test in group byt test in results page ', () => {
    cy.get('a', { timeout: 6000 })
      .find('#Group_By_Tests')
      .should('have.text', 'Results')
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/results')
    cy.get('#group-by-test-container', { timeout: 6000 })
    cy.get('#group-by-test-container').each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('groupByItemTest')[0].innerHTML ===
          cypress.test1
        ) {
          cy.get('.groupByItemTest').contains(cypress.test1)
        }
      })
    })
  })
  it('Check  that if list of attended candidate is coming after clicking a test in group byt test in results page ', () => {
    cy.get('a')
      .find('#Group_By_Tests', { timeout: 6000 })
      .should('have.text', 'Results')
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/results')
    cy.get('#group-by-test-container', { timeout: 6000 })
    cy.get('#group-by-test-container').each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('groupByItemTest')[0].innerHTML ===
          cypress.test1
        ) {
          cy.get('.groupByItemTest').contains(cypress.test1).click()
        }
      })
    })
  })
})
