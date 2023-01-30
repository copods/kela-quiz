describe('Visiting group by test of results page', () => {
  // creating data to test Test list page
  beforeEach('sign-in', () => {
    cy.login()

    cy.customVisit('/members')
  })
  const test1 = `Aptitude - assessment1`
  it('Checks, if assessment has correct name', () => {
    cy.get('#group-by-tests').should('have.text', 'Results').click()
    cy.get('h1', { timeout: 6000 }).should('have.text', 'Results')
    cy.get('.groupByItemTest', { timeout: 6000 }).contains(test1).click()
  })

  it('Checks, header of candidate list page should be visible', () => {
    cy.get('#group-by-tests').should('have.text', 'Results').click()
    cy.get('h1', { timeout: 6000 }).should('have.text', 'Results')
    cy.get('.groupByItemTest', { timeout: 8000 }).contains(test1).click()
    cy.get('#title', { timeout: 20000 }).should('be.visible')
  })

  it('Checks, header of candidate list page should have correct classes', () => {
    cy.get('#group-by-tests').should('have.text', 'Results').click()
    cy.get('h1', { timeout: 6000 }).should('have.text', 'Results')
    cy.get('.groupByItemTest', { timeout: 8000 }).contains(test1).click()
    cy.wait(1000)
    cy.get('#title', { timeout: 8000 }).should(
      'have.class',
      'text-3xl font-semibold text-gray-900'
    )
  })
  it('Checks, back button should be visible', () => {
    cy.get('#group-by-tests').should('have.text', 'Results').click()
    cy.get('h1').should('have.text', 'Results')
    cy.get('.groupByItemTest', { timeout: 8000 }).contains(test1).click()
    cy.wait(1000)
    cy.get('#back-button', { timeout: 8000 }).should('be.visible')
  })
  it('Checks, after clicking on back button it should redirect to result page', () => {
    cy.get('#group-by-tests').should('have.text', 'Results').click()
    cy.get('h1', { timeout: 6000 }).should('have.text', 'Results')
    cy.get('.groupByItemTest', { timeout: 8000 }).contains(test1).click()
    cy.get('#back-button', { timeout: 8000 }).should('be.visible').click()
    cy.wait(1000)
    cy.location('pathname', { timeout: 60000 }).should('include', '/results')
  })
})
