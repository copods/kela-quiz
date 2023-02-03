describe('Visiting group by test of results page', () => {
  // creating data to test Test list page
  beforeEach('sign-in', () => {
    cy.login()

    cy.customVisit('/members')
  })
  const test1 = `Aptitude - assessment1`

  it('Checks,elements in candidate list', () => {
    cy.get('#group-by-tests').click()
    cy.get('.groupByItemTest', { timeout: 8000 }).contains(test1).click()

    // checks title of candidate list
    cy.get('#title', { timeout: 20000 })
      .should('be.visible')
      .should('have.class', 'text-3xl font-semibold text-gray-900')

    //checks button should be visible and after clicking it back to the result page
    cy.get('#back-button', { timeout: 8000 }).should('be.visible').click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/results')
  })
})
