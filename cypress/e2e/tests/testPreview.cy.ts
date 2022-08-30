import { cypress, testsConstants } from '~/constants/common.constants'

const test1 = `Aptitude - test1`

describe('Test for testPreview', () => {
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

  it('test for check preview data match selected test and back button ', () => {
    cy.get('a')
      .find('#tests', { timeout: 6000 })
      .should('have.text', testsConstants.Tests)
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/tests')
    cy.get('.test-table-list', { timeout: 6000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('test-name-navigation')[0].innerHTML ===
          test1
        ) {
          cy.get('.test-name-navigation').should('have.text', test1)
        }
      })
    })
    cy.get('.test-name-navigation').contains(test1).click()
    cy.get('#title', { timeout: 6000 }).should('have.text', test1)
    cy.get('#backButton').click()
  })

  it('test for tests name', () => {
    cy.get('a')
      .find('#tests', { timeout: 6000 })
      .should('have.text', testsConstants.Tests)
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/tests')

    cy.get('.test-table-list', { timeout: 6000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('test-name-navigation')[0].innerHTML ===
          test1
        ) {
          cy.get('.test-name-navigation').should('have.text', test1)
        }
      })
    })
    cy.get('.test-name-navigation', { timeout: 6000 }).contains(test1).click()
    cy.get('#name').should('have.text', cypress.name).click()
  })
  it('test for description', () => {
    cy.get('a')
      .find('#tests', { timeout: 6000 })
      .should('have.text', testsConstants.Tests)
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/tests')
    cy.get('.test-table-list', { timeout: 6000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('test-name-navigation')[0].innerHTML ===
          test1
        ) {
          cy.get('.test-name-navigation').should('have.text', test1)
        }
      })
    })
    cy.get('.test-name-navigation', { timeout: 6000 }).contains(test1).click()
    cy.get('#description').should('have.text', cypress.description).click()
  })
  it('test for total time', () => {
    cy.get('a')
      .find('#tests', { timeout: 6000 })
      .should('have.text', testsConstants.Tests)
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/tests')
    cy.get('.test-table-list', { timeout: 6000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('test-name-navigation')[0].innerHTML ===
          test1
        ) {
          cy.get('.test-name-navigation').should('have.text', test1)
        }
      })
    })
    cy.get('.test-name-navigation', { timeout: 6000 }).contains(test1).click()
    cy.get('#totalTime').should('have.text', cypress.totalTime).click()
  })
  it('test for Total Sections', () => {
    cy.get('a')
      .find('#tests', { timeout: 6000 })
      .should('have.text', testsConstants.Tests)
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/tests')
    cy.get('.test-table-list', { timeout: 6000 }).each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('test-name-navigation')[0].innerHTML ===
          test1
        ) {
          cy.get('.test-name-navigation').should('have.text', test1)
        }
      })
    })
    cy.get('.test-name-navigation', { timeout: 6000 }).contains(test1).click()
    cy.get('#totalSection').should('have.text', testsConstants.totalSectionsText)
  })
})
