import { cypress, testsConstants } from '~/constants/common.constants'

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

  it('test for check preview data match selected test', () => {
    cy.get('a')
      .find('#Tests', { timeout: 6000 })
      .should('have.text', testsConstants.Tests)
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/tests')
    cy.get('.test-table-list', { timeout: 6000 }).should('be.visible')
    cy.get('.test-table-list').each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('.test-name-navigation')[0].innerHTML ===
          cypress.test1
        ) {
          cy.get('.test-name-navigation').contains(cypress.test1)
        }
      })
    })
  })

  it('test for tests back-button', () => {
    cy.get('a')
      .find('#Tests', { timeout: 6000 })
      .should('have.text', testsConstants.Tests)
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/tests')
    cy.get('.test-table-list', { timeout: 6000 }).should('be.visible')
    cy.get('.test-table-list').each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('.test-name-navigation')[0].innerHTML ===
          cypress.test1
        ) {
          cy.get('.test-name-navigation').contains(cypress.test1).click()
        }
      })
    })
    cy.get('.testPreviewBackButton', { timeout: 6000 })
      .should('be.visible')
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/tests')
  })
  it('test for tests name', () => {
    cy.get('a')
      .find('#Tests', { timeout: 6000 })
      .should('have.text', testsConstants.Tests)
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/tests')
    cy.get('.test-table-list', { timeout: 6000 }).should('be.visible')
    cy.get('.test-table-list').each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('.test-name-navigation')[0].innerHTML ===
          cypress.test1
        ) {
          cy.get('.test-name-navigation').contains(cypress.test1).click()
        }
      })
    })
  })
  it('test for description', () => {
    cy.get('a')
      .find('#Tests', { timeout: 6000 })
      .should('have.text', testsConstants.Tests)
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/tests')

    cy.get('.test-table-list', { timeout: 6000 }).should('be.visible')
    cy.get('.test-table-list').each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('.test-name-navigation')[0].innerHTML ===
          cypress.test1
        ) {
          cy.get('.test-name-navigation').contains(cypress.test1).click()
        }
      })
    })
    cy.get('#description', { timeout: 6000 })
      .should('have.text', cypress.description)
      .click()
  })
  it('test for total time', () => {
    cy.get('a')
      .find('#Tests', { timeout: 6000 })
      .should('have.text', testsConstants.Tests)
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/tests')
    cy.get('.test-table-list', { timeout: 6000 }).should('be.visible')
    cy.get('.test-table-list').each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('.test-name-navigation')[0].innerHTML ===
          cypress.test1
        ) {
          cy.get('.test-name-navigation').contains(cypress.test1).click()
        }
      })
    })
    cy.get('#totalTime', { timeout: 6000 })
      .should('have.text', cypress.totalTime)
      .click()
  })
  it('test for Total Sections', () => {
    cy.get('a')
      .find('#Tests', { timeout: 6000 })
      .should('have.text', testsConstants.Tests)
      .click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/tests')
    cy.get('.test-table-list', { timeout: 6000 }).should('be.visible')
    cy.get('.test-table-list').each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('.test-name-navigation')[0].innerHTML ===
          cypress.test1
        ) {
          cy.get('.test-name-navigation').contains(cypress.test1).click()
        }
      })
    })
    cy.get('#totalSection', { timeout: 6000 }).should(
      'have.text',
      cypress.totalSections
    )
  })
})
