describe('Visiting group by test of results page', () => {
  // creating data to test Test list page
  beforeEach('sign-in', () => {
    cy.login()

    cy.customVisit('/members')
  })
  const test1 = `Aptitude - test1`
  it('Check  that if list of candidate is coming after clicking a test in group byt test in results page ', () => {
    cy.get('a').find('#group-by-tests').should('have.text', 'Results').click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/results')
    cy.get('h1', { timeout: 6000 }).should('have.text', 'Results')
    cy.wait(6000)
    cy.get('.groupTestRow').each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('groupByItemTest')[0].innerHTML === test1
        ) {
          cy.get('.groupByItemTest').should('have.text', test1)
        }
      })
    })
  })
})
