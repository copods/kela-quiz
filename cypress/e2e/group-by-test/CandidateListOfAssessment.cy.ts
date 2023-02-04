import {
  getBackButton,
  getGroupByItemTest,
  getGroupByTestId,
  getTitle,
} from 'support/common-function'

describe('Visiting group by test of results page', () => {
  // creating data to test Test list page
  beforeEach('sign-in', () => {
    cy.login()

    cy.customVisit('/members')
  })
  const test1 = `Aptitude - assessment1`

  it('Checks,elements in candidate list', () => {
    getGroupByTestId().click()
    getGroupByItemTest().contains(test1).click()

    // checks title of candidate list should be visible and have css properties
    getTitle()
      .should('be.visible')
      .should('have.class', 'text-3xl font-semibold text-gray-900')
    cy.wait(500)
    //checks button should be visible and after clicking it back to the result page
    getBackButton().should('be.visible').click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/results')
  })
})
