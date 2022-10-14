import {
  members,
  routeFiles,
  testsConstants,
} from '~/constants/common.constants'
describe('Test for Logout, SideNav', () => {
  beforeEach('sign-in', () => {
    cy.login()

    cy.customVisit('/members')
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
