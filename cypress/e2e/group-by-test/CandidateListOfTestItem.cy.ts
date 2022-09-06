describe('Visiting group by test of results page', () => {
  // creating data to test Test list page
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
  it('Check  that if list of attended candidate is coming after clicking a test in group byt test in results page ', () => {
    cy.get('a').find('#group-by-tests').should('have.text', 'Results').click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/results')
    cy.get('h1', { timeout: 6000 }).should('have.text', 'Results')

    cy.wait(6000)
    cy.get('.groupTestRow').each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('groupByItemTest')[0].innerHTML === test1
        ) {
          cy.get('.groupByItemTest').should('have.text', test1).click()
        }
      })
    })
    cy.get('#test-candidate-list-tab', { timeout: 6000 })
      .get('#tab-title')
      .invoke('text')
      .then((el) => {
        if (el === 'attending') {
          cy.log(el)
        }
      })
  })
})