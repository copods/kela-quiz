import {
  members,
  routeFiles,
  testsConstants,
} from '~/constants/common.constants'
describe('Test for Logout, SideNav', () => {
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
  it('click all links with loop', () => {
    // result page
    cy.get('a').find('#group-by-tests').should('have.text', 'Results').click()
    cy.location('pathname').should('eq', '/results/groupByTests')

    // tests page
    cy.get('a').find('#tests').should('have.text', testsConstants.tests).click()
    cy.location('pathname').should('eq', '/tests')

    // sections page
    cy.get('a')
      .find('#sections')
      .should('have.text', routeFiles.sections)
      .click()
    cy.location('pathname').should('include', '/sections')

    // members page
    cy.get('a').find('#members').should('have.text', members.members).click()
    cy.location('pathname').should('eq', '/members')
  })
})
