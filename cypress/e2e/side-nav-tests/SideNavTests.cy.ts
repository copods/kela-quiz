import { cypress, testsConstants } from '~/constants/common.constants'
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

  //
  it('click all links with loop', () => {
    // result page
    cy.get('a').find('#Group_By_Tests').should('have.text', 'Results').click()
    cy.location('pathname').should('include', '/results/groupByTests')

    // tests page
    cy.get('a').find('#Tests').should('have.text', testsConstants.Tests).click()
    cy.location('pathname').should('eq', '/tests')

    // sections page
    cy.get('a').find('#Sections').should('have.text', cypress.Sections).click()
    cy.location('pathname').should('eq', '/sections')

    // members page
    cy.get('a').find('#Members').should('have.text', cypress.members).click()
    cy.location('pathname').should('eq', '/members')
  })
})
