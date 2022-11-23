describe('Visiting group by test of results page', () => {
  // creating data to test Test list page
  beforeEach('sign-in', () => {
    cy.login()

    cy.customVisit('/results')
  })
  const test1 = `Aptitude - assessment1`
  it('checks, test is available for test', () => {
    
    cy.get('h1', { timeout: 6000 }).should('have.text', 'Results')
    cy.wait(6000)
    cy.get('.groupTestRow').each(($el) => {
      cy.wrap($el).within((el) => {
        if (
          el[0].getElementsByClassName('groupByItemTest')[0].innerHTML === test1
        ) {
          cy.get('.groupByItemTest')
            .should('have.text', test1)
            .should('be.visible')
        }
      })
    })
  })

  it('Checks, header of candidate list page should be visible', () => {
    
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
    cy.get('.groupByItemTest').contains(test1).click()
    cy.get('#title', { timeout: 20000 }).should('be.visible')
  })

  it('Checks, header of candidate list page should have correct classes', () => {
    
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
    cy.get('.groupByItemTest').contains(test1).click()
    cy.get('#title', { timeout: 8000 }).should(
      'have.class',
      'text-3xl font-semibold text-gray-900'
    )
  })
  it('Checks, back button should be visible', () => {
    
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
    cy.get('.groupByItemTest').contains(test1).click()
    cy.get('#back-button', { timeout: 8000 }).should('be.visible')
  })
  it('Checks, after clicking on back button it should redirect to result page', () => {
    
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
    cy.get('.groupByItemTest').contains(test1).click()
    cy.get('#back-button', { timeout: 8000 }).should('be.visible').click()
    cy.location('pathname', { timeout: 60000 }).should('include', '/results')
  })
})
